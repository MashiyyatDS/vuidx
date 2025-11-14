<template>
	<MdApp>
		<UDashboardGroup>
			<UDashboardSidebar
				class="w-[350px]"
				:ui="{ body: 'sm:p-2 p-2 border-y border-default', header: 'h-12' }">
				<template #header>
					<span>Vuidx</span>
				</template>

				<template #default>
					<NavigationMenu orientation="vertical" />
				</template>

				<template #footer>
					<UButton label="Logout" block class="cursor-pointer" />
				</template>
			</UDashboardSidebar>

			<UDashboardPanel :ui="{ body: 'sm:p-0 p-0 flex' }">
				<template #header>
					<UDashboardNavbar :ui="{ root: 'h-12' }">
						<template #right>
							<UPopover :ui="{ content: 'w-110' }" arrow>
								<UChip color="error" :ui="{ base: 'text-md' }" inset>
									<UButton
										icon="mdi-chat"
										variant="link"
										class="cursor-pointer" />
								</UChip>

								<template #content>
									<UPageList>
										<div
											class="flex flex-col justify-center p-3 border-b border-default">
											<span class="text-md font-semibold">Messages</span>
										</div>

										<UPageCard
											@click="messageStore().openPanel(message)"
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
						</template>
					</UDashboardNavbar>
				</template>

				<template #body>
					<div class="h-full p-3">
						<router-view />
					</div>
				</template>
			</UDashboardPanel>
		</UDashboardGroup>

		<MessagePanel />
	</MdApp>
</template>

<script setup lang="ts">
import messageStore from './stores/messageStore'

const drawer = ref(false)

watch(useRouter().currentRoute, () => (drawer.value = false))

const { messages } = messageStore()
</script>
