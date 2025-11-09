<template>
	<UPopover>
		<UButton v-bind="datepicker['buttonAttributes']" :disabled="!!datepicker.attributes['disabled']">
			{{ modelValue ? df.format(modelValue.toDate(getLocalTimeZone())) : 'Select a date' }}
		</UButton>

		<template #content>
			<UCalendar v-model="modelValue" class="p-2" v-bind="datepicker.attributes" />
		</template>
	</UPopover>
</template>

<script setup lang="ts">
import { DateFormatter, getLocalTimeZone, CalendarDateTime } from '@internationalized/date'
import type { MdDatepickerInterface } from './MdDatepicker.vue.d.ts'
import { generateCalendarDateTime } from '../../utils'
import { defineModel, shallowRef, watch } from 'vue'

const datepicker = defineModel<MdDatepickerInterface>('datepicker', { required: true })

const df = new DateFormatter('en-US', {
	dateStyle: 'full',
})

const modelValue = shallowRef<CalendarDateTime>(generateCalendarDateTime())

watch(
	() => modelValue.value,
	() => {
		datepicker.value.value = modelValue.value
	}
)
</script>
