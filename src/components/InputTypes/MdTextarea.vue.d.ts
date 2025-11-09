import type { TextareaProps } from '@nuxt/ui/components/Textarea.vue.d.ts'
import type { MdInputBaseInterface } from '../../types'

export interface MdTextareaDefaultProps {
	test: string
}

export interface MdTextareaDefaultSlots {
	test: string
}

export interface MdTextareaDefaultInterface extends MdInputBaseInterface {
	type: 'textarea'
	value?: any
	attributes: TextareaProps | Record<string, string | number | null>
}
