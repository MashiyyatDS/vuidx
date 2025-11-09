import type { PinInputProps } from '@nuxt/ui/components/PinInput.vue.d.ts'
import type { AcceptableValue } from '@nuxt/ui/runtime/types/utils.js'
import type { MdInputBaseInterface } from '../../types'

export interface MdPinInputProps {
	test: string
}

export interface MdPinInputSlots {
	test: string
}

export interface MdPinInputInterface extends MdInputBaseInterface {
	type: 'pin-input'
	value?: any
	attributes: PinInputProps | Record<string, AcceptableValue>
}
