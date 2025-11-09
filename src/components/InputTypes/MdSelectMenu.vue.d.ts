import type { SelectMenuProps } from '@nuxt/ui/components/SelectMenu.vue.d.ts'
import type { AcceptableValue } from '@nuxt/ui/runtime/types/utils.js'
import type { MdInputBaseInterface, ItemApiProvider, ItemDefaultProvider } from '../../types'

export interface MdSelectMenuProps {
	test: string
}

export interface MdSelectMenuSlots {
	test: string
}

export interface MdSelectMenuInterface extends MdInputBaseInterface {
	type: 'select-menu'
	value?: any
	attributes: SelectMenuProps | Record<string, AcceptableValue>
	itemsProvider: ItemApiProvider | ItemDefaultProvider
}
