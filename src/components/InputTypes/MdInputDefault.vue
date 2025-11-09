<template>
	<UInput
		v-model="input.value"
		v-bind="input.attributes"
		@update:model-value="useMdInput(input).onChange()" />
</template>

<script setup lang="ts">
import type { MdInputDefaultInterface } from './MdInputDefault.vue.d.ts'
import useMdInput from '../../composables/useMdInput.ts'
import { defineModel } from 'vue'

const input = defineModel<MdInputDefaultInterface>('input', { required: true })
</script>
