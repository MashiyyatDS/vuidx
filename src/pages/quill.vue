<template>
	<UModal
		v-model:open="modal"
		title="Sample Modal Stepper"
		:ui="{
			body: 'sm:p-2 p-2',
			footer: 'sm:p-2 p-2',
		}"
		:dismissible="false"
		description=" ">
		<template #body>
			<UStepper ref="stepper" :items="items" size="sm" />

			<small>
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Aperiam inventore eos sint.
				Provident perspiciatis delectus architecto alias, dolorum minima similique id saepe
				doloremque voluptatum natus, aut eum expedita repellat optio?
			</small>
		</template>

		<template #footer>
			<div class="flex justify-between w-full">
				<UButton :disabled="!stepper?.hasPrev" @click="stepper?.prev()" label="Prev" />

				<UButton
					v-if="stepper?.hasNext"
					class="self-end"
					label="Next"
					@click="stepper?.next()" />

				<UButton
					v-if="!stepper?.hasNext"
					class="self-end"
					label="Submit"
					trailing-icon="material-symbols:save"
					@click="modal = false" />
			</div>
		</template>
	</UModal>

	<UButton label="Open Dialog" @click="modal = true" class="cursor-pointer" />
</template>

<script setup lang="ts">
import type { StepperItem } from '@nuxt/ui'

const items: StepperItem[] = [
	{
		title: 'Form',
		icon: 'mdi-note',
	},
	{
		title: 'Uploader',
		icon: 'mdi-upload',
	},
	{
		title: 'Preview',
		icon: 'material-symbols:document-search',
	},
]

const stepper = useTemplateRef('stepper')
const modal = ref(false)
</script>
