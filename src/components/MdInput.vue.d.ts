import { type MdInputDefaultInterface } from './InputTypes/MdInputDefault.vue.d.ts'
import { type MdTextareaDefaultInterface } from './InputTypes/MdTextarea.vue.d.ts'
import { type MdSwitchInterface } from './InputTypes/MdSwitch.vue.d.ts'
import { type MdPinInputInterface } from './InputTypes/MdPinInput.vue.d.ts'
import { type MdInputNumberInterface } from './InputTypes/MdInputNumber.vue.d.ts'
import { type MdCheckboxInterface } from './InputTypes/MdCheckbox.vue.d.ts'
import { type MdCheckboxGroupInterface } from './InputTypes/MdCheckboxGroup.vue.d.ts'
import { type MdRadioGroupInterface } from './InputTypes/MdRadioGroup.vue.d.ts'
import { type MdDatepickerInterface } from './InputTypes/MdDatepicker.vue.d.ts'
import { type MdSelectInterface } from './InputTypes/MdSelect.vue.d.ts'
import { type MdSelectMenuInterface } from './InputTypes/MdSelectMenu.vue.d.ts'
import { type MdInputMenuInterface } from './InputTypes/MdInputMenu.vue.d.ts'

export interface MdInputProps {
	test?: string
}

export interface MdInputSlots {
	test: string
}

type MdInputTypes =
	| MdTextareaDefaultInterface
	| MdInputDefaultInterface
	| MdSwitchInterface
	| MdPinInputInterface
	| MdInputNumberInterface
	| MdCheckboxInterface
	| MdCheckboxGroupInterface
	| MdRadioGroupInterface
	| MdDatepickerInterface
	| MdSelectInterface
	| MdSelectMenuInterface
	| MdInputMenuInterface

export type MdInputInterface = MdInputTypes

export { MdInputMenuInterface, MdInputSlots, MdInputProps }
