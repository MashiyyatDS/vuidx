import type { InputMenuProps } from '@nuxt/ui/components/InputMenu.vue.d.ts'
import type { AcceptableValue } from '@nuxt/ui/runtime/types/utils.js'
import type { MdInputBaseInterface, ItemApiProvider, ItemDefaultProvider } from '../../types'

export interface MdInputMenuProps {
	test: string
}

export interface MdInputMenuSlots {
	test: string
}

export interface MdInputMenuInterface extends MdInputBaseInterface {
	type: 'input-menu'
	value?: any
	attributes: InputMenuProps | Record<string, AcceptableValue>
	itemsProvider: ItemApiProvider | ItemDefaultProvider
}
