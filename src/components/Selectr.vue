<template>
  <label class="mb-1" :for="name" v-bind="$attrs">
    {{ label }}
  </label>
  <select :id="name" v-bind="$attrs" v-model="localValue" :multiple="multiple">
    <option disabled value="">{{ placeholder }}</option>
    <option v-if="!options.length" disabled>Carregando opções...</option>
    <option
      v-for="(option, idx) in options"
      :key="idx"
      :value="option[valueOption || 'value']"
    >
      {{ option[labelOption || 'label'] }}
    </option>
  </select>
  <div v-if="validateMessage" class="text-danger">
    {{ validateMessage }}
  </div>
</template>

<script setup>
import { ref, watch, computed, onBeforeUnmount, nextTick } from 'vue'
import Selectr from 'mobius1-selectr'

const props = defineProps({
  name: String,
  label: String,
  placeholder: {
    type: String,
    default: 'Selecione',
  },
  validateMessage: {
    type: String,
    default: null,
  },
  modelValue: {
    type: [String, Array, Number],
    default: (props) => (props.multiple ? [] : ''),
  },
  options: {
    type: Array,
    required: true,
  },
  labelOption: {
    type: String,
    default: 'label',
  },
  valueOption: {
    type: String,
    default: 'value',
  },
  multiple: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:modelValue', 'selected'])
const selectrInstance = ref(null)

const localValue = computed({
  get: () => {
    return props.multiple
      ? Array.isArray(props.modelValue)
        ? props.modelValue
        : []
      : props.modelValue
  },
  set: (newValue) => {
    emit('update:modelValue', newValue)
    emit('selected', newValue)
  },
})

const initSelectr = async () => {
  await nextTick()

  if (selectrInstance.value) {
    selectrInstance.value.destroy()
  }

  selectrInstance.value = new Selectr(`#${props.name}`, {
    placeholder: props.placeholder,
    multiple: props.multiple,
  })

  selectrInstance.value.on('selectr.change', () => {
    const selected = selectrInstance.value.getValue()
    emit('update:modelValue', selected)
    emit('selected', selected)
  })

  if (
  props.multiple
    ? Array.isArray(props.modelValue) && props.modelValue.length > 0
    : props.modelValue != null && props.modelValue !== ''
) {
  selectrInstance.value.setValue(props.modelValue)
}
}

watch(
  () => props.options,
  (newOptions) => {
    if (newOptions && newOptions.length) {
      initSelectr()
    }
  },
  { immediate: true }
)

watch(() => props.modelValue, (newVal) => {
  if (!selectrInstance.value) return

  const current = selectrInstance.value.getValue()

  if (JSON.stringify(current) !== JSON.stringify(newVal)) {
    selectrInstance.value.setValue(newVal)
  }
})


onBeforeUnmount(() => {
  if (selectrInstance.value) {
    selectrInstance.value.destroy()
  }
})
</script>