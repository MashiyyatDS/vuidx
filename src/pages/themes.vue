<template>
	<UColorModeButton />

	<div class="flex gap-1">
		<UButton
			v-for="(variant, key) in variants"
			:label="convertStringCases(`${variant}`).regular"
			:variant="variant"
			class="cursor-pointer"
			@click="themeStore().setVariantMode(variant)" />
	</div>

	<div class="grid grid-cols-12 gap-1">
		<div class="col-span-2" v-for="(colorMode, key) in colorModes" :key="key">
			<UButton
				@click="themeStore().setColorMode(key)"
				block
				:label="convertStringCases(key).regular"
				:class="`border cursor-pointer ${colorMode}`" />
		</div>
	</div>

	<div class="grid grid-cols-12 gap-1">
		<div class="col-span-4" v-for="(grayMode, key) in grayModes" :key="key">
			<UButton
				@click="themeStore().setGrayMode(grayMode)"
				block
				:variant="themeStore().variantMode"
				:label="grayMode"
				class="border cursor-pointer" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { convertStringCases } from '@/utils'

const grayModes = ref(['slate', 'zinc', 'neutral', 'stone'])
const variants = ref<VariantType[]>(['solid', 'outline', 'soft', 'subtle', 'link'])

const colorModes = reactive({
	red: 'bg-red-400',
	orange: 'bg-orange-400',
	amber: 'bg-amber-400',
	yellow: 'bg-yellow-400',
	lime: 'bg-lime-400',
	green: 'bg-green-400',
	emerald: 'bg-emerald-400',
	teal: 'bg-teal-400',
	cyan: 'bg-cyan-400',
	sky: 'bg-sky-400',
	blue: 'bg-blue-400',
	indigo: 'bg-indigo-400',
	violet: 'bg-violet-400',
	purple: 'bg-purple-400',
	fuchsia: 'bg-fuchsia-400',
	pink: 'bg-pink-400',
	rose: 'bg-rose-400',
})
</script>
