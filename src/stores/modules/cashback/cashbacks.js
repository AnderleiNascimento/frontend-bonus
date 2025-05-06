import { defineStore } from 'pinia'
import CashbackService from '@/services/modules/cashback/CashbackService'
import { useValidation } from '@/composables/useValidation'
import { usePaginationStore } from '@/stores/pagination'
import { useSpinnerStore } from '@/stores/spinner'

const spinner = useSpinnerStore()
const validation = useValidation()
const pagination = usePaginationStore()

export const useCashbackStore = defineStore('useCashbackStore', {
  id: 'useCashbackStore',
  state: () => ({
    cashback: {},
    cashbacks: [],
  }),
  getters: {
    getCashback(state) {
      return state.cashback
    },
    getCashbacks(state) {
      return state.cashbacks
    },
  },
  actions: {
    async get(data) {
      spinner.setShow(true)

      await CashbackService.get(data)
        .then((response) => {
            this.cashbacks = response.data.data
            pagination.setCurrentPage(response.data.page)
            pagination.setTotalRows(response.data.total)
            spinner.setShow(false)
        })
        .catch((error) => {
          validation.validationMessage(error)
          spinner.setShow(false)
        })
    },
    resetCashbacks() {
      pagination.setCurrentPage(0)
      pagination.setTotalRows(0)
      this.cashbacks = []
    }
  }
})
