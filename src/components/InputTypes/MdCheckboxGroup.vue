<template>
	<UCheckboxGroup v-bind="checkboxGroup.attributes" :items="checkboxGroupItems" />
</template>

<script setup lang="ts">
import type { AcceptableValue } from '@nuxt/ui/runtime/types/utils.js'
import type { MdCheckboxGroupInterface } from './MdCheckboxGroup.vue.d.ts'
import { computed, defineModel, ref } from 'vue'

const checkboxGroup = defineModel<MdCheckboxGroupInterface>('checkboxGroup', { required: true })

const items = ref<any[]>([])
const checkboxGroupItems = computed(() =>
	checkboxGroup.value.itemsProvider.type === 'default'
		? checkboxGroup.value.itemsProvider.items
		: items.value
)

onMounted(async () => {
	const itemsProvider = checkboxGroup.value.itemsProvider

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
