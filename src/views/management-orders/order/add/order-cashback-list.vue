<template>
  <TableBasic 
    title="Cashbacks disponíveis"
    :rows="cashbackStore.getCashbacks"
    :columns="columns"
    :store="cashbackStore"
  >
    <template #actions="{ row }">
      <Button
        :title="appliedId === row.id ? 'Remover' : 'Aplicar'"
        :disabled="appliedId !== null && appliedId !== row.id"
        @click="handleApply(row)"
        :btnClasses="appliedId === row.id ? 'btn-danger' : 'btn-info'"
      />
    </template>
  </TableBasic>
</template>

<script setup>
import { ref, reactive, onUnmounted, onMounted } from 'vue'
import { useOrderStore } from '@/stores/modules/cashback/order'; 
import { useCashbackStore } from '@/stores/modules/cashback/cashbacks'; 
import { useFormatData } from "@/composables/useFormatData"

const formatData = useFormatData()
const orderStore = useOrderStore()
const cashbackStore = useCashbackStore()

const appliedId = ref(null)

const columns = reactive([
  {
    label: 'Valor',
    field: 'value',
    formatFn: (value) => formatData.formatNumberToFloat(value)
  },
  {
    label: 'Expira em',
    field: 'expires_at',
    formatFn: (value) => formatData.date(value)
  },
])

function handleApply(row) {
  if (appliedId.value === row.id) {
    orderStore.setCashbackValue(0)
    orderStore.setCashbackId(null)
    appliedId.value = null
  } else {
    orderStore.setCashbackValue(row.value)
    orderStore.setCashbackId(row.id)
    appliedId.value = row.id
  }
}

onMounted(() => {
  cashbackStore.resetCashbacks()
})

onUnmounted(() => {
  cashbackStore.resetCashbacks()
})
</script>