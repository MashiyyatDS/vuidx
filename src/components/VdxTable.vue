<template>
	<UCard v-bind="dataTable.attributes?.card">
		<template #header>
			<div class="flex justify-between">
				<span class="font-semibold mr-5 text-lg">{{ dataTable?.title }}</span>

				<div class="flex gap-1">
					<UButton
						icon="mdi-plus"
						class="cursor-pointer"
						@click="useMdModal(dataTable.modal).openModal(createItem)"
						v-if="dataTable?.actions?.create !== false" />

					<UButton icon="mdi-refresh" @click="reloadItems()" class="cursor-pointer" />

					<UButton icon="mdi-download" class="cursor-pointer" />

					<VdxTableFilters :filters="dataTable.filters" />
				</div>
			</div>
		</template>

		<UTable
			v-bind="dataTable.attributes?.table"
			:loading="isLoading || isCreating || isUpdating"
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

					<UButton
						icon="mdi-edit"
						@click="useMdModal(dataTable.modal).openModal(updateItem, getRowData(row))"
						v-if="dataTable?.actions?.update !== false"
						v-bind="dataTable?.attributes?.editButton" />

					<UButton
						icon="mdi-delete"
						:loading="isDeleting"
						@click="showConfirmation(false, getRowData(row))"
						v-if="dataTable?.actions?.delete !== false"
						v-bind="dataTable?.attributes?.deleteButton" />

					<slot name="append-action" v-bind="{ item: getRowData(row) }" />
				</div>
			</template>
		</UTable>

		<template #footer>
			<UPagination v-model:page="page" :total="200" :disabled="isLoading" />
		</template>
	</UCard>
</template>

<script setup lang="ts" generic="M extends Record<string, any>">
import type { VdxTableInterface, VdxTableSlot } from './VdxTable.vue.d.ts'
import useMdConfirm from '@/composables/useMdConfirm.ts'
import { useAxios } from '@vueuse/integrations/useAxios'
import useMdModal from '@/composables/useMdModal.ts'
import type { Row } from '@tanstack/vue-table'
import type { ComputedRef } from 'vue'
import axios from 'axios'

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
const columns: any = computed(() => [
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
	...(dataTable.value?.actions?.['no-actions'] !== true
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

const page = ref(1)

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
					label: onUpdate ? 'Update' : 'Delete',
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

				if (onUpdate) {
					updateItem(item)

					return
				}

				deleteItem(item)
			},
		}
	)
}

const axiosInstance = axios.create({
	params: {
		_page: page.value,
		_limit: 15,
	},
	baseURL: dataTable.value.paginationUrl,
})

const { isLoading, data, execute } = useAxios<M[]>('/', axiosInstance, {
	immediate: true,
})

const reloadItems = () =>
	execute({
		params: {
			_page: page.value,
		},
	})

watch(page, () => reloadItems())

const { isLoading: isCreating, execute: executeCreate } = useAxios(
	'/',
	{ method: 'POST' },
	axiosInstance,
	{ immediate: false }
)
const createItem = async (data: M) => {
	await executeCreate({ data })

	toast.add({
		icon: 'mdi-success',
		color: 'success',
		title: `Item Created`,
		description: `Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...`,
		duration: 1500,
	})

	reloadItems()
}

const { isLoading: isUpdating, execute: executeUpdate } = useAxios(
	'/',
	{ method: 'PUT' },
	axiosInstance,
	{ immediate: false }
)
const updateItem = async (payload: M) => {
	const { data: response } = await executeUpdate(
		`${dataTable.value.paginationUrl}/${payload.id}`,
		{ data: payload }
	)

	toast.add({
		icon: 'mdi-success',
		color: 'success',
		title: `Item Updated`,
		description: `Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...`,
		duration: 1500,
	})

	if (!data.value) return

	const index = data.value.findIndex((item) => item.id === response.value.id)
	if (data.value[index]) data.value[index] = response.value
}

const { isLoading: isDeleting, execute: executeDelete } = useAxios(
	'/',
	{ method: 'DELETE' },
	axiosInstance,
	{ immediate: false }
)
const deleteItem = async (payload: M) => {
	await executeDelete(`${dataTable.value.paginationUrl}/${payload.id}`)

	toast.add({
		icon: 'mdi-trash',
		color: 'error',
		title: `Item Deleted`,
		description: `Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...`,
		duration: 1500,
	})

	reloadItems()
}

/**
 * Defined Exposed data
 */
defineExpose({ data, reloadItems })
</script>
