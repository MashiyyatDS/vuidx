import type { MdFormInterface } from '../components/MdForm.vue.d.ts'
import type { MdInputInterface } from '../components/MdInput.vue.d.ts'
import { deepClone } from '../utils/index.ts'
import useMdInput from './useMdInput.ts'

/**
 * Return shape for the `useMdForm` composable
 */
interface UseMdFormReturn {
	/**
	 * Collects values from fields, nested forms and collections into a plain object
	 */
	get: () => Record<string, any>

	/**
	 * Sets values into the form from a payload object. The payload shape should mirror the
	 * form structure (fields, nested forms and collections).
	 *
	 * @param payload - An object where keys match the form keys. Collections should be arrays of objects.
	 */
	set: (payload?: Record<string, any>) => void

	/**
	 * Resets all fields, nested forms and collections to their initial/empty state.
	 */
	reset: () => void

	/**
	 * Validates every field in the form (including nested forms and collection items).
	 * Returns true when every field is valid.
	 */
	validate: () => Promise<boolean>

	/**
	 * Applies an errors object to the form. The shape should mirror the form structure where
	 * keys match field/form keys. This will call each field's `setError` or a nested form's
	 * `setErrors` if present.
	 *
	 * @param errors - An object of errors to apply to the form
	 */
	setErrors: (errors: any) => void
}

/**
 * Composable that provides a simple API to read, write, reset and validate a declarative
 * form structure used by the MD form components.
 *
 * @param mdForm - The form object (implements `MdFormInterface`) which contains:
 *   - `fields`: Record of input fields
 *   - `forms`: nested forms (sub-forms)
 *   - `collections`: repeatable form groups
 *
 * Returns helper methods: `get`, `set`, `reset`, `validate` and `setErrors`.
 *
 * Example:
 * ```ts
 * const { get, set, validate } = useMdForm(myForm)
 * const values = get()
 * set({ name: 'John', addresses: [{ street: '...' }] })
 * const ok = await validate()
 * ```
 */
const useMdForm = (mdForm: MdFormInterface): UseMdFormReturn => {
	const get = () => {
		const data: Record<string, any> = {}

		if (mdForm?.fields) {
			for (const [key, field] of Object.entries(mdForm.fields)) {
				data[key] = useMdInput(field).get()
			}
		}

		if (mdForm?.forms) {
			for (const [key, form] of Object.entries(mdForm.forms)) {
				const formValue = useMdForm(form).get()

				data[key] = formValue
			}
		}

		if (mdForm?.collections) {
			for (const [key, form] of Object.entries(mdForm.collections)) {
				const items = form?.items ?? []

				data[key] = items.map((item) => useMdForm(item).get())
			}
		}

		return data
	}

	const set = (payload: Record<string, any> | undefined) => {
		if (mdForm.fields)
			for (const [key, field] of Object.entries(mdForm.fields)) {
				useMdInput(field).set(payload?.[key])
			}

		if (mdForm.forms) {
			for (const [key, form] of Object.entries(mdForm.forms)) {
				useMdForm(form).set(payload?.[key])
			}
		}

		if (mdForm?.collections) {
			for (const [key, collection] of Object.entries(mdForm.collections)) {
				const collectionData = payload?.[key]

				if (Array.isArray(collectionData)) {
					collection['items'] = collectionData.map((dataCollection) => {
						const clonedForm = deepClone(collection.form)

						useMdForm(clonedForm).set(dataCollection)

						return clonedForm
					})
				}
			}
		}
	}

	const reset = () => {
		if (mdForm?.fields) {
			for (const field of Object.values(mdForm.fields)) {
				useMdInput(field).reset()
			}
		}

		if (mdForm?.forms) {
			for (const form of Object.values(mdForm.forms)) {
				useMdForm(form).reset()
			}
		}

		if (mdForm?.collections) {
			for (const collection of Object.values(mdForm?.collections)) {
				collection['items'] = []
			}
		}
	}

	const validate = async (): Promise<boolean> => {
		const collectFields = (form: MdFormInterface): MdInputInterface[] => {
			let fields: MdInputInterface[] = Object.values(form?.fields ?? {})

			if (form?.forms) {
				for (const nestedForm of Object.values(form.forms)) {
					fields = fields.concat(collectFields(nestedForm))
				}
			}

			if (form?.collections) {
				for (const collection of Object.values(form.collections)) {
					const items = collection?.items ?? []

					items.map((item) => {
						fields = fields.concat(collectFields(item))
					})
				}
			}

			return fields
		}

		const allFields = collectFields(mdForm)

		const results = await Promise.all(
			allFields.map(async (field, key) => {
				const { isValid } = await useMdInput(field).validate(`field-${key}`)

				return { field, isValid }
			})
		)

		return results.every((result) => result.isValid)
	}

	const setErrors = (errors: Record<string, any>) => {
		if (mdForm?.fields) {
			for (const [key, field] of Object.entries(mdForm.fields)) {
				const errorData = errors[key]

				if (errorData) {
					useMdInput(field).setError(errorData)
				}
			}
		}

		if (mdForm?.forms) {
			for (const [key, form] of Object.entries(mdForm.forms)) {
				const formErrorData = errors[key]

				if (formErrorData) {
					useMdForm(form).setErrors(formErrorData)
				}
			}
		}
	}

	return {
		get,
		set,
		reset,
		validate,
		setErrors,
	}
}

export default useMdForm
