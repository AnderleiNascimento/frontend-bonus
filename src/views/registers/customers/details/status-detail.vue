<template>
  <b-col md="12" lg="7">
    <b-card no-body>
      <b-card-body>
        <b-row class="g-3">
          <b-col v-for="(item, idx) in items" :key="idx" md="6" lg="6">
            <StatsWidgetCardTwo :item="item" />
          </b-col>
        </b-row>
      </b-card-body>
    </b-card>
  </b-col>
</template>

<script setup>
import { computed } from 'vue';
import { useFormatData } from '@/composables/useFormatData';
import { useCustomerStore } from '@/stores/modules/registers/customers'

const formatData = useFormatData()
const customers = useCustomerStore()

const items = computed(() => {
  const newCustomer = customers.getCustomer
  if (!newCustomer) {
    return []
  }

  return [
    {
      title: 'Dias sem comprar',
      stat: newCustomer.days_last_transaction ?? 0,
      icon: 'far fa-calendar fs-24 align-self-center text-warning me-2'
    },
    {
      title: 'Total em compras',
      stat: formatData.formatNumberToFloat(newCustomer.total_transaction ?? 0),
      icon: 'iconoir-dollar-circle fs-24 align-self-center text-info me-2'
    },
    {
      title: 'Quantidade de compras',
      stat: newCustomer.qtt_transactions ?? 0,
      icon: 'iconoir-cart fs-24 align-self-center text-blue me-2'
    },
    {
      title: 'Ticket Médio',
      stat: formatData.formatNumberToFloat(newCustomer.average_ticket ?? 0),
      icon: 'fa fa-tag fs-24 align-self-center text-blue me-2'
    },
    {
      title: 'Total em cashback',
      stat: formatData.formatNumberToFloat(newCustomer.total_cashback ?? 0),
      icon: 'fa fa-hand-holding-usd fs-24 align-self-center text-success me-2'
    },
  ]
})
</script>
  