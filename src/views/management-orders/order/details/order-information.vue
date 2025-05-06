<template>
  <b-card no-body>
    <b-card-header>
      <b-row class="align-items-center">
        <div class="col">
          <b-card-title>Informação</b-card-title>
        </div>
      </b-row>
    </b-card-header>
    <b-card-body class="pt-0">
      <div>
        <div class="d-flex justify-content-between mb-2">
          <p class="text-body fw-semibold">
            <i class="fas fa-building text-secondary font-20 align-middle me-1" />Loja :
          </p>
          <p class="text-body-emphasis fw-semibold">{{ orderStore.getOrder?.store?.name }}</p>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <p class="text-body fw-semibold">
            <i class="fas fa-user text-secondary font-20 align-middle me-1" />Cliente :
          </p>
          <p class="text-body-emphasis fw-semibold">{{ orderStore.getOrder?.customer?.name || formatData.cpf(orderStore.getOrder?.customer?.document) }}</p>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <p class="text-body fw-semibold">
            <i
              class="fas fa-user-tie text-secondary font-20 align-middle me-1"
            ></i
            >Vendedor :
          </p>
          <p class="text-body-emphasis fw-semibold">{{ orderStore.getOrder?.user?.name }}</p>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <p class="text-body fw-semibold">
            <i
              class="fas fa-hand-holding-usd text-secondary font-20 align-middle me-1"
            ></i
            >Cashback :
          </p>
          <p class="text-body-emphasis fw-semibold">
            <span class="text-primary">
              {{ formatData.formatNumberToFloat(orderStore.getOrder?.cashback.value) }}
            </span>
          </p>
        </div>
        <div class="d-flex justify-content-between mb-2">
          <p class="text-body fw-semibold">
            <i
              class="fas fa-calendar text-secondary font-20 align-middle me-1"
            ></i
            >Data do Pedido :
          </p>
          <p class="text-body-emphasis fw-semibold">
            {{ orderStore.getOrder?.transaction_date }}
          </p>
        </div>
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
