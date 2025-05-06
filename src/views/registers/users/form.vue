<template>
  <DefaultLayout>
    <b-row class="justify-content-center">
      <b-col cols="12">
        <UIComponentCard :title="pageTitle">
          <b-form @submit.prevent="onSubmit" :validation-schema="schema">
            <b-row class="mb-3">
              <b-col lg="12">
                <Checkbox label="Ativo?" @change="handleChangeActive" v-model="active" />
              </b-col>
            </b-row>

            <b-row class="mb-3">
              <b-col lg="6">
                <InputTextGroup 
                  label="Nome"
                  name="name"
                  placeholder="Informe o nome" 
                  v-model="name" 
                  :validate-message="nameError"
                />
              </b-col>
              <b-col lg="6">
                <InputTextGroup 
                label="CPF"
                name="cpf"
                placeholder="Informe o cpf" 
                v-model="cpf" 
                :validate-message="cpfError"
                mask="###.###.###-##"
              />
     
              </b-col>
            </b-row>

            <b-row class="mb-3">
              <b-col lg="4">
                <Selectr
                label="Loja"
                :options="stores.getStores" 
                name="store_id"
                v-model="store_id"
                :validate-message="storeIdError"
                value-option="id"
                label-option="name"
              />
              </b-col>
              <b-col lg="4">
                <InputTextGroup 
                  label="Telefone"
                  name="phone"
                  placeholder="Informe o telefone" 
                  v-model="phone" 
                  :validate-message="phoneError"
                  mask="(##) ####-#####"
                />
              </b-col>
              <b-col lg="4">
                <InputTextGroup 
                label="Email"
                name="email"
                placeholder="Informe o email" 
                v-model="email" 
                :validate-message="emailError"
              />
              </b-col>
            </b-row>

            <b-row class="mb-3">
              <b-col lg="6">
                <InputTextGroup 
                  label="Senha"
                  name="password"
                  placeholder="Informe a senha" 
                  v-model="password" 
                  :validate-message="passwordError"
                  type="password"
                  autoComplete="off"
                />
              </b-col>
              <b-col lg="6">
                <InputTextGroup 
                  label="Confirmação de Senha"
                  name="password_confirmation"
                  placeholder="Informe a senha de confirmacao" 
                  v-model="password_confirmation" 
                  :validate-message="passwordConfirmationError"
                  type="password"
                  autoComplete="off"
                />
              </b-col>
            </b-row>

            <b-row class="mb-3">
              <b-col v-if="canSelectRoles" lg="4">
                <Selectr
                  label="Papel"
                  :options="permissionsStore.getRoles" 
                  name="roles"
                  v-model="roles"
                  :validate-message="rolesError"
                  value-option="name"
                  label-option="label"
                />
              </b-col>
              <b-col lg="4">
                <Selectr
                  label="Permissões" 
                  :options="permissionsStore.getPermissions" 
                  name="permissions"
                  v-model="permissions"
                  :validate-message="permissionsError"
                  multiple
                  value-option="name"
                  label-option="label"
                />
              </b-col>
            </b-row>

            <b-button type="button" variant="secondary" @click="router.back()">Voltar</b-button>
            {{ " " }}
            <b-button type="submit" variant="primary">Salvar</b-button>
          </b-form>
        </UIComponentCard>
      </b-col>
    </b-row>
  </DefaultLayout>
</template>

<script setup>
import { reactive, ref, onMounted, computed } from 'vue'
import DefaultLayout from "@/layouts/DefaultLayout.vue"
import UIComponentCard from "@/components/UIComponentCard.vue"
import InputTextGroup from "@/components/InputTextGroup.vue"
import Selectr from "@/components/Selectr.vue"
import Checkbox from "@/components/Checkbox.vue"
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import messages from '@/helpers/messages'
import { useFormatData } from '@/composables/useFormatData'
import { useUsersStore } from '@/stores/modules/registers/users'
import { useStoresStore } from '@/stores/modules/registers/stores'
import { usePermissionStore } from '@/stores/permissions'
import { useRoute, useRouter } from 'vue-router'
import MeService from '@/services/MeService';

const user = ref(MeService.getUser());
const userRoles = ref(user.value?.roles || []);

const canSelectRoles = computed(() => {
  return ['super_admin'].some(role => userRoles.value.includes(role))
});

const router = useRouter()
const route = useRoute()
const pageTitle = route.meta.title

const isEdit = ref(route.params.id == undefined)
const formatData = useFormatData()
const users = useUsersStore()
const stores = useStoresStore()
const permissionsStore = usePermissionStore()

const schema = yup.object({
  active: yup.boolean(),
  cpf: yup
    .string()
    .required(messages.REQUIRED)
    .test('is-cpf-valid', messages.INVALID_CPF, (value) =>
      formatData.isValidCpf(value)
    ),
  name: yup.string().required(messages.REQUIRED),
  email: yup.string().required(messages.REQUIRED).email(messages.INVALID_EMAIL),
  phone: yup.string().nullable(),
  password: yup.string().when([], {
    is: () => isEdit.value,
    then: (schema) => schema.required(messages.REQUIRED).min(6, messages.MIN(6))
  }),
  password_confirmation: yup
    .string()
    .when([], {
      is: () => isEdit.value,
      then: (schema) => schema.required(messages.REQUIRED)
    })
    .oneOf([yup.ref('password')], messages.PASSWORD_MUST_MATCH),
  permissions: yup.array().nullable(),
  roles: yup.string().nullable(),
  store_id: yup.string().required(messages.REQUIRED),
})

const { handleSubmit } = useForm({
  validationSchema: schema,
})

const { value: active } = useField('active')
const { value: name, errorMessage: nameError } = useField('name')
const { value: cpf, errorMessage: cpfError } = useField('cpf')
const { value: email, errorMessage: emailError } = useField('email')
const { value: phone, errorMessage: phoneError } = useField('phone')
const { value: permissions, errorMessage: permissionsError } = useField('permissions')
const { value: roles, errorMessage: rolesError } = useField('roles')
const { value: password, errorMessage: passwordError } = useField('password')
const { value: password_confirmation, errorMessage: passwordConfirmationError } = useField('password_confirmation')
const { value: store_id, errorMessage: storeIdError } = useField('store_id')

const onSubmit = handleSubmit(async (values) => {
  values.document = formatData.removeNonDigits(values.cpf)
  values.phone = values.phone ? formatData.removeNonDigits(values.phone) : null
  values.active = values.active != undefined ? values.active : false
  values.roles = values.roles === null ? 'user' : values.roles

  if (route.params.id) {
    await users.update(route.params.id, values)
  } else {
    await users.create(values)
  }
})

function handleChangeActive(e) {
  active.value = e
}

onMounted(async () => {
  await stores.get({ limit: 100 })
  await permissionsStore.fetchPermissions()
  await permissionsStore.fetchRoles()

  if (route.params.id) {
    await users.find(route.params.id)

    active.value = users.getUser.active
    name.value = users.getUser.name
    cpf.value = users.getUser.document
    email.value = users.getUser.email
    phone.value = users.getUser.phone
    permissions.value = users.getUser.permissions
    store_id.value = users.getUser.store_id
    roles.value = users.getUser.roles.length > 0 ? users.getUser.roles[0] : ''
  } else {
    active.value = true
  }
})
</script>
