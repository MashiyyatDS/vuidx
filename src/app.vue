<template>
	<MdApp>
		<div class="flex justify-center">
			<UNavigationMenu :items="items" variant="link" />
		</div>

		<router-view />
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
