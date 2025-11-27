<template>
	<USelect v-model="chartType" :items="['bar', 'line']" />

	<UCard :ui="{ body: 'sm:p-0 p-0' }">
		<div id="chart" />
	</UCard>
</template>

<script setup lang="ts">
//https://retoolapi.dev/rcFSWW/data
import ApexCharts from 'apexcharts'

const chartType = ref('bar')
const options = reactive({
	chart: {
		type: chartType.value,
	},
	series: [
		{
			name: 'Sales',
			data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 150, 5],
		},
		{
			name: 'Branches',
			data: [30, 40, 35, 50, 49, 60, 70, 91, 125, 150, 5].reverse(),
		},
	],
	xaxis: {
		categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2025, 2026],
	},
})

const renderChart = () => {
	const chart = new ApexCharts(document.querySelector('#chart'), options)

	chart.render()
}

onActivated(() => renderChart())

watch(chartType, () => renderChart())
</script>
