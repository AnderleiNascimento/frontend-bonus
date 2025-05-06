import { defineStore } from 'pinia'
import OrderService from '@/services/modules/cashback/OrderService'
import { usePaginationStore } from '@/stores/pagination'
import router from "@/router";
import { useValidation } from '@/composables/useValidation'
import { useSpinnerStore } from '@/stores/spinner'

const spinner = useSpinnerStore()
const pagination = usePaginationStore()
const validation = useValidation()

export const useOrderStore = defineStore('useOrderStore', {
  id: 'useOrderStore',
  state: () => ({
    value: 0,
    cashback_value: 0,
    cashback_id: null,
    order: null,
    orders: []
  }),
  getters: {
    getValue(state) {
      return state.value
    },
    getCashbackValue(state) {
      return state.cashback_value
    },
    getCashbackId(state) {
      return state.cashback_id
    },
    getOrders(state) {
      return state.orders
    },
    getOrder(state) {
      return state.order
    }
  },
  actions: {
    setValue(value) {
      this.value = value
    },
    setCashbackValue(value) {
      this.cashback_value = value
    },
    setCashbackId(value) {
      this.cashback_id = value
    },
    async get(data) {
      spinner.setShow(true)

      await OrderService.get(data)
        .then((response) => {
            this.orders = response.data.data
            pagination.setCurrentPage(response.data.page)
            pagination.setTotalRows(response.data.total)
            spinner.setShow(false)
        })
        .catch((error) => {
          validation.validationMessage(error)
          spinner.setShow(false)
        })
    },
    async find(data) {
      await OrderService.find(data)
        .then((response) => {
            this.order = response.data.data
        })
        .catch((error) => {
          validation.validationMessage(error)
        })
    },
    async create(data) {
      await OrderService.create(data)
        .then((response) => {
            this.order = response.data.data
            validation.validationMessage(response)

            router.push({name: 'order-list'})
        })
        .catch((error) => {
          validation.validationMessage(error)
        })
    },
  }
})
