<template>
	<VdxTable :data-table="dataTable" ref="vxTableRef">
		<template #vdx-name-cell="row">
			<UButton
				:label="row.name"
				@click="useMdModal(modalParams).openModal(saveCompany, row)" />
		</template>

		<template #vdx-image-cell="row">
			<UAvatar class="rounded-none squircle" :src="row.image" />
		</template>

		<template #vdx-select-cell="row">
			<!--<UCheckboxGroup v-model="selectedCompanies" :default-value="row" />-->
		</template>

		<template #prepend-action="company">
			<UButton icon="mdi-info" @click="console.log(company)" />
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
		},
	},
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

const vxTableRef = useTemplateRef('vxTableRef')
</script>
