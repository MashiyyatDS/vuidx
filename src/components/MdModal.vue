<template>
	<UModal v-bind="modal.attributes" :close="false" :modal="true">
		<template #body>
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
import useMdForm from '../composables/useMdForm.ts'
import MdForm from '../components/MdForm.vue'
import useMdModal from '../composables/useMdModal.ts'
import { defineModel } from 'vue'

const callback = defineModel<(payload: any) => void>('callback', { required: true })

const modal = defineModel<MdModalInterface>('modal', { required: true })

const submitModal = async () => {
	const formData = useMdForm(modal.value.form).get()

	const formValidated = await useMdForm(modal.value.form).validate()

	if (!formValidated) return

	callback.value(formData)

	useMdModal(modal.value).closeModal()
}
</script>
