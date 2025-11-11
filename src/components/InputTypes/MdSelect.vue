<template>
	<USelect
		v-model="select.value"
		v-bind="select.attributes"
		:items="selectItems"
		@change="useMdInput(select).onChange()">
		<template #item-trailing="{ index }">
			<div ref="target" v-if="selectItems.length === index + 1" />
		</template>
	</USelect>
</template>

<script setup lang="ts">
import { computed, defineExpose, defineModel, ref } from 'vue'
import type { MdSelectInterface } from './MdSelect.vue.d.ts'
import useMdInput from '../../composables/useMdInput'
import { useIntersectionObserver } from '@vueuse/core'
import { useTemplateRef, onMounted } from 'vue'

const target = useTemplateRef('target')
const select = defineModel<MdSelectInterface>('select', { required: true })

let intersectInterval: any = null
useIntersectionObserver(target, ([entry]) => {
	if (!entry?.isIntersecting || select.value.itemsProvider.type !== 'api') return

	clearTimeout(intersectInterval)

	intersectInterval = setTimeout(() => console.log('Load More Items'), 500)
})

const items = ref<any[]>([])
const selectItems = computed(() =>
	select.value.itemsProvider.type === 'default' ? select.value.itemsProvider.items : items.value
)

onMounted(async () => {
	const itemsProvider = select.value.itemsProvider
	if (itemsProvider.type === 'default') {
		select.value.attributes['items'] = itemsProvider.items

		return
	}

	if ('url' in itemsProvider.api) {
		const responseJson = await fetch(itemsProvider.api.url)
		const response: any[] = await responseJson.json()

		items.value = response
	}

	if ('handler' in itemsProvider.api) {
		const { data } = await itemsProvider.api.handler()

		items.value = data
	}
})

defineExpose({
	items: selectItems.value,
})
</script>
