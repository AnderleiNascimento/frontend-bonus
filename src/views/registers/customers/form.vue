<template>
  <DefaultLayout>
    <b-row class="justify-content-center">
      <b-col md="12" lg="12">
        <UIComponentCard :title="pageTitle">
          <b-form @submit.prevent="onSubmit" :validation-schema="schema">
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
                  label="CPF"
                  name="cpf"
                  placeholder="Informe o cpf" 
                  v-model="cpf" 
                  :validate-message="cpfError"
                  mask="###.###.###-##"
                />
              </b-col>
              <b-col lg="6">
                <InputTextGroup 
                  label="Telefone"
                  name="phone"
                  placeholder="Informe o telefone" 
                  v-model="phone" 
                  :validate-message="phoneError"
                  mask="(##) ####-#####"
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
  import { onMounted } from 'vue';
  import DefaultLayout from "@/layouts/DefaultLayout.vue";
  import UIComponentCard from "@/components/UIComponentCard.vue";
  import InputTextGroup from "@/components/InputTextGroup.vue";
  import { useField, useForm } from 'vee-validate';
  import * as yup from 'yup';
  import messages from '@/helpers/messages';
  import { useFormatData } from '@/composables/useFormatData';
  import { useCustomerStore } from '@/stores/modules/registers/customers'
  import { useRoute, useRouter } from 'vue-router'

  const router = useRouter()
  const route = useRoute()
  const pageTitle = route.meta.title

  const formatData = useFormatData()
  const customers = useCustomerStore()

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
})

const { handleSubmit } = useForm({
  validationSchema: schema
})

const { value: name, errorMessage: nameError } = useField('name')
const { value: cpf, errorMessage: cpfError } = useField('cpf')
const { value: email, errorMessage: emailError } = useField('email')
const { value: phone, errorMessage: phoneError } = useField('phone')

const onSubmit = handleSubmit(async (values) => {
  values.document = formatData.removeNonDigits(values.cpf)
  values.phone = values.phone ? formatData.removeNonDigits(values.phone) : null

  if (route.params.id) {
    await customers.update(route.params.id, values)
  } else {
    values.active = false
    await customers.create(values)
  }
})

onMounted(async () => {
  if (route.params.id) {
    await customers.find(route.params.id)

    name.value = customers.getCustomer.name
    cpf.value = customers.getCustomer.document
    email.value = customers.getCustomer.email
    phone.value = customers.getCustomer.phone
  }
})
</script>
    