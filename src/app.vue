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
											v-for="(user, index) in users"
											:key="index"
											:ui="{
												body: 'p-0 sm:p-0',
												container: 'sm:p-3 p-3',
											}"
											variant="ghost"
											:target="user.target">
											<template #body>
												<UUser
													:name="user.name"
													:description="user.description"
													:avatar="user.avatar"
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
const drawer = ref(false)

watch(useRouter().currentRoute, () => (drawer.value = false))

const users = ref([
	{
		name: 'Benjamin Canac',
		description: 'benjamincanac',
		to: 'https://github.com/benjamincanac',
		target: '_blank',
		avatar: {
			alt: 'benjamincanac',
		},
	},
	{
		name: 'Romain Hamel',
		description: 'romhml',
		to: 'https://github.com/romhml',
		target: '_blank',
		avatar: {
			src: 'https://github.com/romhml.png',
			alt: 'romhml',
		},
	},
	{
		name: 'Sébastien Chopin',
		description: 'atinux',
		to: 'https://github.com/atinux',
		target: '_blank',
		avatar: {
			src: 'https://github.com/atinux.png',
			alt: 'atinux',
		},
	},
	{
		name: 'Hugo Richard',
		description: 'HugoRCD',
		to: 'https://github.com/HugoRCD',
		target: '_blank',
		avatar: {
			src: 'https://github.com/HugoRCD.png',
			alt: 'HugoRCD',
		},
	},
	{
		name: 'Sandro Circi',
		description: 'sandros94',
		to: 'https://github.com/sandros94',
		target: '_blank',
		avatar: {
			src: 'https://github.com/sandros94.png',
			alt: 'sandros94',
		},
	},
	{
		name: 'Daniel Roe',
		description: 'danielroe',
		to: 'https://github.com/danielroe',
		target: '_blank',
		avatar: {
			src: 'https://github.com/danielroe.png',
			alt: 'danielroe',
		},
	},
	{
		name: 'Jakub Michálek',
		description: 'J-Michalek',
		to: 'https://github.com/J-Michalek',
		target: '_blank',
		avatar: {
			src: 'https://github.com/J-Michalek.png',
			alt: 'J-Michalek',
		},
	},
	{
		name: 'Eugen Istoc',
		description: 'genu',
		to: 'https://github.com/genu',
		target: '_blank',
		avatar: {
			src: 'https://github.com/genu.png',
			alt: 'genu',
		},
	},
])

const messages = ref([
	{
		message: 'No message',
	},
])

provide('messages', messages)
</script>
