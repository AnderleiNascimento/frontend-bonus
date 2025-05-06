<template>
  <DefaultLayout>
    <b-row>
      <b-col lg="8">
        <OrderCashbackList />
      </b-col>
      <b-col lg="4">
        <OrderSummary />
        <OrderForm />
      </b-col>
    </b-row>
  </DefaultLayout>
    <!-- <b-row class="justify-content-center">

      <b-col md="6" lg="6">
        <UIComponentCard title="Cadastrar venda">
          <b-form @submit.prevent="onSubmit" :validation-schema="schema">

            <b-row class="mb-2">
              <b-col lg="12">
                <InputTextGroup 
                  label="CPF"
                  name="document"
                  placeholder="Informe o cpf do cliente" 
                  v-model="document" 
                  :validate-message="documentError"
                  mask="999.999.999-99"
                  @update:modelValue="handleSearching"
                />
              </b-col>
            </b-row>

            <CashbackCustomerTable />

            <b-row class="mb-2">
              <b-col lg="12">
                <InputTextGroup 
                  label="Valor"
                  name="price"
                  placeholder="Informe o valor da venda" 
                  v-model="value" 
                  :validate-message="valueError"
                />
              </b-col>
            </b-row>

            <b-button type="submit" variant="primary">
              Salvar
            </b-button>

          </b-form>
        </UIComponentCard>

        <UIComponentCard title="Atualizar dados do cliente">
          <formCustomer />
        </UIComponentCard>
      </b-col>
      <b-col md="6" lg="6">
        <CashbackCustomerTable />
      </b-col>
    </b-row> -->
</template>
  
<script setup>
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import UIComponentCard from "@/components/UIComponentCard.vue";
import InputTextGroup from "@/components/InputTextGroup.vue";

import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import messages from '@/helpers/messages';  
import { useFormatData } from '@/composables/useFormatData';
import { useCashbackStore } from '@/stores/modules/cashback/cashbacks';
import { useSpinnerStore } from '@/stores/spinner';
import formCustomer from './form-customer.vue';
import RefundRequest from './order-cashback-list.vue';
import OrderSummary from './order-summary.vue';
import OrderForm from './order-form.vue';
import OrderCashbackList from "./order-cashback-list.vue";

const formatData = useFormatData();
const cashbacks = useCashbackStore();
const spinner = useSpinnerStore();

const schema = yup.object({
  document: yup
    .string()
    .required(messages.REQUIRED)
    .test('is-cpf-valid', messages.INVALID_CPF, (value) =>
      formatData.isValidCpf(value)
    ),
  value: yup.number().required(messages.REQUIRED),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
});

const { value: document, errorMessage: documentError } = useField('document');
const { value: value, errorMessage: valueError } = useField('value');

const onSubmit = handleSubmit(async (values) => {
  values.cpf = formatData.removeNonDigits(values.document);

  await cashbacks.create(values);
});

async function handleSearching(e) {
  if (e != null || e != undefined) {
    document.value = formatData.removeNonDigits(e)

    if (document.value.length === 11) {
      await cashbacks.getByDocument(document.value)
    }
  }
}
</script>
    