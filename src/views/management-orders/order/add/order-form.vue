<template>
  <b-card no-body>
    <b-card-body>
      <b-form @submit.prevent="onSubmit" :validation-schema="schema">
        <InputTextGroup 
          label="CPF"
          name="document"
          placeholder="Informe o nome" 
          v-model="document" 
          :validate-message="documentError"
          class="mb-3"
          @update:modelValue="handleSearching"
          mask="999.999.999.99"
        />
        <InputCurrency 
          label="Valor"
          name="total"
          placeholder="Informe o valor" 
          v-model="total" 
          :validate-message="totalError"
          class="mb-3"
          @input="handleTotal"
        />
        <b-button type="submit" variant="primary">
          Criar pedido
        </b-button>
      </b-form>
    </b-card-body>
  </b-card>
</template>
<script setup>
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import messages from '@/helpers/messages';
import { useOrderStore } from '@/stores/modules/cashback/order'; 
import { useCashbackStore } from '@/stores/modules/cashback/cashbacks'; 
import { useFormatData } from "@/composables/useFormatData"

const formatData = useFormatData()
const orderStore = useOrderStore();
const cashbackStore = useCashbackStore();

const schema = yup.object({
  document: yup
    .string()
    .required(messages.REQUIRED)
    .test('is-cpf-valid', messages.INVALID_CPF, (value) =>
      formatData.isValidCpf(value)
    ),
    total: yup.number().required(messages.REQUIRED),
});

const { handleSubmit } = useForm({
  validationSchema: schema,
});

const { value: document, errorMessage: documentError } = useField('document');
const { value: total, errorMessage: totalError } = useField('total');

const onSubmit = handleSubmit(async (values) => {
  values.cpf = formatData.removeNonDigits(values.document);
  values.cashback_id = orderStore.getCashbackId

  await orderStore.create(values);
});

async function handleSearching(e) {
  if (e != null || e != undefined) {
    document.value = formatData.removeNonDigits(e)

    if (document.value.length === 11) {
      await cashbackStore.get({
        document: document.value,
        status: 'available'
      })
    }
  }
}

function handleTotal(e) {
  orderStore.setValue(total.value)
}
</script>
