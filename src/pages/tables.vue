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
	</VdxTable>
</template>

<script setup lang="ts">
import { useMdModal, type MdModalInterface } from '../index'
import type { TableColumn } from '@nuxt/ui'

interface VdxTable<M> {
	title?: string
	items?: M[]
	columns: TableColumn<never, unknown>[]
}

interface Company {
	id: number
	name: string
	image: string
	rating: any
}

const dataTable = reactive<VdxTable<Company>>({
	title: 'Sample Table',
	columns: [
		{ accessorKey: 'id' },
		{ accessorKey: 'vdx-image', header: 'Image' },
		{ accessorKey: 'vdx-name', header: 'Company Name' },
		{ accessorKey: 'rating' },
	],
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
