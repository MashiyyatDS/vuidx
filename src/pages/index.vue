<template>
	<div class="flex justify-center overflow-auto">
		<UCard
			:ui="{ header: 'sm:p-2 p-2 flex gap-1 justify-center', body: 'sm:p-2 p-2' }"
			class="w-[800px] m-3">
			<template #header>
				<UButton
					label="Open Modal"
					class="self-center cursor-pointer"
					@click="useMdModal(modalParams).openModal(saveData)" />

				<UButton label="Set Data" @click="useMdForm(modalParams.form).set(formData)" />
				<UButton label="Get Data" @click="getData" />
				<UButton label="Reset Data" @click="useMdForm(modalParams.form).reset()" />
				<UButton label="Validate Data" @click="useMdForm(modalParams.form).validate()" />
				<UButton label="Get Data" @click="getData" />
			</template>

			<MdForm :form="modalParams.form" />
		</UCard>
	</div>
</template>

<script setup lang="ts">
import { useMdModal, useMdForm, useMdField } from '@/composables'
import type { MdInputInterface, MdModalInterface } from '@/index'
import { useToast } from '@nuxt/ui/runtime/composables/useToast.js'
import { reactive } from 'vue'

const getCompanies = async () => {
	const responseJson = await fetch('https://retoolapi.dev/6uAp5X/data')
	const data = await responseJson.json()

	return { data }
}

const modalParams: MdModalInterface = reactive({
	attributes: {
		ui: {
			header: 'sm:p-3 p-3',
			footer: 'sm:p-3 p-3 flex justify-between',
			body: 'sm:p-3 p-3',
			content: 'sm:w-full md:w-[600px] max-w-[800px]',
		},
		description: 'This is a sample modal description.',
		dismissible: false,
		title: 'Dynamic Form & Modal',
	},
	form: {
		attributes: {
			ui: {
				body: 'sm:p-2 p-2',
				header: 'sm:p-3 p-3',
			},
			variant: 'subtle',
		},
		fields: {
			first_name: {
				type: 'default',
				formField: {
					label: 'First name',
					description: 'This is the first name field',
					class: 'mb-3',
				},
				attributes: {
					placeholder: 'Enter your first name',
					autofocus: false,
					class: 'w-full',
					icon: 'mdi-edit',
				},
				grid: 'col-span-6',
				nullInUndefined: true,
				validateOnChange: true,
				validations: {
					rules: 'required',
					messages: {
						required: 'This field is required!!!!',
					},
				},
			},
			last_name: {
				type: 'default',
				formField: {
					label: 'Last name',
					description: 'This is the last name field',
					class: 'mb-3',
				},
				attributes: {
					placeholder: 'Enter your last name',
					class: 'w-full',
					icon: 'mdi-edit',
				},
				grid: 'col-span-6',
				nullInUndefined: true,
				validateOnChange: true,
				validations: {
					rules: 'required',
					messages: {
						required: 'This field is required!!!!',
					},
				},
			},
			contact_number: {
				type: 'default',
				formField: {
					label: 'Contact Number',
					description: 'This is the contact number field',
					class: 'mb-3',
				},
				attributes: {
					placeholder: 'Enter your contact number',
					class: 'w-full',
					icon: 'material-symbols:call-sharp',
					modelModifiers: {},
				},
				grid: 'col-span-6',
				nullInUndefined: true,
				validateOnChange: true,
				validations: {
					rules: 'required|phContact',
					messages: {
						required: 'This field is required!!!!',
						phContact: 'Please provide a valid contact number',
					},
				},
			},
			company: {
				type: 'select',
				formField: {
					label: 'Select Company',
					description: 'Please select the desired company',
				},
				attributes: {
					class: 'w-full',
					labelKey: 'name',
					valueKey: 'id',
					placeholder: 'Select Company',
				},
				grid: 'col-span-6',
				itemsProvider: {
					definedKey: 'id',
					definedValue: 'name',
					type: 'api',
					api: {
						handler: getCompanies,
					},
				},
			},
			attachments: {
				type: 'fileUploader',
				grid: 'col-span-12',
				formField: {
					label: 'Attachments',
					description: 'Add attachments file to your form.',
					hint: '(png,jpg,jpeg)',
				},
				attributes: {
					icon: 'mdi-upload',
					label: 'Attachments',
					description: 'Add file attachments',
					class: 'cursor-pointer',
					accept: 'image/png',
				},
			},
			document: {
				type: 'fileUploader',
				grid: 'col-span-12',
				formField: {
					label: 'Document',
					description: 'Add Document file to your form.',
					hint: '(docx,pdf)',
				},
				attributes: {
					icon: 'mdi-document',
					label: 'Document',
					description: 'Add file Document',
					class: 'cursor-pointer',
					multiple: false,
					accept: 'application/pdf,docx',
				},
			},
		},
		forms: {
			user: {
				attributes: {
					ui: {
						body: 'sm:p-3 p-3',
						header: 'sm:p-3 p-3',
						root: 'my-2',
					},
					variant: 'outline',
				},
				title: 'User',
				fields: {
					first_name: {
						type: 'default',
						formField: {
							label: 'User First name',
							description: 'This is the first name field',
							class: 'mb-3',
						},
						attributes: {
							placeholder: 'Enter your first name',
							autofocus: false,
							class: 'w-full',
							icon: 'mdi-person',
						},
						grid: 'col-span-6',
						validateOnChange: true,
						validations: {
							rules: 'required',
							messages: {
								required: 'This field is required!!!!',
							},
						},
					},
					last_name: {
						type: 'default',
						formField: {
							label: 'User Last name',
							description: 'This is the last name field',
							class: 'mb-3',
						},
						attributes: {
							placeholder: 'Enter your last name',
							class: 'w-full',
							icon: 'mdi-person',
						},
						grid: 'col-span-6',
						validateOnChange: true,
						validations: {
							rules: 'required',
							messages: {
								required: 'This field is required!!!!',
							},
						},
					},
					email: {
						type: 'default',
						formField: {
							label: 'Email Address',
							description: 'This is the Email Address field',
							class: 'mb-3',
							eagerValidation: true,
							required: true,
						},
						attributes: {
							placeholder: 'Enter your Email Address',
							class: 'w-full',
							icon: 'mdi-email',
						},
						grid: 'col-span-12',
						validateOnChange: true,
						validations: {
							rules: 'email',
							messages: {
								email: 'Please provide a valid email',
							},
						},
					},
					address: {
						type: 'textarea',
						formField: {
							label: 'Address',
							description: 'This is the address field',
							class: 'mb-3',
						},
						attributes: {
							placeholder: 'Enter your address',
							class: 'w-full',
							autoresize: true,
						},
						grid: 'col-span-12',
						validateOnChange: true,
						validations: {
							rules: 'required',
							messages: {
								required: 'This field is required!!!!',
							},
						},
					},
				},
				forms: {
					experience: {
						attributes: {
							ui: {
								body: 'sm:p-3 p-3',
								header: 'sm:p-3 p-3',
								root: 'my-2',
							},
							variant: 'outline',
						},
						title: 'Experience',
						fields: {
							name: {
								type: 'default',
								formField: {
									label: 'Experience Name',
									description: 'This is the name field',
									class: 'mb-3',
								},
								attributes: {
									placeholder: 'Enter your Experience Name',
									autofocus: false,
									class: 'w-full',
									icon: 'mdi-person',
								},
								grid: 'col-span-12',
								validateOnChange: true,
								validations: {
									rules: 'required',
									messages: {
										required: 'This field is required!!!!',
									},
								},
							},
						},
					},
				},
			},
		},
		collections: {
			employees: {
				title: 'Employees',
				attributes: {
					card: {
						title: 'Employees',
						ui: {
							body: 'sm:p-2 p-2',
							header: 'sm:p-2 p-2',
						},
					},
					empty: {
						title: 'No employees found',
						icon: 'streamline-ultimate-color:office-employee',
						description:
							'It looks like you haven`t added any items. Create employee to get started.',
					},
					removeButton: {
						class: 'rounded-full',
						color: 'error',
					},
				},
				form: {
					attributes: {
						ui: {
							body: 'sm:p-3 p-3',
							header: 'sm:p-3 p-3',
							root: 'mb-2',
						},
						variant: 'subtle',
					},
					title: 'User',
					fields: {
						first_name: {
							type: 'default',
							formField: {
								label: 'User First name',
								description: 'This is the first name field',
								class: 'mb-3',
							},
							attributes: {
								placeholder: 'Enter your first name',
								autofocus: false,
								class: 'w-full',
								icon: 'mdi-person',
							},
							grid: 'col-span-6',
							validateOnChange: true,
							validations: {
								rules: 'required',
								messages: {
									required: 'This field is required!!!!',
								},
							},
						},
						last_name: {
							type: 'default',
							formField: {
								label: 'User Last name',
								description: 'This is the last name field',
								class: 'mb-3',
							},
							attributes: {
								placeholder: 'Enter your last name',
								class: 'w-full',
								icon: 'mdi-person',
							},
							grid: 'col-span-6',
							validateOnChange: true,
							validations: {
								rules: 'required',
								messages: {
									required: 'This field is required!!!!',
								},
							},
						},
						email: {
							type: 'default',
							formField: {
								label: 'Email Address',
								description: 'This is the Email Address field',
								class: 'mb-3',
								eagerValidation: true,
								required: true,
							},
							attributes: {
								placeholder: 'Enter your Email Address',
								class: 'w-full',
								icon: 'mdi-person',
							},
							grid: 'col-span-6',
							validateOnChange: true,
							validations: {
								rules: 'email',
								messages: {
									email: 'Please provide a valid email',
								},
							},
						},
						company: {
							type: 'select',
							formField: {
								label: 'Select Company',
								description: 'Please select the desired company',
							},
							attributes: {
								class: 'w-full',
								labelKey: 'name',
								valueKey: 'id',
								placeholder: 'Select Company',
							},
							grid: 'col-span-6',
							itemsProvider: {
								definedKey: 'id',
								definedValue: 'name',
								type: 'api',
								api: {
									handler: getCompanies,
								},
							},
						},
					},
				},
			},
		},
	},
	actions: {
		submit: {
			disabled: false,
		},
	},
})

const toast = useToast()

function saveData(data: any) {
	console.log(data)
	toast.add({
		title: 'Success',
		description: 'Adding user successfully',
		icon: 'mdi-check',
		color: 'success',
	})
}

const formData = {
	first_name: 'Mashiyyat',
	last_name: 'Delos Santos',
	user: {
		first_name: 'Mashiyyat',
		last_name: 'Delos Santos',
		email: 'delossantos.mash@gmail.com',
		address: 'San Jose del Monte Bulacan',
		children: [
			{ first_name: 'Children1', last_name: 'Children1' },
			{ first_name: 'Children2', last_name: 'Children2' },
		],
	},
	employees: [
		{
			first_name: 'First Name1',
			last_name: 'Delos Santos1',
			email: 'sampleEmail@gmail.com',
			company: 1,
		},
		{
			first_name: 'First Name2',
			last_name: 'Delos Santos2',
			email: 'sampleEmail@gmail.com',
			company: 5,
		},
	],
	managers: [
		{ first_name: 'First Name1', last_name: 'Delos Santos1', company: 1 },
		{ first_name: 'First Name2', last_name: 'Delos Santos2', company: 1 },
	],
}

const getData = () => {
	console.log(useMdForm(modalParams.form).get())
}

const onNameChange = () => {
	const userFirstName = useMdField(
		modalParams.form,
		'user.first_name'
	).getField() as MdInputInterface
	const userLastName = useMdField(
		modalParams.form,
		'user.last_name'
	).getField() as MdInputInterface
	const userEmail = useMdField(modalParams.form, 'user.email').getField() as MdInputInterface

	userEmail.value =
		userLastName.value && userFirstName.value
			? `${userLastName.value
					?.replace(' ', '')
					.toLowerCase()}.${userFirstName.value?.toLowerCase()}@gmail.com`
			: ''
}

useMdField(modalParams.form, 'user.first_name').onChange(onNameChange)
useMdField(modalParams.form, 'user.last_name').onChange(onNameChange)
</script>
