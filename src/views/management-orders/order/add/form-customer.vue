<template>
  <b-form @submit.prevent="onSubmit" :validation-schema="schema">
    <b-row class="mb-2">
      <b-col lg="12">
        <InputTextGroup 
          label="Nome"
          name="name"
          v-model="name" 
          placeholder="Informe o nome"
          :validate-message="nameError"
        />
      </b-col>
    </b-row>
  
    <b-row class="mb-2">
      <b-col lg="12">
        <InputTextGroup 
          label="Email"
          name="email"
          v-model="email"
          placeholder="Informe o email"
          :validate-message="emailError"
        />
      </b-col>
    </b-row>
  
    <b-row class="mb-2">
      <b-col lg="12">
        <InputTextGroup 
          label="Telefone"
          name="phone"
          v-model="phone" 
          placeholder="Informe o telefone"
          :validate-message="phoneError"
          mask="(##) ####-#####"
        />
      </b-col>
    </b-row>
  
    <b-button 
      type="submit" 
      variant="primary"
    >
      Salvar dados do cliente
    </b-button>
  </b-form>  
</template>
  
<script setup>
import { watch } from 'vue';
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';

import InputTextGroup from "@/components/InputTextGroup.vue";

import messages from '@/helpers/messages';  
import { useFormatData } from '@/composables/useFormatData';
import { useCustomerStore } from '@/stores/modules/registers/customers';

const formatData = useFormatData();
const customers = useCustomerStore();

const schema = yup.object({
  name: yup.string().required(messages.REQUIRED),
  email: yup.string().required(messages.REQUIRED).email(messages.INVALID_EMAIL),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
});

const { value: name, errorMessage: nameError } = useField('name');
const { value: email, errorMessage: emailError } = useField('email');
const { value: phone, errorMessage: phoneError } = useField('phone');

const onSubmit = handleSubmit(async (values) => {
  values.phone = values.phone ? formatData.removeNonDigits(values.phone) : null;

  await customers.update(customers.getCustomer.id, values);
});

watch(
  () => customers.getCustomer,
  (newCustomer) => {
    if (newCustomer != null) {
      name.value = newCustomer?.name || null
      email.value = newCustomer?.email || null
      phone.value = newCustomer?.phone || null
    }
  },
  { immediate: true }
)
</script>
    