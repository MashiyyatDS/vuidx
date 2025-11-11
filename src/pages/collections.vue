<template>
	<div class="p-3 flex">
		<MdForm :form="collections">
			<template #actions>
				<UButton label="Submit Form" @click="submitForm" />
			</template>
		</MdForm>
		<small>
			<pre>{{ collectionData }}</pre>
		</small>
	</div>
</template>

<script setup lang="ts">
import type { MdFormInterface } from '@/components/MdForm.vue'
import { useMdField, useMdForm } from '@/composables'

const collections: MdFormInterface = reactive({
	attributes: {
		ui: {
			body: 'sm:p-1 p-1 border-none',
			header: 'sm:p-1 p-1',
			footer: 'sm:p-1 p-1 flex justify-center',
			root: 'w-[800px]',
		},
		as: 'div',
		class: 'bg-default',
		variant: 'soft',
	},
	collections: {
		users: {
			title: 'Users',
			attributes: {
				addButton: {
					label: 'Add User',
				},
				empty: {
					title: 'No users found',
					icon: 'mdi-account',
				},
				card: {
					ui: {
						body: 'sm:p-2 p-2',
					},
				},
				removeButton: {
					class: 'rounded-full',
					color: 'error',
				},
			},
			grid: 'col-span-12',
			form: {
				attributes: {
					ui: {
						body: 'sm:p-2 p-2',
						root: 'mb-2',
					},
				},
				fields: {
					first_name: {
						type: 'default',
						grid: 'col-span-6',
						attributes: {
							placeholder: 'User First name',
							class: 'w-full',
						},
						formField: {
							label: 'First Name',
						},
						nullInUndefined: true,
						validations: {
							rules: 'required',
							messages: {
								required: 'First name field is required',
							},
						},
					},
					last_name: {
						type: 'default',
						grid: 'col-span-6',
						attributes: {
							placeholder: 'User Last name',
							class: 'w-full',
						},
						formField: {
							label: 'Last Name',
						},
						nullInUndefined: true,
						validations: {
							rules: 'required',
							messages: {
								required: 'Last name field is required',
							},
						},
					},
					address: {
						type: 'textarea',
						grid: 'col-span-12',
						attributes: {
							placeholder: 'Address',
							class: 'w-full',
						},
						formField: {
							label: 'Address',
						},
						nullInUndefined: true,
						validations: {
							rules: 'required',
							messages: {
								required: 'Address field is required',
							},
						},
					},
				},
				collections: {
					skills: {
						title: 'Skills',
						attributes: {
							addButton: {
								label: 'Add Skills',
							},
							empty: {
								title: 'No skills found',
								icon: 'mdi-note',
							},
							card: {
								ui: {
									body: 'sm:p-2 p-2',
									header: 'sm:p-2 p-2',
									root: 'mt-2',
								},
								variant: 'subtle',
							},
							removeButton: {
								class: 'rounded-full',
								color: 'error',
							},
						},
						grid: 'col-span-6',
						form: {
							attributes: {
								ui: {
									body: 'sm:p-2 p-2',
									root: 'mb-2',
								},
							},
							fields: {
								name: {
									type: 'default',
									grid: 'col-span-12',
									attributes: {
										placeholder: 'Skill',
										class: 'w-full',
									},
									formField: {
										label: 'Skill',
									},
									nullInUndefined: true,
									validations: {
										rules: 'required',
										messages: {
											required: 'First name field is required',
										},
									},
								},
								proficiency: {
									type: 'select',
									grid: 'col-span-12',
									attributes: {
										placeholder: 'Proficiency',
										class: 'w-full',
									},
									formField: {
										label: 'Proficiency',
									},
									validations: {
										rules: 'required',
										messages: {
											required: 'Proficiency field is required',
										},
									},
									nullInUndefined: true,
									itemsProvider: {
										type: 'default',
										items: ['Student', 'Beginner', 'Advanced', 'Expert'],
									},
								},
							},
						},
					},
				},
			},
		},
	},
})

const collectionData = computed(() => useMdForm(collections).get())

const submitForm = () => {
	const data = useMdForm(collections).get()

	console.log(data)
}

const { onChange } = useMdField(collections, 'users.first_name')

onChange(() => {
	console.log('User first name changed')
})
</script>
