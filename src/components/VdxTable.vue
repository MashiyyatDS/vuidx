<template>
	<UCard v-bind="dataTable.attributes?.card">
		<template #header>
			<UButton icon="mdi-plus" />
		</template>

		<UTable
			:data="items"
			v-bind="dataTable.attributes?.table"
			:columns="columns"
			v-model:expanded="expandedRow">
			<template v-for="slotColumn in slotColumns" #[`${slotColumn}`]="{ row }">
				<slot :name="slotColumn" v-bind="{ item: row.original }" />
			</template>

			<template #expanded="{ row }">
				<slot name="expanded" v-bind="{ item: row.original }" />
			</template>

			<template #actions-cell="{ row }">
				<div class="flex gap-1">
					<slot name="prepend-action" v-bind="{ item: row.original }" />

					<UButton icon="mdi-edit" @click="console.log(row.original)" />

					<UButton icon="mdi-delete" @click="console.log(row.original)" />

					<slot name="append-action" v-bind="{ item: row.original }" />
				</div>
			</template>
		</UTable>

		<template #footer>
			<UPagination v-model:page="page" :total="100" />
		</template>
	</UCard>

	<slot name="items" v-bind="{ items }" />
</template>

<script setup lang="ts" generic="M extends Record<string, any>">
import type { VdxTableInterface, VdxTableSlot } from './VdxTable.vue.d.ts'
import type { TableColumn } from '@nuxt/ui'
import type { ComputedRef } from 'vue'

const dataTable = defineModel<VdxTableInterface<M>>('data-table', { required: true })
const slotColumns = computed(() =>
	dataTable.value.columns
		.filter((column: any) => column?.accessorKey?.includes('vdx-'))
		.map((col: any) => `${col.accessorKey}-cell`)
) as ComputedRef<`vdx-${Extract<keyof M, string>}-cell`[]>

const UButton = resolveComponent('UButton')
const expandedRow = ref()
const columns = computed((): TableColumn<unknown, unknown>[] => [
	...(dataTable.value?.attributes?.table?.expanded
		? [
				{
					id: 'expand',
					cell: ({ row }) =>
						h(UButton, {
							color: 'neutral',
							variant: 'ghost',
							icon: 'i-lucide-chevron-down',
							square: true,
							'aria-label': 'Expand',
							ui: {
								leadingIcon: [
									'transition-transform',
									row.getIsExpanded() ? 'duration-200 rotate-180' : '',
								],
							},
							onClick: () => row.toggleExpanded(),
						}),
				},
		  ]
		: []),
	...dataTable.value.columns,
	...(dataTable.value.actions !== 'no-actions'
		? [{ accessorKey: 'actions', header: 'Actions' }]
		: []),
])

defineSlots<VdxTableSlot<M>>()

const page = ref(5)
const items = ref([])

const getData = async () => {
	const responseJson = await fetch('https://retoolapi.dev/VJ3ZG3/data')
	const responseData = await responseJson.json()

	items.value = responseData
}

defineExpose({ items })

onMounted(() => getData())
</script>
