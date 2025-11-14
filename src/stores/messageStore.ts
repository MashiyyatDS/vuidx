import { defineStore } from 'pinia'

export interface MessagePanelItem {
	minimized: boolean
	closed: boolean
	user: {
		id: number
		name: string
		image: string
	}
	messages?: string[]
	updated_at: number
}

const messageStore = defineStore(
	'message',
	() => {
		const messages = ref<MessagePanelItem[]>([
			{
				closed: true,
				minimized: false,
				user: {
					id: 1,
					name: 'Mashiyyat Delos Santos',
					image: 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
				},
				messages: [],
				updated_at: Date.now(),
			},
			{
				closed: true,
				minimized: false,
				user: {
					id: 2,
					name: 'Merry Grace Managuit',
					image: 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
				},
				messages: [],
				updated_at: Date.now(),
			},
			{
				closed: true,
				minimized: false,
				user: {
					id: 3,
					name: 'Krishna Delos Santos',
					image: 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
				},
				messages: [],
				updated_at: Date.now(),
			},
			{
				closed: true,
				minimized: false,
				user: {
					id: 4,
					name: 'Romain Hamel',
					image: 'https://github.com/romhml.png',
				},
				messages: [],
				updated_at: Date.now(),
			},
			{
				closed: true,
				minimized: false,
				user: {
					id: 5,
					name: 'Sébastien Chopin',
					image: 'https://github.com/atinux.png',
				},
				messages: [],
				updated_at: Date.now(),
			},
			{
				closed: true,
				minimized: false,
				user: {
					id: 6,
					name: 'Hugo Richard',
					image: 'https://github.com/HugoRCD.png',
				},
				messages: [],
				updated_at: Date.now(),
			},
			{
				closed: true,
				minimized: false,
				user: {
					id: 7,
					name: 'Sandro Circi',
					image: 'https://github.com/sandros94.png',
				},
				messages: [],
				updated_at: Date.now(),
			},
			{
				closed: true,
				minimized: false,
				user: {
					id: 8,
					name: 'Daniel Roe',
					image: 'https://github.com/danielroe.png',
				},
				messages: [],
				updated_at: Date.now(),
			},
			{
				closed: true,
				minimized: false,
				user: {
					id: 9,
					name: 'Jakub Michálek',
					image: 'https://github.com/J-Michalek.png',
				},
				messages: [],
				updated_at: Date.now(),
			},
			{
				closed: true,
				minimized: false,
				user: {
					id: 10,
					name: 'Eugen Istoc',
					image: 'https://github.com/genu.png',
				},
				messages: [],
				updated_at: Date.now(),
			},
		])

		const openPanel = (message: MessagePanelItem) => {
			message.minimized = false
			message.closed = false
			message.updated_at = Date.now()
		}

		const closePanel = (message: MessagePanelItem) => {
			message.minimized = false
			message.closed = true
			message.updated_at = Date.now()
		}

		const minimizePanel = (message: MessagePanelItem) => {
			message.minimized = true
			message.closed = false
			message.updated_at = Date.now()
		}

		return {
			messages,
			openPanel,
			closePanel,
			minimizePanel,
		}
	},
	{
		persist: {
			key: 'messages',
			storage: sessionStorage,
		},
	}
)

export default messageStore
