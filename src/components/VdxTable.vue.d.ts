import type { CardProps, TableProps } from '@nuxt/ui'
import type { MdModalInterface } from './MdModal.vue'
import type { MdFormInterface } from './MdForm.vue'

type PaginationReturn<M> = {
	loading: Ref<boolean>
	data: M extends string ? Ref<any[]> : Ref<M[]>
	fetchData: () => PaginationReturn
}
type PaginationProvider<M = string> = () => PaginationReturn<M>

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
	paginationProvider: PaginationProvider<M>
	actions?: {
		create?: boolean
		update?: boolean
		delete?: boolean
		'no-actions'?: boolean
	}
	filters?: {
		dateRange?: boolean
		form?: MdFormInterface
	}
}

type VdxTableSlot<M> = {
	'append-header': (items: M[]) => void
	'prepend-header': (items: M[]) => void
	'append-footer': (items: M[]) => void
	'prepend-footer': (items: M[]) => void
	'append-action': (props: { item: M }) => void
	'prepend-action': (props: { item: M }) => void
	expanded: (props: { item: M }) => void
	items: (props: { items: M[] }) => any
} & { [K in keyof M as `vdx-${string & K}-cell`]?: (props: { item: M }) => void } & {
	[key: `vdx-${string}-cell`]: (props: { item: M }) => void
}

export type { VdxTableInterface, VdxTableSlot }
