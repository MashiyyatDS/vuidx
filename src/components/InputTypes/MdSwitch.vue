<template>
	<USwitch v-bind="input.attributes" />
</template>

<script setup lang="ts">
import type { MdSwitchInterface } from './MdSwitch.vue.d.ts'
import { defineModel } from 'vue'

defineModel<MdSwitchInterface>('input', { required: true })
</script>
