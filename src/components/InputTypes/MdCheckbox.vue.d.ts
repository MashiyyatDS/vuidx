import type { CheckboxProps } from '@nuxt/ui/components/Checkbox.vue.d.ts'
import type { AcceptableValue } from '@nuxt/ui/runtime/types/utils.js'
import type { MdInputBaseInterface } from '../../types'

export interface MdCheckboxProps {
	test: string
}

export interface MdCheckboxSlots {
	test: string
}

export interface MdCheckboxInterface extends MdInputBaseInterface {
	type: 'checkbox'
	value?: any
	attributes: CheckboxProps | Record<string, AcceptableValue>
}
