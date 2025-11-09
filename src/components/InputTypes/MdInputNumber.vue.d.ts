import type { InputNumberProps } from '@nuxt/ui/components/InputNumber.vue.d.ts'
import type { AcceptableValue } from '@nuxt/ui/runtime/types/utils.js'
import type { MdInputBaseInterface } from '../../types'

export interface MdInputNumberProps {
	test: string
}

export interface MdInputNumberSlots {
	test: string
}

export interface MdInputNumberInterface extends MdInputBaseInterface {
	type: 'input-number'
	value?: any
	attributes: InputNumberProps | Record<string, AcceptableValue>
}
