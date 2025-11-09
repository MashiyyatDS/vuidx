import { CalendarDateTime } from '@internationalized/date'

export const generateCalendarDateTime = (value?: string) => {
	const date = value ? new Date(value) : new Date()

	return new CalendarDateTime(
		date.getFullYear(),
		date.getMonth() + 1,
		date.getDate(),
		date.getHours(),
		date.getMinutes(),
		date.getSeconds()
	)
}

export function convertStringCases(input: string) {
	const words = input
		.replace(/([a-z0-9])([A-Z])/g, '$1 $2') // camelCase & PascalCase
		.replace(/[_-]/g, ' ') // snake_case or kebab-case
		.replace(/\s+/g, ' ') // multiple spaces to single
		.trim()
		.toLowerCase()
		.split(' ')

	const capitalize = (w: string): string => w.charAt(0).toUpperCase() + w.slice(1)

	const snake = words.join('_')
	const camel = words[0] + words.slice(1).map(capitalize).join('')
	const pascal = words.map(capitalize).join('')
	const regular = words.map(capitalize).join(' ') // Title case

	return {
		snake,
		camel,
		pascal,
		regular,
	}
}

export function deepClone<T>(obj: T): T {
	if (obj === null || typeof obj !== 'object') return obj

	if (Array.isArray(obj)) {
		return obj.map(deepClone) as T
	}

	const clone: Record<string, any> = {}
	for (const key in obj) {
		const value = (obj as any)[key]
		clone[key] = typeof value === 'object' && value !== null ? deepClone(value) : value
	}

	return clone as T
}

export function generateUniqueId(): string {
	const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
	const timestamp = Date.now().toString(36) // compact time part
	let randomPart = ''

	for (let i = 0; i < 10; i++) {
		randomPart += chars.charAt(Math.floor(Math.random() * chars.length))
	}

	return randomPart.slice(0, 10 - timestamp.length) + timestamp
}
