<template>
	<UModal v-bind="modal.attributes" :close="false" :modal="true">
		<template #body>
			<UStepper ref="stepper" :items="steps">
				<template #content="{ item }">
					<small>
						<pre>{{ item }}</pre>
					</small>
				</template>
			</UStepper>

			<MdForm :form="modal.form" />
		</template>

		<template #footer>
			<UButton label="Cancel" @click="useMdModal(modal).closeModal()" />

			<UButton label="Submit" @click="submitModal" v-bind="modal?.actions?.submit" />
		</template>
	</UModal>
</template>

<script setup lang="ts">
import type { MdModalInterface } from './MdModal.vue.d.ts'
import useMdModal from '../composables/useMdModal.ts'
import useMdForm from '../composables/useMdForm.ts'
import MdForm from '../components/MdForm.vue'
import type { StepperItem } from '@nuxt/ui'

const callback = defineModel<(payload: any) => void>('callback', { required: true })

const modal = defineModel<MdModalInterface>('modal', { required: true })

const submitModal = async () => {
	const formData = useMdForm(modal.value.form).get()

	const formValidated = await useMdForm(modal.value.form).validate()

	if (!formValidated) return

	callback.value({
		...formData,
		...modal.value.defaultValue,
	})

	useMdModal(modal.value).closeModal()
}

const steps = computed((): StepperItem[] => [
	{
		title: 'Form',
		icon: 'i-lucide-house',
	},
	...(modal.value?.uploader
		? [
				{
					title: 'Upload',
					icon: 'mdi-upload',
				},
		  ]
		: []),
	{
		title: 'Shipping',
		description: 'Set your preferred shipping method',
		icon: 'i-lucide-truck',
	},
	{
		title: 'Checkout',
		description: 'Confirm your order',
	},
])
</script>
