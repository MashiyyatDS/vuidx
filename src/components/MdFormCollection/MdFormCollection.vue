<template>
	<UCard v-bind="collection?.attributes?.card">
		<template #header>
			<span>{{ collection?.title }}</span>
		</template>

		<UEmpty v-if="!collection?.items?.length" v-bind="collection?.attributes?.empty">
			<template #body>
				<UButton
					:label="`Add Item`"
					@click="addItem"
					v-bind="collection?.attributes?.addButton" />
			</template>
		</UEmpty>

		<div class="grid grid-cols-12 gap-1">
			<transition-group v-bind="transitionAttr">
				<div
					:class="['relative', collection?.grid ?? 'col-span-12']"
					v-for="(form, formKey) in collection?.items"
					:key="formKey">
					<MdForm :form="{ ...form, title: '' }" class="w-full" />

					<UButton
						icon="mdi-close"
						class="cursor-pointer top-[-5px] right-[-5px] absolute z-10"
						size="sm"
						v-bind="collection?.attributes?.removeButton"
						@click="collection?.items?.splice(formKey, 1)" />
				</div>
			</transition-group>
		</div>

		<div class="flex justify-center my-2" v-if="collection?.items?.length">
			<UButton
				v-bind="collection?.attributes?.addButton"
				@click="addItem"
				icon="material-symbols:add-2-rounded"
				class="self-center" />
		</div>
	</UCard>
</template>

<script setup lang="ts">
import type { MdFormCollection } from '../MdForm.vue.d.ts'
import MdForm from '../MdForm.vue'
import { deepClone } from '../../utils/index.ts'

const collection = defineModel<MdFormCollection>('collection', { required: true })

const addItem = () => {
	collection.value['items'] = collection.value['items'] ?? []

	collection.value.items.push(deepClone(collection.value.form))
}

const transitionAttr = reactive({
	appear: true,
	enterActiveClass: 'transition transform ease-out duration-300',
	enterFromClass: 'opacity-0 -translate-x-2',
	enterToClass: 'opacity-100 translate-x-0',
})
</script>
