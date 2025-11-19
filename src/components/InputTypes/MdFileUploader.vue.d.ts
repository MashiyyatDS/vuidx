import type { FileUploadProps } from '@nuxt/ui/runtime/components/FileUpload.vue.js'
import type { MdInputBaseInterface } from '../../types'

export interface MdFileUploader extends MdInputBaseInterface {
	type: 'fileUploader'
	value?: any
	attributes: FileUploadProps
}
