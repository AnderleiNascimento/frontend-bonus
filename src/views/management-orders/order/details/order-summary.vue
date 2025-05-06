<template>
  <b-card no-body>
    <b-card-header>
      <b-row class="align-items-center">
        <div class="col">
          <b-card-title>Resumo do Pedido</b-card-title>
        </div>
      </b-row>
    </b-card-header>
    <b-card-body class="pt-0">
      <div>
        <div class="d-flex justify-content-between">
          <p class="text-body fw-semibold">Subtotal :</p>
          <p class="text-body-emphasis fw-semibold">{{ formatData.formatNumberToFloat(orderStore.getOrder?.subtotal) }}</p>
        </div>
        <div class="d-flex justify-content-between">
          <p class="text-body fw-semibold">Desconto :</p>
          <p v-if="orderStore.getOrder?.discount > 0" class="text-danger fw-semibold">-{{ formatData.formatNumberToFloat(orderStore.getOrder?.discount) }}</p>
          <p v-else class="fw-semibold">{{ formatData.formatNumberToFloat(orderStore.getOrder?.discount) }}</p>
        </div>
      </div>
      <hr class="hr-dashed" />
      <div class="d-flex justify-content-between">
        <h4 class="mb-0">Total :</h4>
        <h4 class="mb-0">{{ formatData.formatNumberToFloat(orderStore.getOrder?.total) }}</h4>
      </div>
    </b-card-body>
  </b-card>
</template>
<script setup>
import { useOrderStore } from "@/stores/modules/cashback/order.js";
import { useFormatData } from "@/composables/useFormatData"

const formatData = useFormatData()
const orderStore = useOrderStore()
</script>
