<template>
  <UPinInput v-bind="pinInput.attributes" @update:model-value="useMdInput(pinInput).onChange()" />
</template>

<script setup lang="ts">
import useMdInput from '../../composables/useMdInput.ts'
import type { MdPinInputInterface } from './MdPinInput.vue.d.ts'
import { defineModel } from 'vue'

defineModel<MdPinInputInterface>('pin-input', { required: true })
</script>
