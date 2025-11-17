<template>
	<UColorModeButton />

	<div class="grid grid-cols-12 gap-1">
		<div class="col-span-2" v-for="(colorMode, key) in colorModes" :key="key">
			<UButton
				@click="themeStore().setColorMode(colorMode)"
				block
				:label="colorMode"
				:class="`border cursor-pointer ${colorMode}`" />
		</div>
	</div>

	<div class="grid grid-cols-12 gap-1">
		<div class="col-span-4" v-for="(grayMode, key) in grayModes" :key="key">
			<UButton
				@click="themeStore().setGrayMode(grayMode)"
				block
				:label="grayMode"
				class="border cursor-pointer"
				color="primary" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { themeStore } from '@/stores/themeStore'

const grayModes = ref(['slate', 'zinc', 'neutral', 'stone'])

const colorModes = ref([
	'bg-red-400',
	'bg-orange-400',
	'bg-amber-400',
	'bg-yellow-400',
	'bg-lime-400',
	'bg-green-400',
	'bg-emerald-400',
	'bg-teal-400',
	'bg-cyan-400',
	'bg-sky-400',
	'bg-blue-400',
	'bg-indigo-400',
	'bg-violet-400',
	'bg-purple-400',
	'bg-fuchsia-400',
	'bg-pink-400',
	'bg-rose-400',
])
</script>
