<template>
	<div class="w-full h-full flex justify-center">
		<MdForm :form="auth">
			<template #body>
				<UButton
					label="Google"
					block
					class="rounded-sm mb-5 cursor-pointer"
					icon="mdi-google"
					variant="subtle" />
				<UButton
					label="Facebook"
					block
					class="rounded-sm mb-5 cursor-pointer"
					icon="mdi-facebook"
					variant="subtle" />

				<USeparator label="or" class="my-3" />
			</template>

			<template #actions>
				<UButton label="Continue" block @click="submitForm" />
			</template>
		</MdForm>
	</div>
</template>

<script setup lang="ts">
import type { MdFormInterface } from '@/components/MdForm.vue'
import { useMdForm } from '@/composables'

const auth: MdFormInterface = reactive({
	title: 'Login',
	attributes: {
		ui: {
			root: 'max-w-[500px] w-[500px] rounded-sm self-center',
			header: 'sm:p-2 p-2 flex justify-center text-xl',
			body: 'sm:p-3 p-3',
		},
	},
	fields: {
		email: {
			type: 'default',
			formField: {
				label: 'Email',
				class: 'mb-3',
			},
			grid: 'col-span-12',
			attributes: {
				placeholder: 'Enter your email',
				class: 'w-full',
				icon: 'mdi-email',
				type: 'email',
			},
			validateOnChange: true,
			validations: {
				rules: 'required|email',
				messages: {
					required: 'Please provide an email',
					email: 'Please provide a valid email.',
				},
			},
		},
		password: {
			type: 'default',
			formField: {
				label: 'Password',
				class: 'mb-3',
			},
			grid: 'col-span-12',
			attributes: {
				placeholder: 'Enter your Password',
				type: 'password',
				class: 'w-full',
				icon: 'mdi-lock',
			},
			validateOnChange: true,
			validations: {
				rules: 'required',
				messages: {
					required: 'Please provide an email',
				},
			},
		},
	},
})

const submitForm = async () => {
	const validated = await useMdForm(auth).validate()
	if (!validated) return

	const formData = useMdForm(auth).get()

	console.log(formData)
}
</script>
