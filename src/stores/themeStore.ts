import { defineStore } from 'pinia'

const appConfig = useAppConfig()
export const themeStore = defineStore(
	'theme',
	() => {
		const colorMode = ref('blue')

		const grayMode = ref('slate')

		const setColorMode = (color: string = 'blue') => (colorMode.value = color)
		const setGrayMode = (gray: string = 'slate') => (grayMode.value = gray)

		function initThemes() {
			appConfig.ui.colors.neutral = grayMode.value

			appConfig.ui.colors.primary = colorMode.value
		}

		watch([colorMode, grayMode], () => initThemes())

		return { colorMode, grayMode, setColorMode, setGrayMode, initThemes }
	},
	{
		persist: true,
	}
)
