<template>
	<h1>Fields</h1>

	<UCard :ui="{ footer: 'sm:p-2 p-2 flex gap-1', body: 'sm:p-2 p-2' }">
		<template #header> AI Chat </template>

		<UChatMessages>
			<UChatMessage v-for="(message, index) in messages" :key="index" v-bind="message" />
		</UChatMessages>

		<UEmpty
			v-if="!messages.length"
			title="No messages found"
			description="It looks like you haven't added any messages. Create one to get started." />

		<template #footer>
			<UInput
				placeholder="Enter message here"
				v-model="prompt"
				:disabled="prompting"
				class="w-full" />
			<UButton
				:label="prompting ? 'Generating' : 'Ask Ai'"
				@click="executePrompt"
				:loading="prompting" />
		</template>
	</UCard>
</template>

<script setup lang="ts">
import { GoogleGenAI } from '@google/genai'

const ai = new GoogleGenAI({
	apiKey: 'AIzaSyDOVzVi2ErYA2x-1hJF92RkwS1Sid2lbyk',
})

const prompt = ref('')
const prompting = ref(false)

const messages = ref<any[]>([])

async function executePrompt() {
	prompting.value = true

	const message = JSON.stringify(prompt.value)

	messages.value.push({
		id: '6045235a-a435-46b8-989d-2df38ca2eb47',
		role: 'user',
		parts: [{ type: 'text', text: prompt.value }],
	})

	prompt.value = ''
	const response = await ai.models.generateContent({
		model: 'gemini-2.5-flash',
		contents: message,
	})

	prompting.value = false

	messages.value.push({
		id: '6045235a-a435-46b8-989d-2df38ca2eb47',
		role: 'assistant',
		parts: [{ type: 'text', text: response.text ?? '' }],
	})
}
</script>
