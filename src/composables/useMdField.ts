import type { MdFormInterface } from '../components/MdForm.vue.d.ts'
import type { MdInputInterface } from '../components/MdInput.vue.d.ts'
import { computed, type ComputedRef, watch, type WatchOptions } from 'vue'

/**
 * Interface for the return value of useMdField composable
 */
interface UseMdFieldReturn {
	/**
	 * Retrieves the field or array of fields based on the provided fieldKey
	 * @returns A single field, array of fields, or undefined if not found
	 */
	getField: () => MdInputInterface | MdInputInterface[] | undefined

	/**
	 * Sets up a watcher for field changes and executes the callback when changes occur
	 * @param callback Function to execute when field value changes
	 */
	onChange: (
		callback: (field: MdInputInterface | MdInputInterface[]) => void,
		options?: WatchOptions
	) => void
}

/**
 * A composable for managing form fields in MD forms with support for nested fields and collections
 *
 * @param mdForm - The form instance that contains the fields, nested forms, and collections
 * @param fieldKey - Dot-notation string to access nested fields (e.g., 'user.address.street')
 *
 * @returns Object containing getField and onChange methods for field management
 */
const useMdField = (mdForm: MdFormInterface, fieldKey: string): UseMdFieldReturn => {
	/**
	 * Retrieves a field or array of fields based on the provided fieldKey
	 * Supports nested form structures and collections
	 *
	 * @internal
	 * @returns The found field, array of fields, or undefined if not found
	 */
	const getField = () => {
		const keys = fieldKey.split('.')

		if (!keys.length) return

		let data: MdInputInterface | MdInputInterface[] | undefined = undefined
		const [initialKey] = keys

		const possibleField = mdForm?.fields?.[`${initialKey}`]
		if (possibleField) {
			data = possibleField
		}

		const possibleForm = mdForm?.forms?.[`${initialKey}`]

		if (possibleForm) {
			const nestedKeys = keys.slice(1)

			const formData = useMdField(possibleForm, nestedKeys.join('.')).getField()

			data = formData ?? data
		}

		const possibleCollection = mdForm?.collections?.[`${initialKey}`]
		if (possibleCollection) {
			const nestedKeys = keys.slice(1) ?? []

			const collectionData = possibleCollection?.items?.map((collection) =>
				useMdField(collection, nestedKeys.join('.')).getField()
			) as MdInputInterface[]

			data = collectionData?.length ? collectionData : data
		}

		return data
	}

	/**
	 * Sets up watchers for field changes and executes the provided callback
	 * Handles both single fields and arrays of fields
	 *
	 * @param callback - Function to execute when field values change
	 * @throws {Warning} When the specified field is not found in the form
	 */
	const onChange = (
		callback: (field: ComputedRef<MdInputInterface | MdInputInterface[]>['value']) => void,
		options?: WatchOptions
	) => {
		const currentFields = computed(() => getField()) as ComputedRef<
			MdInputInterface | MdInputInterface[]
		>
		if (!currentFields) {
			console.warn(`Field ${fieldKey} not found inside your form!`)

			return
		}

		if (Array.isArray(currentFields.value)) {
			currentFields.value.map((f) => watch(f, () => callback(f)))

			return
		}

		watch(currentFields, () => callback(currentFields.value), { deep: true, ...options })
	}

	return { getField, onChange }
}

export default useMdField
