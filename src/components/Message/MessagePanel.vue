<template>
	<div class="flex gap-1 absolute bottom-0 right-0 mx-5">
		<transition-group v-bind="transitionAttr">
			<MessagePanelItem
				:message-panel-item="messagePanelItem"
				v-for="messagePanelItem in activePanels"
				:key="`message-${messagePanelItem.user.id}`" />
		</transition-group>

		<div class="flex flex-col self-end mx-2 my-5 gap-2">
			<transition-group v-bind="transitionAttr">
				<div class="relative" v-for="widget in activeWidgets" :key="widget.user.id">
					<UButton
						icon="mdi-close"
						class="absolute -right-2.5 -top-2.5 rounded-full cursor-pointer z-1"
						variant="solid"
						color="error"
						@click="messageStore().closePanel(widget)"
						size="xs" />

					<UAvatar
						:src="widget.user.image"
						class="cursor-pointer hover:scale-100"
						@click="messageStore().openPanel(widget)"
						size="3xl" />
				</div>
			</transition-group>
		</div>
	</div>
</template>

<script setup lang="ts">
import messageStore from '@/stores/messageStore'

const activePanels = computed(() =>
	messageStore()
		.messages.filter((msgI) => !msgI.closed && !msgI.minimized)
		.sort((a, b) => b.updated_at - a.updated_at)
)

const activeWidgets = computed(() =>
	messageStore()
		.messages.filter((msgI) => msgI.minimized)
		.sort((a, b) => a.updated_at - b.updated_at)
)

const transitionAttr = reactive({
	enterActiveClass: 'transition transform ease-out duration-300',
	enterFromClass: 'opacity-0 -translate-x-2',
	enterToClass: 'opacity-100 translate-x-0',

	leaveActiveClass: 'transition transform ease-out duration-150',
	leaveToClass: 'opacity-0 -translate-x-2',
	leaveFromClass: 'opacity-100 translate-x-0',
})
</script>
