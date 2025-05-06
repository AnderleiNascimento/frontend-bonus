<template>
  <b-col md="6" lg="6" v-for="(item, idx) in data" :key="idx">
    <StatsWidgetCardOne :item="item" />
  </b-col>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
  }
})
</script>
