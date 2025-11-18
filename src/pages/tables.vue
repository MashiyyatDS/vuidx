<template>
	<UButton label="Open Confirm" @click="openConfirm" />

	<UTabs :items="tabs">
		<template #content="{ item }">
			<VdxTable :data-table="{ ...dataTable, title: item.label }">
				<template #vdx-name-cell="{ item }">
					<UButton
						:label="item.name"
						@click="useMdModal(modalParams).openModal(saveCompany, item)" />
				</template>

				<template #vdx-image-cell="{ item }">
					<UAvatar class="rounded-none squircle" :src="item.image" />
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
	</UTabs>
</template>

<script setup lang="ts">
import type { VdxTableInterface } from '@/components/VdxTable.vue.d.ts'
import { useMdModal, type MdModalInterface } from '../index'
import useMdConfirm from '@/composables/useMdConfirm'
import type { TabsItem } from '@nuxt/ui'

interface Company {
	id: number
	name: string
	image: string
	rating: any
}

const getCompanies = async () => {
	const responseJson = await fetch('https://retoolapi.dev/6uAp5X/data')
	const data = await responseJson.json()

	return { data }
}

const dataTable = reactive<VdxTableInterface<Company>>({
	title: 'Sample Table',
	columns: [
		{ accessorKey: 'id', header: 'ID' },
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
			},
		},
		table: {
			ui: {
				td: 'sm:p-2 p-2',
			},
			expanded: true,
		},
	},
	filters: {
		form: {
			attributes: {
				ui: {
					header: 'sm:p-1 p-1',
					body: 'sm:p-1 p-1',
					root: 'rounded-sm bg-neutral',
				},
				variant: 'solid',
			},
			fields: {
				email: {
					type: 'default',
					formField: {
						label: 'Email Address',
						class: 'mb-1',
						description: 'Filter by email address.',
					},
					grid: 'col-span-12',
					attributes: {
						placeholder: 'Enter your Email Address.',
						class: 'w-full',
						icon: 'mdi-email',
					},
					validateOnChange: true,
					validations: {
						rules: 'required|min:2|email',
						messages: {
							required: 'This field is required',
							email: 'Please provide a valid email address',
						},
					},
				},
				company: {
					type: 'select',
					formField: {
						label: 'Select Company',
						class: 'mb-1',
						description: 'Filter by companies',
					},
					attributes: {
						class: 'w-full',
						labelKey: 'name',
						valueKey: 'id',
						placeholder: 'Select Company',
						icon: 'mdi-edit',
					},
					grid: 'col-span-12',
					itemsProvider: {
						definedKey: 'id',
						definedValue: 'name',
						type: 'api',
						api: {
							handler: getCompanies,
						},
					},
				},
				proficiency: {
					type: 'select',
					grid: 'col-span-12',
					attributes: {
						placeholder: 'Proficiency',
						class: 'w-full',
						icon: 'mdi-edit',
					},
					formField: {
						label: 'Proficiency',
						description: 'Filter by proficiency.',
						class: 'mb-1',
					},
					validations: {
						rules: 'required',
						messages: {
							required: 'Proficiency field is required',
						},
					},
					itemsProvider: {
						type: 'default',
						items: ['Student', 'Beginner', 'Advanced', 'Expert'],
					},
				},
			},
		},
		dateRange: true,
	},
	actions: {
		//delete: false,
		//create: false	,
		//update: false,
	},
	modal: {
		form: {},
	},
	paginationUrl: 'https://retoolapi.dev/VJ3ZG3/data',
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

const tabs = ref<TabsItem[]>([
	{
		label: 'Companies',
		icon: 'i-lucide-user',
		content: 'This is the account content.',
	},
	{
		label: 'Users',
		icon: 'i-lucide-lock',
		content: 'This is the password content.',
	},
])

const toast = useToast()
function openConfirm() {
	useMdConfirm(
		{
			attributes: {
				body: {
					title: 'Mashiyyat Delos Santos',
					description: 'Incoming call from Mashiyyat Delos Santos',
					class: 'w-full bg-neutral',
					avatar: {
						src: 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
						alt: 'MD',
						size: '2xl',
					},
					ui: {
						root: 'text-center',
						body: 'sm:p-0',
					},
					variant: 'soft',
				},
				cancel: {
					color: 'error',
					class: 'rounded-full cursor-pointer',
					icon: 'mdi:phone-hangup',
					size: 'xl',
				},
				confirm: {
					color: 'success',
					class: 'rounded-full cursor-pointer',
					icon: 'material-symbols:call',
					size: 'xl',
				},
				modal: {
					title: 'Confirmation',
					description: 'Sample Description',
					ui: {
						footer: 'flex justify-center gap-8 px-5',
						header: 'sm:p-3 p-3 hidden',
						body: 'sm:p-1 p-1 border-none',
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
					title: 'Confirmation Success',
					description: `Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...`,
					duration: 1500,
				})
			},
		}
	)
}
</script>
