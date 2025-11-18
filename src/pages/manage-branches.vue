<template>
	<USelect
		:items="actions"
		v-model="allowedActions"
		multiple
		orientation="horizontal"
		:placeholder="allowedActions.length <= 0 ? 'No Actions' : ''"
		class="my-3 w-100" />

	<VdxTable :data-table="branchesTable" ref="branchTableRef">
		<template #vdx-status-cell="{ item }">
			<span :class="`font-semi-bold ${statusColor[item.status]}`">
				{{ convertStringCases(item.status).regular }}
			</span>
		</template>

		<template #expanded="{ item }">
			<small>
				<pre>{{ item }}</pre>
			</small>
		</template>
	</VdxTable>
</template>

<script setup lang="ts">
import type { VdxTableActions, VdxTableInterface } from '@/components/VdxTable.vue.d.ts'
import { convertStringCases } from '@/utils'

const actions = ref(['Create', 'Update', 'Delete'])
const allowedActions = ref<string[]>(['Create', 'Update', 'Delete'])

interface Branch {
	id: number
	name: string
	location: string
	status: string
}

const tableActions = computed(() =>
	allowedActions.value.length >= 1
		? {
				create: allowedActions.value.includes('Create'),
				delete: allowedActions.value.includes('Delete'),
				update: allowedActions.value.includes('Update'),
		  }
		: { 'no-actions': true }
) as VdxTableActions

const branchesTable = reactive<VdxTableInterface<Branch>>({
	title: 'Branches',
	columns: [
		{ accessorKey: 'vdx-status', header: 'Status' },
		{ accessorKey: 'name', header: 'Name' },
		{ accessorKey: 'location', header: 'Location' },
	],
	attributes: {
		card: {
			ui: {
				body: 'sm:p-0 p-0',
				header: 'sm:px-3 px-3 sm:py-2 py-2',
				footer: 'flex justify-center sm:p-2 p-2',
			},
		},
		table: {
			ui: { td: 'sm:px-3 px-3 sm:py-1 py-1' },
			expanded: true,
		},
		editButton: { variant: 'link', class: 'cursor-pointer' },
		deleteButton: { variant: 'link', class: 'cursor-pointer', color: 'error' },
	},
	filters: {
		dateRange: true,
	},
	modal: {
		attributes: {
			title: 'Branches Form',
			description: 'This is the Branches form.',
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
					body: 'sm:p-1 p-1',
					footer: 'sm:p-3 p-3',
				},
				variant: 'soft',
				class: 'bg-neutral',
			},
			fields: {
				id: {
					type: 'default',
					formField: {},
					attributes: {},
					hidden: true,
				},
				name: {
					type: 'default',
					formField: { label: 'Name' },
					attributes: {
						class: 'w-full',
						placeholder: 'Enter Name',
					},
					validateOnChange: true,
					validations: {
						rules: 'required',
						messages: {
							required: 'Name is required',
						},
					},
				},
				location: {
					type: 'default',
					formField: { label: 'Location' },
					attributes: {
						class: 'w-full',
						placeholder: 'Enter Location',
					},
					validateOnChange: true,
					validations: {
						rules: 'required',
						messages: {
							required: 'Location is required',
						},
					},
				},
				status: {
					type: 'select',
					formField: { label: 'Status' },
					attributes: {
						class: 'w-full',
						placeholder: 'Select Status',
					},
					validateOnChange: true,
					validations: {
						rules: 'required',
						messages: {
							required: 'Status is required',
						},
					},
					itemsProvider: {
						type: 'default',
						items: ['OPEN', 'ACTIVE', 'INACTIVE', 'FOR APPROVAL', 'APPROVED'],
					},
				},
			},
		},
	},
	actions: tableActions,
	paginationUrl: 'https://retoolapi.dev/rcFSWW/data',
})

const statusColor = computed(
	(): Record<string, string> => ({
		OPEN: 'text-orange-400',
		ACTIVE: 'text-green-400',
		INACTIVE: 'text-gray-400',
		'FOR APPROVAL': 'text-blue-400',
		APPROVED: 'text-green-400',
	})
)
</script>
