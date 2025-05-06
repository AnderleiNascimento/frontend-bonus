<template>
  <DefaultLayout>
    <TableBasic 
      :title="pageTitle" 
      :rows="users.getUsers" 
      :columns="columns"
      :store="users"
      has-action
      :route-add="{ name: 'registers-users-add' }"
      route-edit="/cadastros/usuarios/alterar"
      :canAdd="canAdd"
      :canEdit="canEdit"
    />
  </DefaultLayout>
</template>

<script setup>
import { reactive, onMounted, ref, computed } from "vue";
import TableBasic from "@/components/TableBasic.vue";
import { useUsersStore } from "@/stores/modules/registers/users.js";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { useFormatData } from "@/composables/useFormatData";
import MeService from '@/services/MeService';
import { useRoute } from 'vue-router'

const user = ref(MeService.getUser());
const userRoles = ref(user.value?.roles || []);
const userPermissions = ref(user.value?.permissions || []);

const canAdd = computed(() => {
  return ['super_admin', 'admin'].some(role => userRoles.value.includes(role)) ||
         userPermissions.value.includes('create_users');
});

const canEdit = computed(() => {
  return ['super_admin', 'admin'].some(role => userRoles.value.includes(role)) ||
         userPermissions.value.includes('update_users');
});

const route = useRoute()
const pageTitle = route.meta.title

const users = useUsersStore();
const formatData = useFormatData();

const columns = reactive([
  {
    label: 'Ativo',
    field: 'active',
    formatFn: value => value === true ? 'Sim' : 'Não'
  },
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
    formatFn: value => formatData.phone(value)
  },
  {
    label: 'CPF',
    field: 'document',
    filterOptions: {
      placeholder: 'Filtrar por cpf',
      type: 'text',
      mask: '999.999.999-99'
    },
    formatFn: value => formatData.cpf(value)
  }
]);

onMounted(async () => {
  await users.get();
});
</script>