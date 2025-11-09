import type { InputProps } from '@nuxt/ui/components/Input.vue.d.ts'
import type { AcceptableValue } from '@nuxt/ui/runtime/types/utils.js'
import type { MdInputBaseInterface } from '../../types'

export interface MdInputDefaultProps {
	test: string
}

export interface MdInputDefaultSlots {
	test: string
}

export interface MdInputDefaultInterface extends MdInputBaseInterface {
	type: 'default'
	value?: any
	attributes: InputProps | Record<string, AcceptableValue>
}
