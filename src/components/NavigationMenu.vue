<template>
	<UNavigationMenu :items="modules">
		<template #item-label="{ item }">
			{{ labelStore().labels[`${item.label}`] ?? item.label }}
		</template>
	</UNavigationMenu>
</template>

<script setup lang="ts">
import modulesStore from '@/stores/modulesStore'

const { modules } = modulesStore()
</script>
