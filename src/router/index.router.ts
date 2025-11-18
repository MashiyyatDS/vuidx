import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
	{
		path: '/',
		component: () => import('@/pages/index.vue'),
		name: 'index-page',
	},
	{
		path: '/forms',
		component: () => import('@/pages/forms.vue'),
		name: 'forms-page',
	},
	{
		path: '/fields',
		component: () => import('@/pages/fields.vue'),
		name: 'fields-page',
	},
	{
		path: '/collections',
		component: () => import('@/pages/collections.vue'),
		name: 'collections-page',
	},
	{
		path: '/tables',
		component: () => import('@/pages/tables.vue'),
		name: 'tables-page',
	},
	{
		path: '/modals',
		component: () => import('@/pages/modals.vue'),
		name: 'modals-page',
	},
	{
		path: '/login',
		component: () => import('@/pages/login.vue'),
		name: 'login-page',
	},
	{
		path: '/users',
		component: () => import('@/pages/users.vue'),
		name: 'users-page',
	},
	{
		path: '/themes',
		component: () => import('@/pages/themes.vue'),
		name: 'themes-page',
	},
	{
		path: '/manage-branches',
		component: () => import('@/pages/manage-branches.vue'),
		name: 'manage-branches-page',
	},
	{
		path: '/roles',
		component: () => import('@/pages/roles.vue'),
		name: 'roles-page',
	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
})

export default router
