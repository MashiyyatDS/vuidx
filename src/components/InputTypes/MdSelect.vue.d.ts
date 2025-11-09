import type { SelectProps } from '@nuxt/ui/components/Select.vue.d.ts'
import type { AcceptableValue } from '@nuxt/ui/runtime/types/utils.js'
import type { MdInputBaseInterface, ItemApiProvider, ItemDefaultProvider } from '../../types'

export interface MdSelectProps {
	test: string
}

export interface MdSelectSlots {
	test: string
}

export interface MdSelectInterface extends MdInputBaseInterface {
	type: 'select'
	value?: any
	attributes: SelectProps | Record<string, AcceptableValue>
	itemsProvider: ItemApiProvider | ItemDefaultProvider
}
