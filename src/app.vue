<template>
	<MdApp>
		<UDashboardGroup>
			<UDashboardSidebar
				collapsible
				mode="slideover"
				:min-size="300"
				:ui="{ body: 'sm:p-2 p-2', header: 'border-b border-default' }">
				<template #header>
					<span>Header</span>
				</template>
				<template #default>
					<UNavigationMenu :items="items" orientation="vertical" />
				</template>
			</UDashboardSidebar>

			<UDashboardPanel :ui="{ body: 'sm:p-0 p-0 overflow-auto flex' }">
				<template #header>
					<UDashboardNavbar title="Vuidx" />
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
const items = ref([
	{ label: 'Home', icon: 'mdi-home', to: '/' },
	{ label: 'Fields', icon: 'mdi-edit', to: '/fields' },
	{ label: 'Forms', icon: 'mdi-home', to: '/forms' },
	{ label: 'Collections', icon: 'mdi-note', to: '/collections' },
	{ label: 'Tables', icon: 'mdi-table', to: '/tables' },
	{ label: 'Modals', icon: 'mdi-window', to: '/modals' },
])
</script>
