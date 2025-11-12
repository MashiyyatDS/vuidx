import { defineConfig } from 'vitepress'
import path from 'path'

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
						collapsed: true,
						items: [
							{ text: 'Input', link: '/components/MdForm' },
							{ text: 'InputMenu', link: '/components/MdForm' },
							{ text: 'Select', link: '/components/VdxTable' },
							{ text: 'Textarea', link: '/components/VdxTable' },
							{ text: 'Checkbox', link: '/components/VdxTable' },
							{ text: 'CheckboxGroup', link: '/components/VdxTable' },
							{ text: 'RadioGroup', link: '/components/VdxTable' },
							{ text: 'Select', link: '/components/VdxTable' },
							{ text: 'SelectMenu', link: '/components/VdxTable' },
							{ text: 'DatePicker', link: '/components/VdxTable' },
							{ text: 'PinInput', link: '/components/VdxTable' },
						],
					},
					{
						text: 'MdForm',
						link: '/components/MdForm',
						collapsed: true,
						items: [
							{ text: 'Fields', link: '/components/MdForm' },
							{ text: 'Forms', link: '/components/MdForm' },
							{ text: 'Collections', link: '/components/MdForm' },
							{ text: 'Stepper', link: '/components/MdForm' },
						],
					},
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
	vite: {
		resolve: {
			alias: {
				'@': path.resolve(__dirname, '../../src'),
				'~': path.resolve(__dirname, '../../src'),
			},
		},
	},
})
