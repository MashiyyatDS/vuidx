<template>
	<UDashboardNavbar :ui="{ root: 'h-12' }">
		<template #right>
			<UPopover :ui="{ content: 'w-110' }" arrow v-model:open="popover">
				<UChip color="error" :ui="{ base: 'text-md' }" inset>
					<UButton icon="mdi-chat" variant="link" class="cursor-pointer" />
				</UChip>

				<template #content>
					<UPageList>
						<div class="flex flex-col justify-center p-3 border-b border-default">
							<span class="text-md font-semibold">Messages</span>
						</div>

						<UPageCard
							@click=";[messageStore().openPanel(message), (popover = false)]"
							v-for="(message, index) in messages"
							class="cursor-pointer"
							:key="index"
							:ui="{
								body: 'p-0 sm:p-0',
								container: 'sm:p-3 p-3',
							}"
							variant="ghost">
							<template #body>
								<UUser
									:name="message.user.name"
									:avatar="{ src: message.user.image }"
									size="xl"
									class="relative" />
							</template>
						</UPageCard>

						<UButton label="Load more" block class="m-2" />
					</UPageList>
				</template>
			</UPopover>

			<UButton icon="mdi-notifications" variant="link" />

			<UDropdownMenu :items="dropdownItems" :ui="{ content: 'w-[300px]' }">
				<UAvatar src="" alt="Mashiyyat" class="cursor-pointer" />
			</UDropdownMenu>
		</template>
	</UDashboardNavbar>
</template>

<script setup lang="ts">
import messageStore from '@/stores/messageStore'

const { messages } = messageStore()

const dropdownItems = ref([
	[
		{
			label: 'Benjamin',
			avatar: {
				src: 'https://github.com/benjamincanac.png',
			},
			type: 'label',
		},
	],
	[
		{
			label: 'Profile',
			icon: 'i-lucide-user',
		},
		{
			label: 'Billing',
			icon: 'i-lucide-credit-card',
		},
		{
			label: 'Settings',
			icon: 'i-lucide-cog',
			kbds: [','],
		},
		{
			label: 'Keyboard shortcuts',
			icon: 'i-lucide-monitor',
		},
	],
	[
		{
			label: 'Support',
			icon: 'i-lucide-life-buoy',
		},
		{
			label: 'API',
			icon: 'i-lucide-cloud',
			disabled: true,
		},
	],
	[
		{
			label: 'Logout',
			icon: 'i-lucide-log-out',
			kbds: ['shift', 'meta', 'q'],
		},
	],
])

const popover = ref(false)
</script>
