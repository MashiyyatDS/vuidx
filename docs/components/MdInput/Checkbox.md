<script setup lang="ts">
import {ref ,reactive} from 'vue'

const checkboxProps = ref('checkboxProps')

const checkbox = reactive({
	type: 'checkbox', // [!code ++]
	attributes: {
		class: 'w-full',
		icon: 'mdi-edit',
	},
	formField: {
		label: 'Sample Checkbox',
		description: 'This is a sample description',
	},
	grid: 'col-span-12',
	validations: {
		rules: 'required',
		messages: {
			required: 'This checkbox field is required',
		},
	},
})
</script>

# Checkbox

## Basic Usage

```vue{7}
<template>
	<MdInput :input="checkbox" />
</template>

<script setup lang="ts">
const checkbox = reactive({
	type: 'checkbox', // [!code ++]
	attributes: {
		class: 'w-full',
		icon: 'mdi-edit',
	},
	formField: {
		label: 'Sample Checkbox',
		description: 'This is a sample description',
	},
	grid: 'col-span-12',
	validations: {
		rules: 'required',
		messages: {
			required: 'This checkbox field is required',
		},
	},
})
</script>

```

## Props

| Prop             |      Required      |                                  Type                                  |                    Description                    |
| ---------------- | :----------------: | :--------------------------------------------------------------------: | :-----------------------------------------------: |
| type             | :white_check_mark: |                               `checkbox`                               |              MdInput component type               |
| attributes       | :white_check_mark: |  [CheckboxProps](https://ui.nuxt.com/docs/components/checkbox#props)   | Checkbox component props that will be bind inside |
| formField        | :white_check_mark: | [FormFieldProps](https://ui.nuxt.com/docs/components/form-field#props) |        Form input wrapper for validations         |
| grid             |        :x:         |                                `string`                                |           Tailwindcss column grid size            |
| hidden           |        :x:         |                               `boolean`                                |    Hide the component from template rendering     |
| nullInUndefined  |        :x:         |                               `boolean`                                |       Set input value to null if undefined        |
| validateOnChange |        :x:         |                               `boolean`                                |       Validate input on model value update        |
| validations      |        :x:         |              [Validations](/validations.html#basic-usage)              |     Input validation rules and error messages     |
