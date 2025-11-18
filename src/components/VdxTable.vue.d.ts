import type { CardProps, TableProps } from '@nuxt/ui'
import type { MdModalInterface } from './MdModal.vue.d.ts'
import type { MdFormInterface } from './MdForm.vue.d.ts'
import type { TableColumn } from '@nuxt/ui'

type VdxTableInterface<M = string> = {
	title?: string
	items?: M[]
	columns: TableColumn<M[]>[]
	attributes?: {
		card?: CardProps
		table?: TableProps & Record<string, any>
	}
	modal: MdModalInterface
	expandable?: boolean
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
	paginationUrl: string
}

type ItemCallback = <Model>(items: Model[]) => void

type VdxTableSlot<M> = {
	'append-header': ItemCallback<M>
	'prepend-header': ItemCallback<M>
	'append-footer': ItemCallback<M>
	'prepend-footer': ItemCallback<M>
	'append-action': (props: { item: M }) => void
	'prepend-action': (props: { item: M }) => void
	expanded: (props: { item: M }) => void
	items: (props: { items: M[] }) => any
} & { [K in keyof M as `vdx-${string & K}-cell`]?: (props: { item: M }) => void } & {
	[key: `vdx-${string}-cell`]: (props: { item: M }) => void
}

export type { VdxTableInterface, VdxTableSlot }
