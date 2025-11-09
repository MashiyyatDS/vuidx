<template>
	<URadioGroup v-bind="radioGroup.attributes" :items="radioGroupItems" />
</template>

<script setup lang="ts">
import type { AcceptableValue } from '@nuxt/ui/runtime/types/utils.js'
import type { MdRadioGroupInterface } from './MdRadioGroup.vue.d.ts'
import { computed, defineModel, ref } from 'vue'

const radioGroup = defineModel<MdRadioGroupInterface>('radioGroup', { required: true })

const items = ref<any[]>([])
const radioGroupItems = computed(() =>
	radioGroup.value.itemsProvider.type === 'default'
		? radioGroup.value.itemsProvider.items
		: items.value
)

onMounted(async () => {
	const itemsProvider = radioGroup.value.itemsProvider

	if (itemsProvider.type !== 'api') return

	if ('url' in itemsProvider.api) {
		const responseJson = await fetch(itemsProvider.api.url)
		const response: AcceptableValue[] = await responseJson.json()

		items.value = response
	}

	if ('handler' in itemsProvider.api) {
		const { data } = await itemsProvider.api.handler()

		items.value = data
	}
})
</script>
