# useMdInput

This composable provides a unified interface for working with custom input components (MdInput, MdSelect, MdSelectMenu, MdInputMenu, etc.) in a Vue 3 application. It handles getting, setting, resetting, and validating input values — including special handling for date pickers and select menus — while integrating with the [robust-validator](https://validator.axe-api.com/) library for rule-based validation.

## Get

```typescript
const inputField: MdInputInterface = reactive({
	type: 'default',
	grid: 'col-span-6',
	attributes: {
		placeholder: 'User First name',
		class: 'w-full',
	},
	formField: {
		label: 'First Name',
	},
	nullInUndefined: true,
	validations: {
		rules: 'required',
		messages: {
			required: 'First name field is required',
		},
	},
})

function getInput() {
	const data = useMdInput(inputField).get()

	console.log(data)
}
```

## Set

```typescript
const inputField: MdInputInterface = reactive({
	type: 'default',
	grid: 'col-span-6',
	attributes: {
		placeholder: 'User First name',
		class: 'w-full',
	},
	formField: {
		label: 'First Name',
	},
	nullInUndefined: true,
	validations: {
		rules: 'required',
		messages: {
			required: 'First name field is required',
		},
	},
})

function setInput() {
	useMdInput(inputField).set('John Doe')
}
```

## Validate

```typescript{12-17 ++}
const inputField: MdInputInterface = reactive({
	type: 'default',
	grid: 'col-span-6',
	attributes: {
		placeholder: 'User First name',
		class: 'w-full',
	},
	formField: {
		label: 'First Name',
	},
	nullInUndefined: true,
	validations: {
		rules: 'required',
		messages: {
			required: 'First name field is required',
		},
	},
})

async function validateInput() {
	const validated = await useMdInput(inputField).validate('first_name')

	console.log(validated)
}
```

## Reset

## Set Errors
