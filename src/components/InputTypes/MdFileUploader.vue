<template>
	<UFileUpload v-model="fileUploader.value" v-bind="fileUploader.attributes" multiple />
</template>

<script setup lang="ts">
import type { MdFileUploader } from './MdFileUploader.vue.d.ts'

const fileUploader = defineModel<MdFileUploader>('fileUploader', { required: true })
</script>
