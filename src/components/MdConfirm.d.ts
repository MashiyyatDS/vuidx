import type { ButtonProps, EmptyProps, ModalProps } from '@nuxt/ui'
import { modalOverlay } from '@/composables/useMdConfirm'

export interface MdConfirmInterface {
	attributes?: {
		modal?: ModalProps
		cancel?: ButtonProps
		confirm?: ButtonProps
		body?: EmptyProps
	}
	actions?: {
		confirm?: boolean
		cancel?: boolean
	}
}

export interface MdConfirmCallBack {
	onCancel?: (overlay: typeof modalOverlay) => void
	onConfirm?: (overlay: typeof modalOverlay) => void
}

const callback: MdConfirmCallBack = {
	onConfirm: (overlay) => {
		overlay.close()
	},
}
