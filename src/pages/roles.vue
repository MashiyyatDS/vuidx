<template>
	<VdxTable :data-table="rolesTable" ref="branchTableRef">
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
import type { VdxTableInterface } from '@/components/VdxTable.vue.d.ts'
import { convertStringCases } from '@/utils'

interface Branch {
	id: number
	name: string
	location: string
	status: string
	created_at: string
}

const getCurrentDate = computed(() =>
	new Date().toLocaleString('en-US', {
		month: 'short',
		day: '2-digit',
		year: 'numeric',
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
	})
)

const rolesTable = reactive<VdxTableInterface<Branch>>({
	title: 'Branches',
	columns: [
		{ accessorKey: 'vdx-status', header: 'Status' },
		{ accessorKey: 'name', header: 'Name' },
		{ accessorKey: 'created_at', header: 'Date Created' },
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
			title: 'Roles Form',
			description: 'This is the Roles form.',
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
				status: {
					type: 'select',
					formField: { label: 'Status' },
					attributes: {
						class: 'w-full',
						placeholder: 'Select Status',
						defaultValue: 'ACTIVE',
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
						items: ['ACTIVE', 'INACTIVE'],
					},
				},
			},
		},
		defaultValue: {
			created_at: getCurrentDate.value,
		},
	},
	paginationUrl: 'https://retoolapi.dev/Uh2m3Q/data',
})

const statusColor = computed(
	(): Record<string, string> => ({
		ACTIVE: 'text-green-400',
		INACTIVE: 'text-red-400',
	})
)
</script>
