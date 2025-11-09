import type { SwitchProps } from '@nuxt/ui/components/Switch.vue.d.ts'
import type { AcceptableValue } from '@nuxt/ui/runtime/types/utils.js'
import type { MdInputBaseInterface } from '../../types'

export interface MdSwitchProps {
	test: string
}

export interface MdSwitchSlots {
	test: string
}

export interface MdSwitchInterface extends MdInputBaseInterface {
	type: 'switch'
	value?: any
	attributes: SwitchProps | Record<string, AcceptableValue>
}
