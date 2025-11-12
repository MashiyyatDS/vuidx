<template>
	<VdxTable :data-table="dataTable" ref="vxTableRef">
		<template #vdx-name-cell="{ item }">
			<UButton
				:label="item.name"
				@click="useMdModal(modalParams).openModal(saveCompany, item)" />
		</template>

		<template #vdx-image-cell="{ item }">
			<UAvatar class="rounded-none squircle" :src="item.image" />
		</template>

		<template #vdx-select-cell="{ item }">
			<UCheckboxGroup v-model="selectedCompanies" :items="[item.name]" />
		</template>

		<template #prepend-action="{ item }">
			<UButton icon="mdi-info" @click="console.log(item)" />
		</template>

		<template #expanded="{ item }">
			<small class="text-green-400">
				<pre>{{ item }}</pre>
			</small>
		</template>
	</VdxTable>
</template>

<script setup lang="ts">
import type { VdxTableInterface } from '@/components/VdxTable.vue.d.ts'
import { useMdModal, type MdModalInterface } from '../index'

interface Company {
	id: number
	name: string
	image: string
	rating: any
}

const paginationProvider = <M>() => {
	const loading = ref(false)
	const data = ref<M[]>([])

	const fetchData = async () => {
		data.value = []
		loading.value = true

		const responseJson = await fetch('https://retoolapi.dev/VJ3ZG3/data')
		const responseData = await responseJson.json()

		data.value = responseData

		loading.value = false

		return responseData
	}

	watchEffect(async () => await fetchData())

	return { loading, data, fetchData }
}

const dataTable = reactive<VdxTableInterface<Company>>({
	title: 'Sample Table',
	columns: [
		{ accessorKey: 'vdx-select', header: 'Select' },
		{ accessorKey: 'id' },
		{ accessorKey: 'vdx-image', header: 'Image' },
		{ accessorKey: 'vdx-name', header: 'Company Name' },
		{ accessorKey: 'rating' },
	],
	attributes: {
		card: {
			ui: {
				body: 'sm:p-0 p-0',
				header: 'sm:p-3 p-3',
				footer: 'sm:p-3 p-3 flex justify-center',
				root: 'm-3',
			},
		},
		table: {
			ui: {
				td: 'sm:p-2 p-2',
			},
			expanded: true,
		},
	},
	paginationProvider,
})

const modalParams: MdModalInterface = reactive({
	attributes: {
		title: 'Company Form',
		description: 'This is a sample company modal form.',
		ui: {
			header: 'sm:p-3 p-3',
			body: 'sm:p-3 p-3',
			footer: 'sm:p-3 p-3 flex justify-between',
		},
		dismissible: false,
		close: true,
	},
	form: {
		attributes: {
			ui: {
				header: 'sm:p-3 p-3',
				body: 'sm:p-3 p-3',
				footer: 'sm:p-3 p-3',
			},
		},
		fields: {
			name: {
				type: 'default',
				formField: { label: 'Company Name' },
				attributes: {
					class: 'w-full',
					placeholder: 'Enter company name',
				},
				validateOnChange: true,
				validations: {
					rules: 'required',
					messages: {
						required: 'Company name is required',
					},
				},
			},
		},
	},
})

const saveCompany = (company: Company) => {
	console.log(company)
}

const selectedCompanies = ref([])

const vxTableRef = useTemplateRef('vxTableRef')
</script>
