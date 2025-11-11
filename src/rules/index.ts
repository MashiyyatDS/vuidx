export default [
	{
		name: 'phContact',
		ruleFunction: (value: string) => {
			const sanitized = value.replace(/[\s-]/g, '')
			const regex = /^(?:\+63|0)9\d{9}$/
			return regex.test(sanitized)
		},
	},
]
