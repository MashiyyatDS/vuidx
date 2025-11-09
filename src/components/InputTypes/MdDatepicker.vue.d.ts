import type { CalendarProps } from '@nuxt/ui/components/Calendar.vue.d.ts'
import type { ButtonProps } from '@nuxt/ui/components/Button.vue.d.ts'
import type { AcceptableValue } from '@nuxt/ui/runtime/types/utils.js'
import type { MdInputBaseInterface } from '../../types'
import { CalendarDateTime } from '@internationalized/date'

export interface MdDatepickerInterface extends MdInputBaseInterface {
	type: 'datepicker'
	value?: undefined | CalendarDateTime
	attributes: CalendarProps | Record<string, AcceptableValue>
	buttonAttributes?: ButtonProps | Record<string, AcceptableValue>
}
