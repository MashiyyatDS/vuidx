import type { AcceptableValue } from '@nuxt/ui/runtime/types/utils.js'
import type { FormFieldProps } from '@nuxt/ui/components/FormField.vue.d.ts'
import type { CheckboxGroupItem } from '@nuxt/ui'

export interface MdInputBaseInterface {
	/**
	 * Set the field value into `null` instead of `undefined` if a value is not present.
	 */
	nullInUndefined?: boolean
	/**
	 * Allow validating the input field whenever the data value changes.
	 */
	validateOnChange?: boolean

	validations?: {
		rules: string
		messages: Record<string, string>
	}
	/**
	 * Check out https://tailwindcss.com/docs/grid-column for more details in grid system.
	 */
	grid?: string
	/**
	 * Use `hidden` property to hide the element, this property will only hide the element but will retain the model value.
	 */
	hidden?: boolean

	formField: FormFieldProps
}

export interface ItemApiProvider {
	type: 'api'
	definedKey: string
	definedValue: string
	api:
		| {
				handler: () => Promise<{ data: Record<string, AcceptableValue>[] }>
		  }
		| { url: string }
}

export interface ItemDefaultProvider {
	type: 'default'
	items: CheckboxGroupItem[]
}
