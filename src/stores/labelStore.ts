const labelStore = defineStore('label', () => {
	const labels = reactive<Record<string, any>>({
		'Manage Branches': 'MANAGE BRANCHES',
	})

	const setLabels = (label: string) => {
		labels[label] = label
	}

	return {
		labels,
		setLabels,
	}
})

export default labelStore
