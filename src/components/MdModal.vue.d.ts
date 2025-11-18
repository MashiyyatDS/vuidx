import type { ModalProps } from '@nuxt/ui/components/Modal.vue.d.ts'
import type { MdFormInterface } from './MdForm.vue.d.ts'
import type { ButtonProps } from '@nuxt/ui/runtime/components/Button.vue.js'

interface MdModalInterface {
	attributes?: ModalProps
	form: MdFormInterface
	uploader?: boolean
	preview?: boolean
	actions?: {
		submit?: ButtonProps
		cancel?: ButtonProps
		previous?: ButtonProps
	}
	defaultValue?: Record<string, unknown>
}

export type { MdModalInterface }
