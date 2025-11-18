import { useAxios } from '@vueuse/integrations/useAxios'

export default function () {
	const paginate = useAxios('https://retoolapi.dev/vgkfAF/data', {}, { immediate: true })

	return {
		paginate,
	}
}
