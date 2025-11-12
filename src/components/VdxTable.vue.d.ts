import type { CardProps, TableProps } from '@nuxt/ui'
import type { MdModalInterface } from './MdModal.vue'

interface VdxTableInterface<M = string> {
	title?: string
	items?: M[]
	columns: TableColumn<any>[]
	attributes?: {
		card?: CardProps
		table?: TableProps & Record<string, any>
	}
	modal?: MdModalInterface
	expandable?: boolean
	actions?:
		| {
				create?: boolean
				update?: boolean
				delete?: boolean
		  }
		| 'no-actions'
}

type VdxTableSlot<M> = {
	'append-header': (items: M[]) => void
	'prepend-header': (items: M[]) => void
	'append-footer': (items: M[]) => void
	'prepend-footer': (items: M[]) => void
	'append-action': (props: { item: M | unknown }) => void
	'prepend-action': (props: { item: M | unknown }) => void
	expanded: (props: { item: M | unknown }) => void
	items: (props: { items: M[] }) => any
} & { [K in keyof M as `vdx-${string & K}-cell`]?: (props: { item: M }) => void } & {
	[key: `vdx-${string}-cell`]: (props: { item: M }) => void
}

export type { VdxTableInterface, VdxTableSlot }
