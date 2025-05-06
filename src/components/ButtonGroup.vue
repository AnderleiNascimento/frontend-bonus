<template>
    <b-button-group>
        <template v-for="(button, idx) in buttons" :key="idx">
            <input
                type="radio"
                class="btn-check"
                :name="name"
                :id="`${name}${idx}`"
                @click="handleChange(button.value)"
                :value="button.value"
                v-model="selectedValue"
            />
            <label class="btn btn-outline-secondary" :for="`${name}${idx}`">
                {{button.label}}
            </label>
        </template>
    </b-button-group>
</template>

<script setup>
import { ref } from 'vue';

const selectedValue = ref(null);

const props = defineProps({
    buttons: {
        type: Object
    },
    name: {
        type: String,
        default: 'btnradio'
    }
})

const emit = defineEmits();

function handleChange(e) {
    emit('click-button', e)
}
</script>