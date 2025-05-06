<template>
  <DefaultLayout>
    <UIComponentCard :title="pageTitle">
      <b-form @submit.prevent="onSubmit" :validation-schema="schema">
        <b-row class="mb-3">
          <b-col lg="6">
            <InputTextGroup 
              label="CNPJ"
              name="cnpj"
              placeholder="Informe o cnpj" 
              v-model="cnpj" 
              :validate-message="cnpjError"
              mask="99.999.999/9999-99"
            />
          </b-col>
          <b-col lg="6">
            <InputTextGroup 
              label="Nome"
              name="name"
              placeholder="Informe o nome" 
              v-model="name" 
              :validate-message="nameError"
            />
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col lg="2">
            <Selectr
              label="Ativar cashback?" 
              :options="optionsEnabledCashback" 
              name="is_cashback_enabled"
              v-model="is_cashback_enabled"
              :validate-message="isCashbackEnabledError"
            />
          </b-col>
        </b-row>
        <template v-if="is_cashback_enabled == true">
          <b-row class="mb-3">
            <b-col lg="4">
              <InputCurrency 
                label="Qual o percentual de cashback?"
                name="cashback_percentage"
                placeholder="Informe a porcentagem gerada por cashback" 
                v-model="cashback_percentage" 
                :validate-message="cashbackPercentageError"
                :options="{ currency: 'BRL', currencyDisplay: 'hidden', precision: 0 }"
              />
            </b-col>
            <b-col lg="4">
              <InputCurrency 
                label="Por quanto tempo o cashback será válido?"
                name="expiration_days"
                placeholder="Informe a quantidade de dias válidos pelo cashback" 
                v-model="expiration_days" 
                :validate-message="expirationDaysError"
                :options="{ currency: 'BRL', currencyDisplay: 'hidden', precision: 0 }"
              />
            </b-col>
            <b-col lg="4">
              <InputCurrency 
                label="Qual é o valor máximo disponível para cashback?"
                name="minimum_purchase_value"
                placeholder="Informe o valor máximo por cashback" 
                v-model="minimum_purchase_value" 
                :validate-message="minimumPurchaseValueError"
              />
            </b-col>
          </b-row>
          <b-row class="mb-3">
            <b-col lg="4">
              <Selectr
                label="Gerar cashback pela compra realizada com cashback?" 
                :options="optionsEnabledCashback" 
                name="can_generate_cashback_when_used"
                v-model="can_generate_cashback_when_used"
                :validate-message="canGenerateCashbackError"
              />
            </b-col>
            <b-col lg="4">
              <InputCurrency 
                label="Quantas vezes a compra deve ser maior que o cashback?"
                name="min_purchase_multiple_for_cashback"
                placeholder="Informe quantas vezes a compra deve ser maior que o cashback" 
                v-model="min_purchase_multiple_for_cashback" 
                :validate-message="minPurchaseMultipleError"
                :options="{ currency: 'BRL', currencyDisplay: 'hidden', precision: 0 }"
              />
            </b-col>
          </b-row>
        </template>
        <!-- <b-row class="mb-3">
          <b-col lg="6">
            <Highlight language="language-json" :code="integrationJson" />
          </b-col>
          <b-col lg="4">
            <InputClipboard 
              name="api_key"
              v-model="apiKey"
              type="password"
              disabled
              label="Copiar"
            />
          </b-col>
        </b-row> -->
        <b-button type="button" variant="secondary" @click="router.back()">Voltar</b-button>
        {{ " " }}
        <b-button type="submit" variant="primary">Salvar</b-button>
      </b-form>
    </UIComponentCard>
  </DefaultLayout>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue"
import { useFormatData } from "@/composables/useFormatData"
import { useField, useForm } from 'vee-validate';
import { useStoresStore } from '@/stores/modules/registers/stores.js';
import { useRoute, useRouter } from 'vue-router';
import * as yup from 'yup';
import messages from '@/helpers/messages';

const formatData = useFormatData()

const stores = useStoresStore()
const router = useRouter()
const route = useRoute()

const pageTitle = route.meta.title
const apiKey = ref(null)

const integrationJson = `{
  // Exemplo de modelo payload de integração
  total: 159.99,
  document: "92398163059",
}`;

const optionsEnabledCashback = reactive([
  {
    label: 'Sim',
    value: 1
  },
  {
    label: 'Não',
    value: 0
  },
])

const schema = yup.object({
    cnpj: yup
      .string()
      .required(messages.REQUIRED),
    name: yup.string().required(messages.REQUIRED),
    cashback_percentage: yup.number().nullable(),
    expiration_days: yup.number().nullable(),
    minimum_purchase_value: yup.number().nullable(),
    is_cashback_enabled: yup.boolean(),
    can_generate_cashback_when_used: yup.boolean(),
    min_purchase_multiple_for_cashback: yup.number().nullable(),
})

const { handleSubmit } = useForm({
  validationSchema: schema
})

const { value: name, errorMessage: nameError } = useField('name')
const { value: cnpj, errorMessage: cnpjError } = useField('cnpj')
const { value: cashback_percentage, errorMessage: cashbackPercentageError } = useField('cashback_percentage')
const { value: expiration_days, errorMessage: expirationDaysError } = useField('expiration_days')
const { value: minimum_purchase_value, errorMessage: minimumPurchaseValueError } = useField('minimum_purchase_value')
const { value: is_cashback_enabled, errorMessage: isCashbackEnabledError } = useField('is_cashback_enabled')
const { value: can_generate_cashback_when_used, errorMessage: canGenerateCashbackError } = useField('can_generate_cashback_when_used')
const { value: min_purchase_multiple_for_cashback, errorMessage: minPurchaseMultipleError } = useField('min_purchase_multiple_for_cashback')

const onSubmit = handleSubmit(async (values) => {
  const payload = {
    name: values.name,
    cnpj: formatData.removeNonDigits(values.cnpj),
    setting: {
      cashback_percentage: values.cashback_percentage,
      expiration_days: values.expiration_days,
      minimum_purchase_value: values.minimum_purchase_value,
      is_cashback_enabled: values.is_cashback_enabled == 1,
      can_generate_cashback_when_used: values.can_generate_cashback_when_used == 1,
      min_purchase_multiple_for_cashback: values.min_purchase_multiple_for_cashback,
    }
  }

  if (route.params.id) {
    await stores.update(route.params.id, payload)
  } else {
    await stores.create(payload)
  }
})

onMounted(async () => {
  if (route.params.id) {
    await stores.find(route.params.id)

    name.value = stores.getStore.name
    cnpj.value = stores.getStore.cnpj
    apiKey.value = stores.getStore.api_key

    if (stores.getStore?.setting) {
      cashback_percentage.value = stores.getStore.setting.cashback_percentage
      expiration_days.value = stores.getStore.setting.expiration_days
      is_cashback_enabled.value = stores.getStore.setting.is_cashback_enabled === true ? 1 : 0
      minimum_purchase_value.value = stores.getStore.setting.minimum_purchase_value
      can_generate_cashback_when_used.value = stores.getStore.setting.can_generate_cashback_when_used === true ? 1 : 0
      minimum_purchase_value.value = stores.getStore.setting.minimum_purchase_value
      min_purchase_multiple_for_cashback.value = stores.getStore.setting.min_purchase_multiple_for_cashback
    }
  }
})
</script>
  