<template>
	<UInputNumber v-bind="input.attributes" />
</template>

<script setup lang="ts">
import type { MdInputNumberInterface } from './MdInputNumber.vue.d.ts'
import { defineModel } from 'vue'

defineModel<MdInputNumberInterface>('input', { required: true })
</script>
