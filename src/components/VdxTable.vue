<template>
	<UTable :data="items" :columns="dataTable.columns">
		<template v-for="slotColumn in slotColumns" #[`${slotColumn}`]="{ row }">
			<slot :name="slotColumn" v-bind="row.original" />
		</template>
	</UTable>

	<UPagination v-model:page="page" :total="100" />

	<slot name="items" v-bind="items" />
</template>

<script setup lang="ts" generic="M extends Record<string, any>">
import type { TableColumn } from '@nuxt/ui'

interface VdxTable<M> {
	title?: string
	items?: M[]
	columns: TableColumn<never, unknown>[]
}

const dataTable = defineModel<VdxTable<M>>('data-table', { required: true })
const slotColumns = computed(() =>
	dataTable.value.columns
		.filter((column: any) => column?.accessorKey?.includes('vdx-'))
		.map((col: any) => `${col.accessorKey}-cell`)
) as ComputedRef<`vdx-${Extract<keyof M, string>}-cell`[]>

type VdxTableSlot<M> = {
	'append-header': (items: M[]) => void
	'prepend-header': (items: M[]) => void
	'append-footer': (items: M[]) => void
	'prepend-footer': (items: M[]) => void
	'append-action': (item: M) => void
	'prepend-action': (item: M) => void
	items: (items: M[]) => any
} & { [K in keyof M as `vdx-${string & K}-cell`]?: (item: M) => void }

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
