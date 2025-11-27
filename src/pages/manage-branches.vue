<template>
	<!--<UFileUpload
		v-model="files"
		class="w-96 min-h-48"
		multiple
		:icon="loading ? 'line-md:loading-twotone-loop' : 'material-symbols:upload'"
		label="Uploads"
		:disabled="loading"
		description="Click to add files" />-->

	<!--<UButton @click="reload()" label="Get Files" />-->

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
import usePermission from '@/composables/usePermission'
import { convertStringCases } from '@/utils'
import axios from 'axios'

interface Branch {
	id: number
	name: string
	location: string
	status: string
}

const tableActions = computed(() => ({
	create: usePermission('create-branch').allowed,
	delete: usePermission('delete-branch').allowed,
	update: usePermission('update-branch').allowed,
	...(!usePermission(['create-branch', 'update-branch', 'delete-branch']).allowed && {
		'no-actions': true,
	}),
})) as VdxTableActions

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
				images: {
					type: 'fileUploader',
					grid: 'col-span-12',
					formField: {
						label: 'Images',
						description: 'Add Images file to your form.',
						hint: '(docx,pdf)',
						class: 'mt-2',
					},
					attributes: {
						icon: 'mdi-image',
						label: 'Images',
						description: 'Add file Images',
						class: 'cursor-pointer',
						multiple: false,
						accept: 'image/png,jpg,jpeg',
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

function blobToFile(blob: Blob, fileName: string): File {
	return new File([blob], fileName, { type: blob.type })
}

const imageUrls = [
	'https://media.licdn.com/dms/image/v2/D5603AQELfgzipMJ8cQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1732012492768?e=1765411200&v=beta&t=9b9Ewf-BsU6hWHs6aL3_ng8Oul6CPUs7RXrH7LTSKQE',
	'https://resource.xp-pen.com/static/images/20251119/mjIlqHH2324jTwAu0jcE.webp',
]

const loadfiles = () => {
	const loading = ref(false)
	const files = ref<File[]>([])

	const getBlobs = async () => {
		try {
			loading.value = true
			const imageResponse = await Promise.all(
				imageUrls.map((url) => axios.get(url, { responseType: 'blob' }))
			)
			const images = imageResponse.map((res, index) =>
				blobToFile(res.data, `image_${index}.jpg`)
			)

			files.value = images
		} catch {
			console.log('Something went wrong while loading files')
		}

		loading.value = false
	}

	getBlobs()

	return {
		loading,
		files,
		reload: getBlobs,
	}
}

const { files, loading, reload } = loadfiles()
</script>
