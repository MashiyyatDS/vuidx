import type { CardProps } from '@nuxt/ui/components/Card.vue.d.ts'
import type { MdInputInterface } from './MdInput.vue.d.ts'
import type { EmptyProps } from '@nuxt/ui/components/Empty.vue.d.ts'
import type { ButtonProps } from '@nuxt/ui/components/Button.vue.d.ts'

interface MdFormProps {
	test?: string
}

interface MdFormSlots {
	header: () => void
	actions: () => void
	default: (props: { getValue: () => any }) => void
	'trailing-header': () => void
}

interface MdFormCollection {
	title?: string
	form: MdFormInterface
	items?: any[] // Use `any[]` instead of `MdFormInterface[]` to break recursion
	grid?: string
	attributes: {
		card?: CardProps | Record<string, any>
		removeButton?: ButtonProps | Record<string, any>
		addButton?: ButtonProps | Record<string, any>
		empty?: EmptyProps | Record<string, any>
	}
}

interface MdFormBase {
	title?: string
	description?: string
	attributes?: CardProps
	fields?: Record<string, MdInputInterface>
	forms?: Record<string, MdFormInterface>
	steps?: Record<string, MdFormInterface>
	collections?: Record<string, MdFormCollection>
}

type MdFormInterface = MdFormBase

export type { MdFormInterface, MdFormSlots, MdFormProps, MdFormCollection }
