<template>
	<UCheckbox v-bind="checkbox.attributes" />
</template>

<script setup lang="ts">
import type { MdCheckboxInterface } from './MdCheckbox.vue.d.ts'
import { defineModel } from 'vue'

defineModel<MdCheckboxInterface>('checkbox', { required: true })
</script>
