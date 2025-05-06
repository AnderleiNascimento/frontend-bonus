<template>
  <div class="input-group">
    <b-form-input 
      :type="type"
      :id="name"
      :value="_value"
      @input.prevent.stop="handleInput"
      :disabled="disabled"
    />
    <b-button
      variant="secondary"
      type="button"
      @click="(e) => doCopy(_value, e)"
    >
      <i class="far fa-copy me-2" />{{ label }}
    </b-button>
</div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { copyText } from "vue3-clipboard";

const props = defineProps({
  name: {
    type: String,
    requird: true
  },
  label: {
    type: String,
    requird: true
  },
  modelValue: {
    type: [String, Number],
    default: ''
  },
  type: {
    type: String,
    default: 'text'
  },
  disabled: {
    type: Boolean,
  },
})

const emit = defineEmits(["update:modelValue", "search"]);

const _value = ref(props.modelValue)

function handleInput(event) {
  _value.value = event.target.value
  emit('update:modelValue', _value.value)
}

const doCopy = (text, e) => {
  copyText(text, undefined, (error) => {
    if (error) {
      console.log(error);
      return;
    } else {
      const text = e.srcElement.innerText;
      e.srcElement.innerText = "Copied!";
      setTimeout(() => {
        e.srcElement.innerText = text;
      }, 3000);
    }
  });
};

watch(
  () => props.modelValue,
    (newValue) => {
      _value.value = newValue
    }
)
</script>