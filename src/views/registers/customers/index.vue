<template>
  <DefaultLayout>
    <TableBasic 
      :title="pageTitle" 
      :rows="customers.getCustomers" 
      :columns="columns"
      :store="customers"
      has-action
      :route-add="{ name: 'registers-customers-add' }"
      :canAdd="canAdd"
      :canEdit="canEdit"
    >
      <template #actions="{ row }">
        <router-link class="m-1" :to="`/cadastros/clientes/detalhes/${row.id}`">
          <i class="fa-solid fa-circle-info text-secondary fs-18" />
        </router-link>
        <router-link class="m-1" :to="`/cadastros/clientes/alterar/${row.id}`">
          <i class="las la-pen text-secondary fs-18" />
        </router-link>
      </template>
    </TableBasic>
  </DefaultLayout>
</template>

<script setup>
import { reactive, onMounted, ref, computed } from "vue";
import TableBasic from "@/components/TableBasic.vue";
import { useCustomerStore }  from "@/stores/modules/registers/customers.js"
import DefaultLayout from "@/layouts/DefaultLayout.vue"
import { useFormatData } from "@/composables/useFormatData"
import MeService from '@/services/MeService'
import { useRoute } from 'vue-router'

const user = ref(MeService.getUser())
const userRoles = ref(user.value?.roles || [])
const userPermissions = ref(user.value?.permissions || [])

const canAdd = computed(() => {
  return ['super_admin', 'admin'].some(role => userRoles.value.includes(role)) ||
         userPermissions.value.includes('create_customer');
});

const canEdit = computed(() => {
  return ['super_admin', 'admin'].some(role => userRoles.value.includes(role)) ||
         userPermissions.value.includes('update_customers');
});

const route = useRoute()
const pageTitle = route.meta.title

const customers = useCustomerStore()
const formatData = useFormatData()

const columns = reactive([
  {
    label: 'Nome',
    field: 'name',
    filterOptions: {
      placeholder: 'Filtrar por nome',
      type: 'text'
    }
  },
  {
    label: 'Email',
    field: 'email',
    filterOptions: {
      placeholder: 'Filtrar por email',
      type: 'text'
    }
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
    label: 'CPF',
    field: 'document',
    filterOptions: {
      placeholder: 'Filtrar por cpf',
      type: 'text',
      mask: '999.999.999-99'
    },
    formatFn: (value, row) => {
      return formatData.cpf(value)
    }
  }
])

onMounted(async () => {
    await customers.get();
})
</script>
  