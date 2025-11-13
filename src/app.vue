<template>
	<MdApp>
		<UDashboardGroup>
			<UDashboardSidebar
				class="w-[350px]"
				:ui="{ body: 'sm:p-2 p-2 border-y border-default' }">
				<template #header>
					<span>Vuidx</span>
				</template>

				<template #default>
					<NavigationMenu orientation="vertical" />
				</template>

				<template #footer>
					<UButton label="Footer" block />
				</template>
			</UDashboardSidebar>

			<UDashboardPanel :ui="{ body: 'sm:p-0 p-0 flex' }">
				<template #header>
					<UDashboardNavbar>
						<template #right>
							<UButton icon="mdi-chat" variant="link" />
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
	</MdApp>
</template>

<script setup lang="ts">
const drawer = ref(false)

watch(useRouter().currentRoute, () => (drawer.value = false))
</script>
