<template>
    <DefaultLayout>
      <TableBasic 
        :title="pageTitle" 
        :rows="orderStore.getOrders" 
        :columns="columns"
        :store="orderStore"
        routeAdd="/gestao-de-pedidos/criar-pedido"
        :canEdit="false"
        :canRemove="false"
      >
      <template #field-document="{ row }">
        <router-link :to="{ name: 'registers-customers-detail', params: { id: row.customerId }}">
          {{ formatData.cpf(row.document) }}
        </router-link>
      </template>
        <template #field-status="{ row }">
          <b-badge :variant="getVariantStatus(row.status)">
            {{ row.status_text }}
          </b-badge>
        </template>
        <template #actions="{ row }">
          <router-link :to="{ name: 'orders-detail', params: { id: row.id } }" class="text-secondary">
            <i class="fa-solid fa-circle-info me-1 fs-18"></i>
          </router-link>
        </template>
      </TableBasic>
    </DefaultLayout>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted, computed } from "vue";
  import { useOrderStore } from "@/stores/modules/cashback/order.js";
  import DefaultLayout from "@/layouts/DefaultLayout.vue";
  import { useFormatData } from "@/composables/useFormatData";
  import { useRoute } from 'vue-router'
  import MeService from '@/services/MeService'

  const user = ref(MeService.getUser())
  const userRoles = ref(user.value?.roles || [])
  const userPermissions = ref(user.value?.permissions || [])

  const canAdd = computed(() => {
    return ['super_admin', 'admin'].some(role => userRoles.value.includes(role)) ||
    userPermissions.value.includes('create_orders');
  });

  const route = useRoute()
  const pageTitle = route.meta.title
  
  const orderStore = useOrderStore()
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
      label: 'Subtotal',
      field: 'subtotal',
      formatFn: value => formatData.formatNumberToFloat(value)
    },
    {
      label: 'Desconto',
      field: 'discount',
      formatFn: value => formatData.formatNumberToFloat(value)
    },
    {
      label: 'Total',
      field: 'total',
      formatFn: value => formatData.formatNumberToFloat(value)
    },
    {
      label: 'Data do pedido',
      field: 'transaction_date',
      formatFn: value => formatData.date(value)
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
    await orderStore.get()
  })
  </script>
  