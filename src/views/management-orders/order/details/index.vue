<template>
  <DefaultLayout>
    <b-row v-if="orderStore.getOrder">
      <b-col lg="6">
        <OrderSummary />
      </b-col>
      <b-col lg="6">
        <OrderInformation />
      </b-col>
    </b-row>
  </DefaultLayout>
</template>
  
<script setup>
import { reactive, onMounted } from "vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import OrderInformation from './order-information.vue';
import OrderSummary from './order-summary.vue';
import { useOrderStore } from "@/stores/modules/cashback/order.js";
import { useRoute } from 'vue-router'

const orderStore = useOrderStore()
const route = useRoute()

onMounted(async () => {
  await orderStore.find(route.params.id)
})
</script>
    