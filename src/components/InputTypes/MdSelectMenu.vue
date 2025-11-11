<template>
	<USelectMenu
		v-model="selectMenu.value"
		v-bind="selectMenu.attributes"
		@change="useMdInput(selectMenu).onChange()"
		@focus="onFocus"
		@update:search-term="onInput">
		<template #content-bottom>
			<div
				ref="bottomIntrRef"
				id="bottomIntrRef"
				class="w-full border-t border-default flex justify-center p-1">
				<span>Bottom</span>
			</div>
		</template>
	</USelectMenu>
</template>

<script setup lang="ts">
import type { AcceptableValue } from '@nuxt/ui/runtime/types/utils.js'
import type { MdSelectMenuInterface } from './MdSelectMenu.vue.d.ts'
import useMdInput from '../../composables/useMdInput'
import { computed, defineExpose, defineModel, ref, onMounted } from 'vue'

const selectMenu = defineModel<MdSelectMenuInterface>('selectMenu', { required: true })

const items = ref<AcceptableValue[]>([])
const selectMenuItems = computed(() =>
	selectMenu.value.itemsProvider.type === 'default'
		? selectMenu.value.itemsProvider.items
		: items.value
)

onMounted(async () => {
	const itemsProvider = selectMenu.value.itemsProvider

	if (itemsProvider.type === 'default') {
		selectMenu.value.attributes['items'] = itemsProvider.items

		return
	}

	if ('url' in itemsProvider.api) {
		const responseJson = await fetch(itemsProvider.api.url)
		const response: AcceptableValue[] = await responseJson.json()

		items.value = response
	}

	if ('handler' in itemsProvider.api) {
		const { data } = await itemsProvider.api.handler()

		selectMenu.value.attributes['items'] = data.map((item) => ({
			[itemsProvider.definedKey]: item[itemsProvider.definedKey],
			[itemsProvider.definedValue]: item[itemsProvider.definedValue],
		}))
	}
})

const onInput = (searchTerm: string) => {
	console.log(searchTerm)
}

const onFocus = () => {}

defineExpose({
	selectMenuItems,
})
</script>
