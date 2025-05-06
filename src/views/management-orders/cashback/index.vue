<template>
    <DefaultLayout>
      <TableBasic 
        :title="pageTitle" 
        :rows="cashbackStore.getCashbacks" 
        :columns="columns"
        :store="cashbackStore"
        :canAdd="false"
        :canEdit="false"
        :canRemove="false"
      >
        <template #field-document="{ row }">
          <router-link :to="{ name: 'registers-customers-detail', params: { id: row.customerId }}">
            {{ formatData.cpf(row.document) }}
          </router-link>
        </template>
        <template #field-order-id="{ row }">
          <router-link :to="{ name: 'orders-detail', params: { id: row.order_id }}">
            <i class="fas fa-eye" />
            Ver
          </router-link>
        </template>
        <template #field-status="{ row }">
          <b-badge :variant="getVariantStatus(row.status)">
            {{ row.status_text }}
          </b-badge>
        </template>
      </TableBasic>
    </DefaultLayout>
  </template>
  
  <script setup>
  import { reactive, onMounted } from "vue";
  import { useCashbackStore } from "@/stores/modules/cashback/cashbacks.js";
  import DefaultLayout from "@/layouts/DefaultLayout.vue";
  import { useFormatData } from "@/composables/useFormatData";
  import { useRoute } from 'vue-router'
  
  const route = useRoute()
  const pageTitle = route.meta.title
  
  const cashbackStore = useCashbackStore()
  const formatData = useFormatData()
  
  const columns = reactive([
    {
      label: 'Cliente',
      field: 'name',
      filterOptions: {
        placeholder: 'Filtrar por cliente',
        type: 'text',
      },
    },
    {
      label: 'CPF',
      field: 'document',
      filterOptions: {
        placeholder: 'Filtrar por cpf',
        type: 'text',
        mask: '999.999.999-99'
      },
    },
    {
      label: 'Telefone',
      field: 'phone',
      filterOptions: {
        placeholder: 'Filtrar por telefone',
        type: 'text',
        mask: '(99) 99999-9999'
      },
      formatFn: (value, row) => {
        return formatData.phone(value)
      }
    },
    {
      label: 'Valor',
      field: 'value',
      formatFn: value => formatData.formatNumberToFloat(value)
    },
    {
      label: 'Data de expiração',
      field: 'expires_at',
      formatFn: value => formatData.date(value)
    },
    {
      label: 'Pedido',
      field: 'order_id',
    },
    {
      label: 'Status',
      field: 'status',
    },
  ])
  
  function getVariantStatus(status) {
    if (status === 'available') {
      return 'primary'
    } else if (status === 'used') {
      return 'success'
    } else if (status === 'expired') {
      return 'danger'
    }
  }
  
  onMounted(async () => {
    await cashbackStore.get()
  })
  </script>
  