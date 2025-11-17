<template>
	<UCard v-bind="dataTable.attributes?.card">
		<template #header>
			<div class="flex justify-between">
				<span class="font-semibold mr-5 text-lg">{{ dataTable?.title }}</span>

				<div class="flex gap-1">
					<UButton icon="mdi-plus" class="cursor-pointer" />

					<UButton icon="mdi-refresh" @click="fetchData()" class="cursor-pointer" />

					<UButton icon="mdi-download" class="cursor-pointer" />

					<VdxTableFilters :filters="dataTable.filters" />
				</div>
			</div>
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

					<UButton icon="mdi-edit" @click="showConfirmation(true, getRowData(row))" />

					<UButton icon="mdi-delete" @click="showConfirmation(false, getRowData(row))" />

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
import useMdConfirm from '@/composables/useMdConfirm.ts'

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

const toast = useToast()

const showConfirmation = (onUpdate: boolean, item: M) => {
	useMdConfirm(
		{
			attributes: {
				body: {
					title: 'Confirmation',
					description: `Are you sure you want to ${
						onUpdate ? 'update' : 'delete'
					} this item?`,
					class: 'w-full bg-neutral',
					icon: 'mdi-warning',
					ui: {
						root: 'text-center',
						body: 'sm:p-0',
					},
					variant: 'soft',
				},
				cancel: {
					class: 'cursor-pointer',
					label: 'Cancel',
					block: true,
				},
				confirm: {
					class: 'cursor-pointer',
					label: 'Delete',
					block: true,
				},
				modal: {
					title: 'Confirmation',
					description: 'Sample Description',
					ui: {
						footer: 'flex justify-center sm:p-3 p-3',
						header: 'sm:p-3 p-3 hidden',
						body: 'sm:p-1 p-1',
						content: 'w-[400px]',
					},
					dismissible: false,
				},
			},
		},
		{
			onCancel: (overlay) => {
				overlay.close()
			},
			onConfirm: (overlay) => {
				overlay.close()

				toast.add({
					icon: onUpdate ? 'mdi-success' : 'mdi-trash',
					color: onUpdate ? 'success' : 'error',
					title: `Item ${onUpdate ? 'Updated' : 'Deleted'}`,
					description: `Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...`,
					duration: 1500,
				})

				console.log(item)
			},
		}
	)
}
/**
 * Defined Exposed data
 */
defineExpose({ data })
</script>
