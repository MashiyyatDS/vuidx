import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
	title: 'Vuidx',
	description:
		'Lightweight Vue 3 UI primitives and composables for building markdown-style forms and modals made with Tailwindcss and Nuxt UI 4.',
	themeConfig: {
		// https://vitepress.dev/reference/default-theme-config
		nav: [
			{ text: 'Home', link: '/' },
			{ text: 'Examples', link: '/markdown-examples' },
		],
		sidebar: [
			{
				text: 'Examples',
				items: [
					{ text: 'Markdown Examples', link: '/markdown-examples' },
					{ text: 'Runtime API Examples', link: '/api-examples' },
				],
			},
			{
				text: 'Components',
				collapsed: false,
				items: [
					{
						text: 'MdInput',
						link: '/components/MdInput',
					},
					{ text: 'MdForm', link: '/components/MdForm' },
					{ text: 'VdxTable', link: '/components/VdxTable' },
				],
			},
			{
				text: 'Composables',
				collapsed: false,
				items: [
					{ text: 'useMdInput', link: '/composables/useMdInput' },
					{ text: 'useMdForm', link: '/composables/useMdForm' },
					{ text: 'useMdField', link: '/composables/useMdField' },
				],
			},
			{
				text: 'Validations',
			},
		],

		socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
	},
})
