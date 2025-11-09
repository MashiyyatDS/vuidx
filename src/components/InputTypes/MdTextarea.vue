<template>
	<UTextarea
		v-model="textarea.value"
		v-bind="textarea.attributes"
		@update:model-value="useMdInput(textarea).onChange()" />
</template>

<script setup lang="ts">
import type { MdTextareaDefaultInterface } from './MdTextarea.vue.d.ts'
import useMdInput from '../../composables/useMdInput.ts'
import { defineModel } from 'vue'

const textarea = defineModel<MdTextareaDefaultInterface>('textarea', { required: true })
</script>
