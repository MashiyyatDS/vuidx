import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import ui from '@nuxt/ui/vite'

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueDevTools(),
		ui({
			autoImport: {
				include: [
					/\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
					/\.vue$/,
					/\.vue\?vue/, // .vue
					/\.vue\.[tj]sx?\?vue/,
				],
				imports: ['vue', 'vue-router', 'vue-router'],
				dirs: [
					'./types',
					'./composables/**', // all nested modules
				],
				dts: './auto-imports.d.ts',
				vueTemplate: true,
				vueDirectives: true,
			},
			ui: {
				colors: {
					primary: 'green',
					secondary: 'purple',
					neutral: 'zinc',
				},
				theme: {
					colors: [
						'red',
						'orange',
						'amber',
						'yellow',
						'lime',
						'green',
						'emerald',
						'teal',
						'cyan',
						'sky',
						'blue',
						'indigo',
						'violet',
						'purple',
						'fuchsia',
						'pink',
						'rose',
					],
				},
			},
			colorMode: true,
		}),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	server: {
		port: 3000,
	},
})
