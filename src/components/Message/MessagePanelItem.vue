<template>
	<UCard
		:ui="{
			root: 'w-[400px] rounded-t rounded-b-none hidden md:block lg:block',
			header: 'sm:p-2 p-2 flex justify-between',
			body: 'sm:p-2 p-2 h-[400px] overflow-auto',
			footer: 'sm:p-2 p-2 flex gap-1',
		}">
		<template #header>
			<div class="flex gap-3">
				<UAvatar :src="messagePanelItem.user.image" />

				<span class="self-center font-semibold text-sm">
					{{ messagePanelItem.user.name }}</span
				>
			</div>

			<div class="flex gap-1">
				<UButton icon="mdi-call" variant="link" class="cursor-pointer" />

				<UButton icon="mdi-video" variant="link" class="cursor-pointer" />

				<UButton
					icon="mdi-minimize"
					variant="link"
					class="cursor-pointer"
					@click="minimizePanel()" />

				<UButton
					icon="mdi-close"
					variant="link"
					class="cursor-pointer"
					@click="messagePanelItem.closed = true" />
			</div>
		</template>

		<UChatMessages :messages="messages" />

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
				class="w-full"
				autoresize
				:rows="1"
				:maxrows="1" />

			<UButton icon="mdi-send" variant="link" class="cursor-pointer" />
		</template>
	</UCard>
</template>

<script setup lang="ts">
interface MessagePanelItem {
	minimized: boolean
	closed: boolean
	user: {
		name: string
		image: string
	}
	messages?: string[]
	updated_at: number
}

const messagePanelItem = defineModel<MessagePanelItem>('messagePanelItem', { required: true })

const minimizePanel = () => {
	messagePanelItem.value.updated_at = Date.now()
	messagePanelItem.value.minimized = true
}

const messages = ref([])
</script>
