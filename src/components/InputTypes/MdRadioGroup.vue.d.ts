import type { RadioGroupProps } from '@nuxt/ui/components/RadioGroup.vue.d.ts'
import type { AcceptableValue } from '@nuxt/ui/runtime/types/utils.js'
import type { MdInputBaseInterface, ItemApiProvider, ItemDefaultProvider } from '../../types'

export interface MdRadioGroupProps {
	test: string
}

export interface MdRadioGroupSlots {
	test: string
}

export interface MdRadioGroupInterface extends MdInputBaseInterface {
	type: 'radio-group'
	value?: any
	attributes: RadioGroupProps | Record<string, AcceptableValue>
	itemsProvider: ItemApiProvider | ItemDefaultProvider
}
