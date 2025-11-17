<template>
	<UModal v-bind="confirm?.attributes?.modal">
		<template #body>
			<UEmpty v-bind="confirm?.attributes?.body" />
		</template>

		<template #footer>
			<UButton
				v-if="callbacks?.onCancel"
				v-bind="confirm?.attributes?.cancel"
				@click="callbacks.onCancel(modalOverlay)" />

			<UButton
				v-if="callbacks?.onConfirm"
				v-bind="confirm?.attributes?.confirm"
				@click="callbacks?.onConfirm(modalOverlay)" />
		</template>
	</UModal>
</template>

<script setup lang="ts">
import type { MdConfirmCallBack, MdConfirmInterface } from './MdConfirm'
import { modalOverlay } from '@/composables/useMdConfirm'

const confirm = defineModel<MdConfirmInterface>('confirm', { required: true })

const callbacks = defineModel<MdConfirmCallBack>('callbacks')
</script>
