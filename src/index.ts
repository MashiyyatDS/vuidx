import MdBreadcrumb from './components/MdBreadcrumb.vue'
import MdInput from './components/MdInput.vue'
import MdModal from './components/MdModal.vue'
import MdForm from './components/MdForm.vue'
import MdApp from './components/MdApp.vue'
import ui from '@nuxt/ui/vue-plugin'
import { type App } from 'vue'
import './assets/md.css'

declare module 'vue' {
	export interface GlobalComponents {
		MdForm: typeof MdForm
		MdInput: typeof MdInput
		MdModal: typeof MdModal
		MdBreadcrumb: typeof MdBreadcrumb
		MdApp: typeof MdApp
	}
}

export default {
	install: (app: App<Element>) => {
		app.component('MdForm', MdForm)
		app.component('MdInput', MdInput)
		app.component('MdModal', MdModal)
		app.component('MdBreadcrumb', MdBreadcrumb)
		app.component('MdApp', MdApp)

		app.use(ui)
	},
}

export type * from './components/MdInput.vue.d.ts'
export type * from './components/MdForm.vue.d.ts'
export type * from './components/MdModal.vue.d.ts'
export * from './composables'

export { MdForm, MdInput, MdBreadcrumb, MdModal }
