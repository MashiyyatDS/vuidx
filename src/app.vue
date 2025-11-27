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
					<UButton
						label="Logout"
						block
						class="cursor-pointer"
						:variant="themeStore().variantMode" />
				</template>
			</UDashboardSidebar>

			<UDashboardPanel :ui="{ body: 'sm:p-0 p-0 flex' }">
				<template #header>
					<Navbar />
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
import { themeStore } from '@/stores/themeStore'

const drawer = ref(false)

watch(useRouter().currentRoute, () => (drawer.value = false))

onBeforeMount(() => themeStore().initThemes())
</script>
