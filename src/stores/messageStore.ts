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
				closed: false,
				minimized: false,
				user: {
					id: 1,
					image: 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
					name: 'Mashiyyat Delos Santos',
				},
				messages: [],
				updated_at: Date.now(),
			},
			{
				closed: false,
				minimized: false,
				user: {
					id: 2,
					image: 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
					name: 'Merry Grace Managuit',
				},
				messages: [],
				updated_at: Date.now(),
			},
			{
				closed: false,
				minimized: false,
				user: {
					id: 3,
					image: 'https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png',
					name: 'Krishna Delos Santos',
				},
				messages: [],
				updated_at: Date.now(),
			},
		])

		return {
			messages,
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
