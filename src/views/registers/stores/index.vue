<template>
  <DefaultLayout>
    <TableBasic 
      :title="pageTitle" 
      :rows="stores.getStores" 
      :columns="columns"
      :store="stores"
      has-action
      :canRemove="false"
      routeEdit="/cadastros/lojas/alterar"
      routeAdd="/cadastros/lojas/adicionar"
      :canAdd="canAdd"
      :canEdit="canEdit"
    >
    </TableBasic>
  </DefaultLayout>
</template>

<script setup>
import { reactive, onMounted, ref, computed } from "vue";
import TableBasic from "@/components/TableBasic.vue";
import { useStoresStore }  from "@/stores/modules/registers/stores.js"
import DefaultLayout from "@/layouts/DefaultLayout.vue"
import { useFormatData } from "@/composables/useFormatData"
import MeService from '@/services/MeService'
import { useRoute } from 'vue-router'

const user = ref(MeService.getUser())
const userRoles = ref(user.value?.roles || [])
const userPermissions = ref(user.value?.permissions || [])

const canAdd = computed(() => {
  return ['super_admin'].some(role => userRoles.value.includes(role))
});

const canEdit = computed(() => {
  return ['super_admin', 'admin'].some(role => userRoles.value.includes(role)) ||
         userPermissions.value.includes('update_stores');
});

const route = useRoute()
const pageTitle = route.meta.title

const stores = useStoresStore()
const formatData = useFormatData()

const columns = reactive([
  {
    label: 'Cashback Ativo?',
    field: 'setting.is_cashback_enabled',
    formatFn: (value, row) => {
      return row.setting && row.setting.is_cashback_enabled == true ? 'Sim' : 'Não'
    }
  },
  {
    label: 'CNPJ',
    field: 'cnpj',
    filterOptions: {
      placeholder: 'Filtrar por cnpj',
      type: 'text'
    },
    formatFn: (value, row) => {
      return formatData.cnpj(value)
    }
  },
  {
    label: 'Nome',
    field: 'name',
    filterOptions: {
      placeholder: 'Filtrar por nome',
      type: 'text'
    }
  },
])

onMounted(async () => {
    await stores.get();
})
</script>
  