<template>
  <UCard v-bind="form.attributes">
    <template #header v-if="$slots['header'] || form.title" v-bind="{ title }">
      <span v-if="form.title">{{ form.title }}</span>

      <slot name="header" />
    </template>

    <template #default>
      <template v-if="form?.fields">
        <div class="grid grid-cols-12 gap-1">
          <MdInput v-for="(input, key) in form?.fields" :key="key" :input="input" />
        </div>
      </template>

      <template v-if="form.forms">
        <MdForm v-for="(fForm, key) in form?.forms" :key="key" :form="fForm" />
      </template>

      <template v-if="form?.collections">
        <MdFormCollection
          v-for="(collection, collectionKey) in form?.collections"
          :key="`collection-${collectionKey}`"
          :collection="collection"
        />
      </template>
    </template>

    <template #footer v-if="$slots['actions']">
      <slot name="actions" />
    </template>
  </UCard>
</template>

<script setup lang="ts">
import type { MdFormInterface, MdFormSlots, MdFormProps } from './MdForm.vue.d.ts'
import MdFormCollection from './MdFormCollection/MdFormCollection.vue'
import { defineModel, defineProps, defineSlots } from 'vue'
import MdInput from './MdInput.vue'

defineSlots<MdFormSlots>()

defineProps<MdFormProps>()

const form = defineModel<MdFormInterface>('form', { required: true })

export type { MdFormInterface, MdFormProps, MdFormSlots }
</script>
