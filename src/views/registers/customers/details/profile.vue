<template>
  <b-col v-if="customers.getCustomer" md="12" lg="5">
    <b-card no-body>
      <b-card-body>
        <b-row class="align-items-center">
          <div class="col">
            <div class="d-flex align-items-center">
              <div class="flex-grow-1 text-truncate">
                <h5 class="m-0 fs-3 fw-bold">{{ customers.getCustomer.name }}</h5>
              </div>
            </div>
          </div>
          <div class="col-auto text-end">
            <b-button
              type="button"
              size="sm"
              variant="outline-secondary"
              class="px-2 d-inline-flex align-items-center"
              @click="router.push({ name: 'registers-customers-edit', params: { id: customers.getCustomer.id } })"
            >
              <i class="las la-pen fs-14 me-1"></i>Atualizar
            </b-button>
          </div>
        </b-row>
        <div class="mt-3">
          <div class="text-body mb-2 d-flex align-items-center">
            <i class="far fa-address-book fs-20 me-1 text-muted" />
            <span class="text-body fw-semibold">CPF:</span>
            {{ formatData.cpf(customers.getCustomer.document) }}
          </div>
          <div class="text-muted mb-2 d-flex align-items-center">
            <i class="iconoir-mail-out fs-20 me-1" />
            <span class="text-body fw-semibold">Email:</span>
            <span class="text-primary text-decoration-underline">
              {{ customers.getCustomer.email }}
            </span>
          </div>
          <div v-if="customers.getCustomer.phone" class="text-body mb-3 d-flex align-items-center">
            <i class="iconoir-phone fs-20 me-1 text-muted" />
            <span class="text-body fw-semibold">Telefone:</span>
            {{ formatData.phone(customers.getCustomer.phone) }}
          </div>
        </div>
      </b-card-body>
    </b-card>
  </b-col>
</template>
<script setup>
import { useCustomerStore } from '@/stores/modules/registers/customers'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue' 
import { useFormatData } from "@/composables/useFormatData"
import { useRouter } from 'vue-router'

const formatData = useFormatData()
const route = useRoute()
const customers = useCustomerStore()
const router = useRouter()

onMounted(async () => {
  if (route.params.id) {
    await customers.find(route.params.id)
  }
})
</script>
  