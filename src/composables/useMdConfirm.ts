import type { MdConfirmCallBack, MdConfirmInterface } from '@/components/MdConfirm.d.ts'
import { useOverlay } from '@nuxt/ui/runtime/composables/useOverlay.js'

const confirmModal = defineAsyncComponent(() => import('../components/MdConfirm.vue'))
export const modalOverlay = useOverlay().create(confirmModal)

export default function (confirm: MdConfirmInterface, callbacks: MdConfirmCallBack) {
	modalOverlay.open({
		confirm,
		callbacks,
	})
}
