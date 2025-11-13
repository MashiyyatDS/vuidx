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
						link: '/components/MdInput/index.md',
						collapsed: true,
						items: [
							{ text: 'Checkbox', link: '/components/MdInput/Checkbox.md' },
							{ text: 'CheckboxGroup', link: '/components/MdInput/CheckboxGroup.md' },
							{ text: 'DatePicker', link: '/components/MdInput/DatePicker.md' },
							{ text: 'Input', link: '/components/MdInput/Input.md' },
							{ text: 'InputMenu', link: '/components/MdInput/InputMenu.md' },
							{ text: 'PinInput', link: '/components/MdInput/PinInput.md' },
							{ text: 'RadioGroup', link: '/components/MdInput/RadioGroup.md' },
							{ text: 'Select', link: '/components/MdInput/Select.md' },
							{ text: 'SelectMenu', link: '/components/MdInput/SelectMenu.md' },
							{ text: 'Textarea', link: '/components/MdInput/Textarea.md' },
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
				link: '/validations',
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
		server: {
			port: 3001,
		},
	},
})
