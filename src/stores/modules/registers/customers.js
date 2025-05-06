import { defineStore } from 'pinia'
import CustomerService from '@/services/modules/registers/CustomerService'
import router from "@/router";
import { usePaginationStore } from '@/stores/pagination'
import { useValidation } from '@/composables/useValidation'
import { useSpinnerStore } from '@/stores/spinner'

const spinner = useSpinnerStore()
const pagination = usePaginationStore()
const validation = useValidation()

export const useCustomerStore = defineStore('useCustomerStore', {
  id: 'useCustomerStore',
  state: () => ({
    customer: null,
    customers: []
  }),
  getters: {
    getCustomer(state) {
      return state.customer
    },
    getCustomers(state) {
      return state.customers
    },
  },
  actions: {
    async get(data) {
      spinner.setShow(true)

      await CustomerService.get(data)
        .then((response) => {
            this.customers = response.data.data
            pagination.setCurrentPage(response.data.page)
            pagination.setTotalRows(response.data.total)
            spinner.setShow(false)
        })
        .catch((error) => {
          validation.validationMessage(error)
          spinner.setShow(false)
        })
    },
    async find(id) {
      await CustomerService.find(id)
        .then(async (response) => {
          if (response.status === 200) {
            this.customer = response.data.data
          }
        })
        .catch((error) => {
          validation.validationMessage(error)
        })
    },
    async create(data) {
      await CustomerService.create(data)
        .then((response) => {
            this.customer = response.data.data
            validation.validationMessage(response)

            router.push({name: 'registers-customers'})
        })
        .catch((error) => {
          validation.validationMessage(error)
        })
    },
    async update(id, data) {
      await CustomerService.update(id, data)
        .then((response) => {
            this.customer = response.data.data
            validation.validationMessage(response)

            router.push({name: 'registers-customers'})
        })
        .catch((error) => {
          validation.validationMessage(error)
        })
    },
  }
})
