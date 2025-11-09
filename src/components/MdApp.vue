<template>
	<UApp>
		<div id="wrapper-working">
			<slot />
		</div>
	</UApp>
</template>

<script setup lang="ts">
import { setLocales, en, register } from 'robust-validator'

const validatePHContactNumber = (value: string) => {
	const sanitized = value.replace(/[\s-]/g, '')
	const regex = /^(?:\+63|0)9\d{9}$/
	return regex.test(sanitized)
}

register('phContact', validatePHContactNumber, { en: 'Please provide a valid contact number' })

setLocales(en)
</script>
