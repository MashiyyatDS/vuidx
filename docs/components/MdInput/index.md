# MdInput

No description

<script setup lang="ts">
import { ref,reactive } from 'vue'   

const validation = reactive({
	rules: 'required|min:2',
	messages: {
		required: 'This field is required',
		min: 'Minimum 2 characters are required',
	}
})
</script>

## Base Props

| Prop             |      Required      |   Default   |   Type    | Description |
| ---------------- | :----------------: | :---------: | :-------: | :---------: |
| formField        | :white_check_mark: |             | `boolean` |             |
| grid             |        :x:         | col-span-12 | `string`  |             |
| hidden           |        :x:         |    false    | `boolean` |             |
| nullInUndefined  |        :x:         |             | `boolean` |             |
| validateOnChange |        :x:         |             | `boolean` |             |
| validations      |        :x:         |             | `boolean` |             |
