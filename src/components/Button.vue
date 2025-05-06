<template>
    <button type="button" :class="`btn ${btnClasses}`">
        {{ title }}
    </button>
</template>

<script setup>
const props = defineProps({
    title: {
        type: String,
        default: 'btnradio'
    },
    btnClasses: {
        type: String,
        default: 'btn-outline-dark'
    }
})
</script>