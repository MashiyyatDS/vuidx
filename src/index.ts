import MdBreadcrumb from './components/MdBreadcrumb.vue'
import MdInput from './components/MdInput.vue'
import MdModal from './components/MdModal.vue'
import MdForm from './components/MdForm.vue'
import MdApp from './components/MdApp.vue'
import VdxTable from './components/VdxTable.vue'
import ui from '@nuxt/ui/vue-plugin'
import { type App } from 'vue'
import './assets/md.css'

import { setLocales, en, register, isRegistered } from 'robust-validator'

const validatePHContactNumber = (value: string) => {
	const sanitized = value.replace(/[\s-]/g, '')
	const regex = /^(?:\+63|0)9\d{9}$/
	return regex.test(sanitized)
}

if (!isRegistered('phContact'))
	register('phContact', validatePHContactNumber, { en: 'Please provide a valid contact number' })

setLocales(en)

declare module 'vue' {
	export interface GlobalComponents {
		MdForm: typeof MdForm
		MdInput: typeof MdInput
		MdModal: typeof MdModal
		MdBreadcrumb: typeof MdBreadcrumb
		MdApp: typeof MdApp
		VdxTable: typeof VdxTable
	}
}

export default {
	install: (app: App<Element>) => {
		app.component('MdForm', MdForm)
		app.component('MdInput', MdInput)
		app.component('MdModal', MdModal)
		app.component('MdBreadcrumb', MdBreadcrumb)
		app.component('MdApp', MdApp)
		app.component('VdxTable', () => import('./components/VdxTable.vue'))

		app.use(ui)
	},
}

export type * from './components/MdInput.vue.d.ts'
export type * from './components/MdForm.vue.d.ts'
export type * from './components/MdModal.vue.d.ts'
export * from './composables'

export { MdForm, MdInput, MdBreadcrumb, MdModal }
