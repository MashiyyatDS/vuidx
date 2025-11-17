<template>
	<VdxTable :data-table="usersTable" ref="usersTableRef">
		<template #vdx-first_name-cell="{ item }">
			<span>{{ [item.first_name, item.middle_name, item.last_name].join(' ') }}</span>
		</template>
	</VdxTable>
</template>

<script setup lang="ts">
import type { VdxTableInterface } from '@/components/VdxTable.vue.d.ts'

interface User {
	id: number
	first_name: string
	middle_name?: string
	last_name: string
	email: string
	address: string
}

const paginationProvider = <M>() => {
	const loading = ref(false)
	const data = ref<M[]>([])

	const fetchData = async () => {
		data.value = []
		loading.value = true

		const responseJson = await fetch('https://retoolapi.dev/vgkfAF/data')
		const responseData = await responseJson.json()

		data.value = responseData

		loading.value = false

		return responseData
	}

	watchEffect(async () => await fetchData())

	return { loading, data, fetchData }
}

const usersTable = reactive<VdxTableInterface<User>>({
	title: 'Users',
	columns: [
		{ accessorKey: 'vdx-first_name', header: 'Name' },
		{ accessorKey: 'email', header: 'Email' },
		{ accessorKey: 'address', header: 'Address' },
	],
	attributes: {
		card: {
			ui: {
				body: 'sm:p-0 p-0',
				header: 'sm:px-3 px-3 sm:py-2 py-2',
			},
		},
		table: {
			ui: {
				td: 'sm:p-2 p-2',
			},
		},
	},
	paginationProvider,
	filters: {
		dateRange: true,
	},
	modal: {
		attributes: {
			title: 'User Form',
			description: 'This is the user form.',
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
				first_name: {
					type: 'default',
					formField: { label: 'First Name' },
					attributes: {
						class: 'w-full',
						placeholder: 'Enter First Name',
					},
					validateOnChange: true,
					validations: {
						rules: 'required',
						messages: {
							required: 'First Name is required',
						},
					},
				},
				middle_name: {
					type: 'default',
					formField: { label: 'Middle Name' },
					attributes: {
						class: 'w-full',
						placeholder: 'Enter Middle Name',
					},
				},
				last_name: {
					type: 'default',
					formField: { label: 'Last Name' },
					attributes: {
						class: 'w-full',
						placeholder: 'Enter Last Name',
					},
					validateOnChange: true,
					validations: {
						rules: 'required',
						messages: {
							required: 'Last Name is required',
						},
					},
				},
				email: {
					type: 'default',
					formField: { label: 'Email' },
					attributes: {
						class: 'w-full',
						placeholder: 'Enter Email',
					},
					validateOnChange: true,
					validations: {
						rules: 'required|email',
						messages: {
							required: 'Email is required',
							email: 'Please provide a valid email address.',
						},
					},
				},
				address: {
					type: 'textarea',
					formField: { label: 'Address' },
					attributes: {
						class: 'w-full',
						placeholder: 'Enter Address',
						autoresize: true,
						rows: 3,
					},
					validateOnChange: true,
					validations: {
						rules: 'required',
						messages: {
							required: 'Address is required',
						},
					},
				},
			},
		},
	},
})

const usersTableRef = useTemplateRef('usersTableRef')
</script>
