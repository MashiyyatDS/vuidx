<template>
	<UNavigationMenu :items="items" />
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[][]>([
	[
		{ label: 'Home', icon: 'mdi-home', to: '/' },
		{ label: 'Timekeeper', icon: 'mdi-clock', to: '/' },
	],
	[
		{
			label: 'Branches',
			type: 'label',
		},
		{
			label: 'Manage Branch',
			description: 'Fully styled and customizable components for Nuxt.',
			icon: 'material-symbols:handshake-rounded',
		},
		{
			label: 'Branch Groups',
			description: 'Fully styled and customizable components for Nuxt.',
			icon: 'material-symbols:handshake-rounded',
		},
	],
	[
		{
			label: 'Inventory',
			type: 'label',
		},
		{
			label: 'Manage Inventory',
			icon: 'material-symbols:inventory-2',
			defaultOpen: true,
			children: [
				{
					label: 'Stock Management',
					description: 'Fully styled and customizable components for Nuxt.',
					icon: 'material-symbols:inventory-2',
				},
				{
					label: 'Inventory Transfer',
					description: 'Fully styled and customizable components for Nuxt.',
					icon: 'mdi:truck-delivery',
				},
				{
					label: 'Inventory Adjustment',
					description: 'Fully styled and customizable components for Nuxt.',
					icon: 'i-lucide-house',
				},
				{
					label: 'Pull out requests',
					description: 'Learn how to install and configure Nuxt UI in your application.',
					icon: 'hugeicons:delivery-return-02',
				},
				{
					label: 'Forecasting',
					description: 'Learn how to install and configure Nuxt UI in your application.',
					icon: 'i-lucide-cloud-download',
				},
			],
		},
		{
			label: 'Products',
			icon: 'material-symbols:fastfood-sharp',
			children: [
				{
					label: 'Manage Products',
					description: 'Fully styled and customizable components for Nuxt.',
					icon: 'i-lucide-house',
				},
				{
					label: 'Product Bundles',
					description: 'Learn how to install and configure Nuxt UI in your application.',
					icon: 'i-lucide-cloud-download',
				},
			],
		},
		{
			label: 'Suppliers',
			description: 'Fully styled and customizable components for Nuxt.',
			icon: 'material-symbols:handshake-rounded',
		},
		{
			label: 'Configurations',
			description: 'Learn how to install and configure Nuxt UI in your application.',
			icon: 'mdi-cog',
			children: [
				{
					label: 'Units',
					description: 'Learn how to install and configure Nuxt UI in your application.',
					icon: 'i-lucide-cloud-download',
				},
				{
					label: 'Product Status',
					description: 'Learn how to install and configure Nuxt UI in your application.',
					icon: 'i-lucide-cloud-download',
				},
				{
					label: 'Product Categories',
					description: 'Fully styled and customizable components for Nuxt.',
					icon: 'i-lucide-house',
				},
			],
		},
	],
	[
		{
			label: 'Sales',
			type: 'label',
		},
		{
			label: 'Reports and Analytics',
			description: 'Fully styled and customizable components for Nuxt.',
			icon: 'material-symbols:bar-chart-4-bars',
		},
		{
			label: 'Point of Sale',
			description: 'Fully styled and customizable components for Nuxt.',
			icon: 'material-symbols:shopping-cart-sharp',
		},
		{
			label: 'Orders',
			description: 'Fully styled and customizable components for Nuxt.',
			icon: 'material-symbols:shopping-cart-sharp',
		},
	],
	[
		{
			label: 'Accounting',
			type: 'label',
		},
		{
			label: 'Receivables',
			description: 'Fully styled and customizable components for Nuxt.',
			icon: 'i-lucide-house',
		},
		{
			label: 'Purchases',
			description: 'Fully styled and customizable components for Nuxt.',
			icon: 'bxs:purchase-tag',
		},
		{
			label: 'Payment Methods',
			description: 'Fully styled and customizable components for Nuxt.',
			icon: 'material-symbols:credit-card',
		},
		{
			label: 'Configurations',
			description: 'Learn how to install and configure Nuxt UI in your application.',
			icon: 'mdi-cog',
			children: [
				{
					label: 'Receivables Status',
					description: 'Learn how to install and configure Nuxt UI in your application.',
					icon: 'i-lucide-cloud-download',
				},
				{
					label: 'Purchase Status',
					description: 'Fully styled and customizable components for Nuxt.',
					icon: 'i-lucide-house',
				},
			],
		},
	],
	[
		{
			label: 'Human Resource',
			type: 'label',
		},
		{
			label: 'Manage Users',
			description: 'Fully styled and customizable components for Nuxt.',
			icon: 'mdi-users',
			children: [],
		},
		{
			label: 'Authorization and Access',
			description: 'Fully styled and customizable components for Nuxt.',
			icon: 'material-symbols:manage-accounts',
			children: [
				{
					label: 'Roles',
					description: 'Fully styled and customizable components for Nuxt.',
					icon: 'material-symbols:inbox-text-person-sharp',
				},
				{
					label: 'Permissions',
					description: 'Fully styled and customizable components for Nuxt.',
					icon: 'material-symbols:inbox-text-person-sharp',
				},
			],
		},
		{
			label: 'Timekeeping',
			description: 'Fully styled and customizable components for Nuxt.',
			icon: 'mdi-clock',
			children: [
				{
					label: 'Time Logs',
					description: 'Fully styled and customizable components for Nuxt.',
					icon: 'mdi-settings',
				},
				{
					label: 'Schedules',
					description: 'Fully styled and customizable components for Nuxt.',
					icon: 'material-symbols:calendar-month-outline-rounded',
				},
				{
					label: 'Overtime',
					description: 'Fully styled and customizable components for Nuxt.',
					icon: 'material-symbols:clock-arrow-up',
				},
				{
					label: 'Undertime',
					description: 'Fully styled and customizable components for Nuxt.',
					icon: 'material-symbols:clock-arrow-down-rounded',
				},
			],
		},
		{
			label: 'Leaves',
			description: 'Fully styled and customizable components for Nuxt.',
			icon: 'majesticons:door-exit',
		},
		{
			label: 'Payroll',
			description: 'Fully styled and customizable components for Nuxt.',
			icon: 'mdi:bank-transfer',
		},
		{
			label: 'Back Pay',
			description: 'Fully styled and customizable components for Nuxt.',
			icon: 'mdi:bank-transfer',
		},
	],
	[
		{
			label: 'Settings',
			type: 'label',
		},
		{
			label: 'Labels',
			description: 'Fully styled and customizable components for Nuxt.',
			icon: 'material-symbols:bookmark',
		},
		{
			label: 'Themes',
			description: 'Fully styled and customizable components for Nuxt.',
			icon: 'streamline-plump:paint-palette-solid',
		},
		{
			label: 'Account settings',
			description: 'Fully styled and customizable components for Nuxt.',
			icon: 'material-symbols:manage-accounts',
			children: [
				{
					label: 'Personal Information',
					description: 'Fully styled and customizable components for Nuxt.',
					icon: 'material-symbols:inbox-text-person-sharp',
				},
				{
					label: 'Email and Password',
					description: 'Fully styled and customizable components for Nuxt.',
					icon: 'material-symbols:inbox-text-person-sharp',
				},
			],
		},
	],
	[
		{
			label: 'Help',
			icon: 'i-lucide-circle-help',
			disabled: true,
		},
	],
])
</script>
