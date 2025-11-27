<template>
	<UPopover :ui="{ content: 'sm:p-2 p-2 w-[500px]' }">
		<UButton
			icon="material-symbols:filter-list-rounded"
			class="cursor-pointer"
			:variant="themeStore().variantMode" />

		<template #content>
			<!-- Search -->
			<div class="p-1">
				<UFormField label="Search">
					<UInput placeholder="Search here" icon="mdi-search" class="w-full" />
				</UFormField>
			</div>

			<!-- Forms -->
			<MdForm v-if="filters?.form" :form="filters.form" />

			<!-- Timestamp popup -->
			<UPopover v-if="filters?.dateRange">
				<div class="flex flex-col gap-1 p-1 mb-2">
					<span class="font-semibold text-sm"> Timestamp </span>

					<UButton
						color="neutral"
						variant="subtle"
						icon="i-lucide-calendar"
						block
						class="cursor-pointer">
						<template v-if="timestamp.start">
							<template v-if="timestamp.end">
								{{ df.format(timestamp.start?.toDate(getLocalTimeZone())) }} -
								{{ df.format(timestamp.end?.toDate(getLocalTimeZone())) }}
							</template>

							<template v-else>
								{{ df.format(timestamp.start?.toDate(getLocalTimeZone())) }}
							</template>
						</template>
						<template v-else> Pick a date </template>
					</UButton>
				</div>

				<template #content>
					<UCalendar v-model="timestamp" class="p-2" :number-of-months="2" range />
				</template>
			</UPopover>

			<USeparator class="my-2" />

			<div class="flex justify-end">
				<UButton label="Reset" @click="resetFilters" :variant="themeStore().variantMode" />
			</div>
		</template>
	</UPopover>
</template>

<script setup lang="ts">
import useMdForm from '@/composables/useMdForm.ts'
import type { VdxTableInterface } from './VdxTable.vue.d.ts'
import { CalendarDateTime, DateFormatter, getLocalTimeZone } from '@internationalized/date'

const df = new DateFormatter('en-US', {
	dateStyle: 'medium',
})

interface DataRangeInterface {
	start: undefined | CalendarDateTime
	end: undefined | CalendarDateTime
}

const timestamp = shallowRef<DataRangeInterface>({
	start: undefined,
	end: undefined,
})

const filters = defineModel<VdxTableInterface['filters']>('filters', { required: true })

const resetFilters = () => {
	timestamp.value = { start: undefined, end: undefined }

	if (filters.value?.form) useMdForm(filters.value.form).reset()
}
</script>
