<template>
	<MdForm :form="form" />
</template>

<script setup lang="ts">
import type { MdFormInterface } from '@/components/MdForm.vue.d.ts'

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
	},
})
</script>
