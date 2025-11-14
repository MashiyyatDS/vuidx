<template>
	<UCard
		:ui="{
			root: 'w-[400px] rounded-t rounded-b-none hidden md:block lg:block',
			header: 'sm:p-2 p-2 flex justify-between',
			body: 'sm:p-2 p-2 h-[400px] overflow-auto',
			footer: 'sm:p-2 p-2 flex gap-1 transition transform ease-out duration-300',
		}">
		<template #header>
			<div class="flex gap-3">
				<UAvatar :src="messagePanelItem.user.image" />

				<span class="self-center font-semibold text-sm">
					{{ messagePanelItem.user.name }}
				</span>
			</div>

			<div class="flex gap-1">
				<UButton icon="mdi-call" variant="link" class="cursor-pointer" />

				<UButton icon="mdi-video" variant="link" class="cursor-pointer" />

				<UButton
					icon="mdi-minimize"
					variant="link"
					class="cursor-pointer"
					@click="messageStore().minimizePanel(messagePanelItem)" />

				<UButton
					icon="mdi-close"
					variant="link"
					class="cursor-pointer"
					@click="messageStore().closePanel(messagePanelItem)" />
			</div>
		</template>

		<UChatMessages :messages="messages" :status="prompting ? 'submitted' : 'ready'" />

		<UEmpty
			v-if="!messages.length"
			:ui="{ root: 'border-none h-full' }"
			variant="soft"
			icon="mdi-message"
			title="No messages found"
			description="It looks like you haven't added any messages. Send one to get started." />

		<template #footer>
			<UButton icon="mdi-attachment" variant="link" class="cursor-pointer" />

			<UTextarea
				placeholder="Enter message here."
				@keyup.enter="sendMessage"
				v-model="message"
				class="w-full"
				autoresize
				:rows="1"
				:maxrows="1" />

			<UButton icon="mdi-send" variant="link" class="cursor-pointer" @click="sendMessage" />
		</template>
	</UCard>
</template>

<script setup lang="ts">
import messageStore, { type MessagePanelItem } from '@/stores/messageStore'
import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({
	apiKey: 'AIzaSyDOVzVi2ErYA2x-1hJF92RkwS1Sid2lbyk',
})

const messagePanelItem = defineModel<MessagePanelItem>('messagePanelItem', { required: true })

const messages = ref<any[]>([])
const message = ref('')

const prompting = ref(false)
const sendMessage = async () => {
	prompting.value = true

	messages.value.push({
		id: `${Date.now()}`,
		role: 'user',
		parts: [{ type: 'text', id: `${Date.now()}`, text: message.value }],
		ui: {
			container: 'p-0',
		},
	})
	const msgString = JSON.stringify(message.value)
	message.value = ''

	const response = await ai.models.generateContent({
		model: 'gemini-2.5-flash',
		contents: msgString,
	})

	prompting.value = false

	messages.value.push({
		id: response.responseId,
		role: 'assistant',
		parts: [{ type: 'text', text: response.text ?? '' }],
	})
}
</script>
