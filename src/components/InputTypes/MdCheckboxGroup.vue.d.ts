import type { CheckboxGroupProps } from '@nuxt/ui/components/CheckboxGroup.vue.d.ts'
import type { AcceptableValue } from '@nuxt/ui/runtime/types/utils.js'
import type { ItemApiProvider, ItemDefaultProvider, MdInputBaseInterface } from '../../types'

export interface MdCheckboxGroupProps {
	test: string
}

export interface MdCheckboxGroupSlots {
	test: string
}

export interface MdCheckboxGroupInterface extends MdInputBaseInterface {
	type: 'checkbox-group'
	value?: any
	attributes: CheckboxGroupProps | Record<string, AcceptableValue>
	itemsProvider: ItemApiProvider | ItemDefaultProvider
}
