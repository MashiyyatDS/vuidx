import { defineStore } from 'pinia'

const appConfig = useAppConfig()

export type VariantType = 'solid' | 'outline' | 'soft' | 'subtle' | 'ghost' | 'link' | undefined
export const themeStore = defineStore(
	'theme',
	() => {
		const colorMode = ref('blue')
		const grayMode = ref('slate')
		const variantMode = ref<VariantType>('solid')

		const setColorMode = (color: string = 'blue') => (colorMode.value = color)
		const setGrayMode = (gray: string = 'slate') => (grayMode.value = gray)
		const setVariantMode = (variant: VariantType = 'solid') => (variantMode.value = variant)

		function initThemes() {
			appConfig.ui.colors.neutral = grayMode.value

			appConfig.ui.colors.primary = colorMode.value
		}

		watch([colorMode, grayMode, variantMode], () => initThemes())

		return {
			colorMode,
			grayMode,
			setColorMode,
			setGrayMode,
			initThemes,
			variantMode,
			setVariantMode,
		}
	},
	{
		persist: true,
	}
)
