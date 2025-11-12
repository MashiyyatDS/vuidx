# useMdInput

This page demonstrates some of the built-in markdown extensions provided by VitePress.

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
