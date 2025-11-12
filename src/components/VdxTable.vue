<template>
	<UCard v-bind="dataTable.attributes?.card">
		<template #header>
			<UButton icon="mdi-plus" />
			<UButton icon="mdi-refresh" @click="fetchData()" />
		</template>

		<UTable
			v-bind="dataTable.attributes?.table"
			:loading="loading"
			:data="data"
			:columns="columns"
			v-model:expanded="expandedRow">
			<template v-for="slotColumn in slotColumns" #[`${slotColumn}`]="{ row }">
				<slot :name="slotColumn" v-bind="{ item: row.original }" />
			</template>

			<template #expanded="{ row }">
				<slot name="expanded" v-bind="{ item: getRowData(row) }" />
			</template>

			<template #actions-cell="{ row }">
				<div class="flex gap-1">
					<slot name="prepend-action" v-bind="{ item: getRowData(row) }" />

					<UButton icon="mdi-edit" @click="console.log(row.original)" />

					<UButton icon="mdi-delete" @click="console.log(row.original)" />

					<slot name="append-action" v-bind="{ item: getRowData(row) }" />
				</div>
			</template>
		</UTable>

		<template #footer>
			<UPagination v-model:page="page" :total="100" />
		</template>
	</UCard>
</template>

<script setup lang="ts" generic="M extends Record<string, any>">
import type { VdxTableInterface, VdxTableSlot } from './VdxTable.vue.d.ts'
import type { Row } from '@tanstack/vue-table'
import type { TableColumn } from '@nuxt/ui'
import type { ComputedRef } from 'vue'

/**
 * Defined Slots
 */
defineSlots<VdxTableSlot<M>>()

/**
 * Define Model
 */
const dataTable = defineModel<VdxTableInterface<M>>('data-table', { required: true })

/**
 * Computed columns
 */
const columns = computed((): TableColumn<unknown, unknown>[] => [
	...(dataTable.value?.attributes?.table?.expanded
		? [
				{
					id: 'expand',
					cell: (data: { row: Row<M> }) =>
						h(resolveComponent('UButton'), {
							color: 'neutral',
							variant: 'ghost',
							icon: 'i-lucide-chevron-down',
							class: 'rounded-full cursor-pointer',
							'aria-label': 'Expand',
							ui: {
								leadingIcon: [
									'transition-transform',
									data.row.getIsExpanded() ? 'duration-200 rotate-180' : '',
								],
							},
							onClick: () => data.row.toggleExpanded(),
						}),
				},
		  ]
		: []),
	...dataTable.value.columns,
	...(dataTable.value?.actions !== 'no-actions'
		? [{ accessorKey: 'actions', header: 'Actions' }]
		: []),
])

/**
 * Columns for slots
 */
const slotColumns = computed(() =>
	dataTable.value.columns
		.filter((column: any) => column?.accessorKey?.includes('vdx-'))
		.map((col: any) => `${col.accessorKey}-cell`)
) as ComputedRef<`vdx-${Extract<keyof M, string>}-cell`[]>

const expandedRow = ref()

const getRowData = (row: Row<unknown>): M => row.original as M

const page = ref(5)

const { data, loading, fetchData } = dataTable.value.paginationProvider()

/**
 * Defined Exposed data
 */
defineExpose({ data })
</script>
