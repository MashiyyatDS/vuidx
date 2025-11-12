<template>
	<div v-if="!input.hidden" :class="[input?.grid ?? 'col-span-12']">
		<UFormField v-bind="input.formField">
			<MdInputDefault :input="input" v-if="input.type === 'default'" />

			<MdTextarea :textarea="input" v-if="input.type === 'textarea'" />

			<MdSwitch :input="input" v-if="input.type === 'switch'" v-model="input.value" />

			<MdPinInput
				:pin-input="input"
				v-if="input.type === 'pin-input'"
				v-model="input.value" />

			<MdInputNumber
				:input="input"
				v-if="input.type === 'input-number'"
				v-model="input.value" />

			<MdCheckbox :checkbox="input" v-if="input.type === 'checkbox'" v-model="input.value" />

			<MdCheckboxGroup
				:checkbox-group="input"
				v-if="input.type === 'checkbox-group'"
				v-model="input.value" />

			<MdRadioGroup
				:radio-group="input"
				v-if="input.type === 'radio-group'"
				v-model="input.value" />

			<MdDatepicker :datepicker="input" v-if="input.type === 'datepicker'" />

			<MdSelect v-if="input.type === 'select'" :select="input" ref="itemsRef" />

			<MdSelectMenu :select-menu="input" v-if="input.type === 'select-menu'" ref="itemsRef" />

			<MdInputMenu :input-menu="input" v-if="input.type === 'input-menu'" ref="itemsRef" />
		</UFormField>
	</div>
</template>

<script setup lang="ts">
import type { MdInputInterface } from './MdInput.vue.d.ts'
import MdInputDefault from './InputTypes/MdInputDefault.vue'
import MdTextarea from './InputTypes/MdTextarea.vue'
import MdSwitch from './InputTypes/MdSwitch.vue'
import MdPinInput from './InputTypes/MdPinInput.vue'
import MdInputNumber from './InputTypes/MdInputNumber.vue'
import MdCheckbox from './InputTypes/MdCheckbox.vue'
import MdCheckboxGroup from './InputTypes/MdCheckboxGroup.vue'
import MdRadioGroup from './InputTypes/MdRadioGroup.vue'
import MdDatepicker from './InputTypes/MdDatepicker.vue'
import MdSelect from './InputTypes/MdSelect.vue'
import MdSelectMenu from './InputTypes/MdSelectMenu.vue'
import MdInputMenu from './InputTypes/MdInputMenu.vue'
import { computed, defineExpose, useTemplateRef, defineModel } from 'vue'

const input = defineModel<MdInputInterface>('input', {
	required: true,
})

const hasItems = computed(
	() =>
		input.value.type === 'input-menu' ||
		input.value.type === 'select-menu' ||
		input.value.type === 'select'
)

const itemsRef = useTemplateRef('itemsRef')
const inputValue = computed(() => input.value.value)

defineExpose({
	value: inputValue,
	...(hasItems.value && { items: itemsRef }),
})
</script>
