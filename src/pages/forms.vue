<template>
	<MdForm :form="form">
		<template #actions>
			<div class="flex gap-1">
				<UButton label="Validate Form" @click="validateForm" />

				<UButton label="Get Form Data" @click="getFormData" />

				<UButton label="Set Form Data" @click="setFormData" />

				<UButton label="Set Form Errors" @click="setFormErrors" />
			</div>
		</template>
	</MdForm>
</template>

<script setup lang="ts">
import type { MdFormInterface } from '@/components/MdForm.vue.d.ts'
import { useMdForm } from '@/composables'

const getCompanies = async () => {
	const responseJSON = await fetch('https://retoolapi.dev/XdsBKF/data')
	const responseData = await responseJSON.json()

	return {
		data: responseData,
	}
}

const form: MdFormInterface = reactive({
	title: 'Sample Form',
	attributes: {
		ui: {
			header: 'sm:p-3 p-3',
			body: 'sm:p-3 p-3',
			root: 'rounded-sm',
		},
	},
	fields: {
		first_name: {
			type: 'default',
			formField: {
				label: 'First Name',
				class: 'mb-3',
			},
			grid: 'col-span-12',
			attributes: {
				placeholder: 'Enter your first name.',
				class: 'w-full',
			},
			validateOnChange: true,
			validations: {
				rules: 'required|min:2',
				messages: {
					required: 'This field is required',
					min: 'Minimum 2 characters are required',
				},
			},
		},
		last_name: {
			type: 'default',
			formField: {
				label: 'Last Name',
				class: 'mb-3',
			},
			grid: 'col-span-12',
			attributes: {
				placeholder: 'Enter your last name.',
				class: 'w-full',
			},
			validateOnChange: true,
			validations: {
				rules: 'required|min:2',
				messages: {
					required: 'This field is required',
					min: 'Minimum 2 characters are required',
				},
			},
		},
		email: {
			type: 'default',
			formField: {
				label: 'Email Address',
				class: 'mb-3',
			},
			grid: 'col-span-12',
			attributes: {
				placeholder: 'Enter your Email Address.',
				class: 'w-full',
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
		active: {
			type: 'checkbox',
			attributes: {
				class: 'w-full',
				icon: 'mdi-edit',
			},
			formField: {
				label: 'Sample Checkbox',
				description: 'This is a sample description',
			},
			grid: 'col-span-12',
			validations: {
				rules: 'required',
				messages: {
					required: 'This checkbox field is required',
				},
			},
		},
		companies: {
			type: 'select-menu',
			attributes: {
				class: 'w-full',
				placeholder: 'Select Companies',
				labelKey: 'name',
				valueKey: 'id',
				multiple: true,
			},
			formField: {
				label: 'Companies',
				class: 'mb-3',
			},
			grid: 'col-span-12',
			validations: {
				rules: 'required',
				messages: {
					required: 'This field is required',
				},
			},
			itemsProvider: {
				type: 'api',
				definedKey: 'name',
				definedValue: 'id',
				api: {
					handler: getCompanies,
				},
			},
		},
	},
})

const validateForm = async () => {
	const validated = await useMdForm(form).validate()

	console.log(validated)
}

const getFormData = () => {
	const formData = useMdForm(form).get()

	console.log(formData)
}

const setFormData = () => {
	useMdForm(form).set({
		first_name: 'John',
		last_name: 'Doe',
		email: 'johnDoe@gmail.com',
		active: true,
		companies: [1, 2, 3, 4],
	})
}

const setFormErrors = () => {
	useMdForm(form).setErrors({
		first_name: 'This field is required',
	})
}
</script>
