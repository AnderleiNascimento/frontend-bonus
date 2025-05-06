import { defineStore } from 'pinia'
import DashboardService from '../../../services/modules/cashback/DashboardService'
import { useValidation } from '@/composables/useValidation'

const validation = useValidation()

export const useDashboardStore = defineStore('useDashboardStore', {
  id: 'useDashboardStore',
  state: () => ({
    cashback: [],
    loyalties: [],
    top_customers: []
  }),
  getters: {
    getCashback(state) {
      return state.cashback
    },
    getLoyalties(state) {
      return state.loyalties
    },
    getTopCustomers(state) {
      return state.top_customers
    }
  },
  actions: {
    async fetchCashback(data) {
      await DashboardService.getCashback(data)
        .then((response) => {
            this.cashback = response.data.data
        })
        .catch((error) => {
          validation.validationMessage(error)
        })
    },
    async fetchLoyalties(data) {
      await DashboardService.getLoyalties(data)
        .then((response) => {
            this.loyalties = response.data.data
            this.top_customers = response.data.data.top_customers
        })
        .catch((error) => {
          validation.validationMessage(error)
        })
    },
  }
})
