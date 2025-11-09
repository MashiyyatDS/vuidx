import type { MdSelectMenuInterface } from '../components/InputTypes/MdSelectMenu.vue.d.ts'
import type { MdInputMenuInterface } from '../components/InputTypes/MdInputMenu.vue.d.ts'
import type { MdSelectInterface } from '../components/InputTypes/MdSelect.vue.d.ts'
import { validate as rValidate } from 'robust-validator'
import type { MdInputInterface } from '../components/MdInput.vue.d.ts'
import { generateCalendarDateTime } from '../utils/index.ts'
import type { Ref } from 'vue'

export default function (mdInput: MdInputInterface | Ref<MdInputInterface>['value']) {
	const get = () => {
		return mdInput?.value || typeof mdInput?.value === 'boolean'
			? formatValue(mdInput)
			: mdInput?.nullInUndefined
			? null
			: 'defaultValue' in mdInput.attributes
			? mdInput.attributes.defaultValue
			: undefined
	}

	const formatValue = (input: MdInputInterface) => {
		let data: unknown = null

		switch (input.type) {
			case 'datepicker':
				data = input.value?.toString()

				break

			default:
				data = input.value

				break
		}

		return data
	}

	const set = (value: any) => {
		switch (mdInput.type) {
			case 'select':
				setSelectInput(mdInput, value)

				break

			case 'select-menu':
				setSelectInput(mdInput, value)

				break

			case 'input-menu':
				setSelectInput(mdInput, value)

				break

			case 'datepicker':
				mdInput.value = value ? generateCalendarDateTime(`${value}`) : generateCalendarDateTime()

				break

			default:
				mdInput.value = value

				break
		}
	}

	const setSelectInput = (select: MdSelectInterface | MdSelectMenuInterface | MdInputMenuInterface, value: unknown | any) => {
		select.value = value
	}

	/**
	 * use useMdInput.reset to reset the input model value.
	 *
	 * @params input: LnInput
	 */
	const reset = () => {
		const undefinedNull = mdInput?.nullInUndefined ? null : undefined

		if (mdInput.type === 'datepicker') {
			mdInput.value = undefined
		} else mdInput.value = 'defaultValue' in mdInput.attributes ? mdInput.attributes.defaultValue : undefinedNull

		mdInput.formField.error = undefined
	}

	/**
	 * use useMdInput.validate to validate the input model value.
	 * Ensure to provide a validation property inside your input property.
	 *
	 * @params input: MdInputInterface
	 */
	const validate = async (fieldName: string) => {
		if (!mdInput.validations) return { isValid: true }

		const inputValue = get()

		const result = await rValidate({ [fieldName]: inputValue }, { [fieldName]: mdInput.validations?.rules })

		if (mdInput['formField']) {
			mdInput['formField']['error'] = result.isInvalid
				? result.errors[fieldName]?.map((error: any) => mdInput.validations?.messages[error.rule]).join(', ')
				: undefined
		}

		return result
	}

	const setError = (error: string) => {
		mdInput.formField['error'] = error
	}

	const onChange = async () => {
		if (mdInput.validateOnChange) {
			const valid = await validate('input')

			mdInput.attributes['color'] = valid.isValid ? 'success' : 'error'
		}
	}

	return {
		get,
		set,
		reset,
		validate,
		setError,
		onChange,
	}
}
