<template>
	<UNavigationMenu :items="modules" />
</template>

<script setup lang="ts">
import modulesStore from '@/stores/modulesStore'

const { modules } = modulesStore()
</script>
