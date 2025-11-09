<template>
	<UBreadcrumb :items="items" />
</template>

<script setup lang="ts">
import { convertStringCases } from '../utils'
import { computed } from 'vue'

const items = computed(() => {
	const route = useRoute()
	const segments = route.fullPath.split('/').filter(Boolean)
	let accumulatedPath = ''
	return segments.map((segment) => {
		accumulatedPath += `/${segment}`
		return {
			label: convertStringCases(segment).regular,
			to: accumulatedPath,
		}
	})
})
</script>
