<template>
	<UInputMenu
		v-model="inputMenu.value"
		:items="inputMenuItems"
		v-bind="inputMenu.attributes"
		@change="useMdInput(inputMenu).onChange()" />
</template>

<script setup lang="ts">
import type { AcceptableValue } from '@nuxt/ui/runtime/types/utils.js'
import type { MdInputMenuInterface } from './MdInputMenu.vue.d.ts'
import useMdInput from '../../composables/useMdInput.ts'
import { computed, defineExpose, defineModel, ref, onMounted } from 'vue'

const inputMenu = defineModel<MdInputMenuInterface>('input-menu', { required: true })

const items = ref<any[]>([])
const inputMenuItems = computed(() =>
	inputMenu.value.itemsProvider.type === 'default'
		? inputMenu.value.itemsProvider.items
		: items.value
)

onMounted(async () => {
	const itemsProvider = inputMenu.value.itemsProvider

	if (itemsProvider.type === 'default') {
		inputMenu.value.attributes['items'] = itemsProvider.items

		return
	}

	if ('url' in itemsProvider.api) {
		const responseJson = await fetch(itemsProvider.api.url)
		const response: AcceptableValue[] = await responseJson.json()

		items.value = response
	}

	if ('handler' in itemsProvider.api) {
		const { data } = await itemsProvider.api.handler()

		const hasDefined = 'definedKey' in itemsProvider && 'definedValue' in itemsProvider
		items.value = hasDefined
			? data.map((d) => ({
					[itemsProvider.definedKey]: d[itemsProvider.definedKey],
					[itemsProvider.definedValue]: d[itemsProvider.definedValue],
			  }))
			: data
	}
})

defineExpose({
	items: inputMenuItems.value,
})
</script>
