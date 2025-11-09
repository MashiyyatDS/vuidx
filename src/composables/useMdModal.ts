import { defineAsyncComponent } from 'vue'
import type { MdModalInterface } from '../components/MdModal.vue.d.ts'
import useMdForm from './useMdForm.ts'
import { useOverlay } from '@nuxt/ui/runtime/composables/useOverlay.js'

const mdModalComponent = defineAsyncComponent(() => import('../components/MdModal.vue'))
export const modalOverlay = useOverlay().create(mdModalComponent)
export default function (modal: MdModalInterface) {
	const openModal = (callback: (payload: any) => void, payload?: Record<string, any>) => {
		useMdForm(modal.form).set(payload)

		modalOverlay.open({ callback, modal })
	}

	const closeModal = () => {
		modalOverlay.close()

		setTimeout(() => useMdForm(modal.form).reset(), 200)
	}

	return { openModal, closeModal }
}
