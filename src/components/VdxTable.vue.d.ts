import type { CardProps, TableProps } from '@nuxt/ui'
import type { MdModalInterface } from './MdModal.vue'

interface VdxTableInterface<M = string> {
	title?: string
	items?: M[]
	columns: TableColumn<any>[]
	attributes?: {
		card?: CardProps
		table?: TableProps | Record<string, any>
	}
	modal?: MdModalInterface
}

type VdxTableSlot<M> = {
	'append-header': (items: M[]) => void
	'prepend-header': (items: M[]) => void
	'append-footer': (items: M[]) => void
	'prepend-footer': (items: M[]) => void
	'append-action': (item: M) => void
	'prepend-action': (item: M) => void
	items: (items: M[]) => any
} & { [K in keyof M as `vdx-${string & K}-cell`]?: (item: M) => void } & {
	[key: `vdx-${string}-cell`]: (item: M) => void
}

export type { VdxTableInterface, VdxTableSlot }
