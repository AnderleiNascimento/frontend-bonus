<template>
  <b-card no-body>
    <b-card-header>
      <b-row class="align-items-center">
        <div class="col">
          <b-card-title>Resumo do Pedido</b-card-title>
        </div>
        <div class="col-auto">
          <b-badge
            v-if="orderStore.getCashbackId"
            :variant="null"
            class="text-success bg-success-subtle fs-12 p-1"
          >
            Cashback Aplicado
          </b-badge>
        </div>
      </b-row>
    </b-card-header>
    <b-card-body class="pt-0">
      <div>
        <div class="d-flex justify-content-between">
          <p class="text-body fw-semibold mb-0">Subtotal :</p>
          <p class="text-body-emphasis fw-semibold mb-0">{{ formatData.formatNumberToFloat(orderStore.getValue) }}</p>
        </div>
        <div class="d-flex justify-content-between">
          <p class="text-body fw-semibold">Desconto :</p>
          <p v-if="orderStore.getCashbackValue > 0" class="fw-semibold text-danger">-{{ formatData.formatNumberToFloat(orderStore.getCashbackValue) }}</p>
          <p v-else class="fw-semibold text-body-emphasis">{{ formatData.formatNumberToFloat(orderStore.getCashbackValue) }}</p>
        </div>
      </div>
      <hr class="hr-dashed" />
      <div class="d-flex justify-content-between">
        <h4 class="mb-0">Total :</h4>
        <h4 class="mb-0">{{ total }}</h4>
      </div>
    </b-card-body>
  </b-card>
</template>
<script setup>
import { computed } from 'vue' 
import { useOrderStore } from '@/stores/modules/cashback/order';
import { useFormatData } from "@/composables/useFormatData"

const formatData = useFormatData()
const orderStore = useOrderStore();

const total = computed(() => {
  return formatData.formatNumberToFloat(orderStore.getValue - orderStore.getCashbackValue)
})

</script>
