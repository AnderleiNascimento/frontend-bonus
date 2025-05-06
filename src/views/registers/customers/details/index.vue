<template>
<DefaultLayout>
  <b-row>
    <profile />
    <statusDetail />
  </b-row>
  <b-row>
    <b-col cols="6">
      <orders />
    </b-col>
    <b-col cols="6">
      <cashbacks />
    </b-col>
  </b-row>
</DefaultLayout>
</template>
<script setup>
import DefaultLayout from "@/layouts/DefaultLayout.vue"
import profile from './profile.vue';
import orders from './orders.vue';
import cashbacks from './cashbacks.vue';
import statusDetail from './status-detail.vue';
</script>
  