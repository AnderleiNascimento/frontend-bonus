import { defineStore } from 'pinia'
import StoreService from '@/services/modules/cashback/StoreService'
import router from "@/router";
import { usePaginationStore } from '@/stores/pagination'
import { useValidation } from '@/composables/useValidation'
import { useSpinnerStore } from '@/stores/spinner'

const spinner = useSpinnerStore()
const pagination = usePaginationStore()
const validation = useValidation()

export const useStoresStore = defineStore('useStoresStore', {
  id: 'useStoresStore',
  state: () => ({
    store: null,
    stores: []
  }),
  getters: {
    getStore(state) {
      return state.store
    },
    getStores(state) {
      return state.stores
    }
  },
  actions: {
    async get(data) {
      spinner.setShow(true)

      await StoreService.get(data)
        .then((response) => {
            this.stores = response.data.data
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
      await StoreService.find(id)
        .then(async (response) => {
          if (response.status === 200) {
            this.store = response.data.data
          }
        })
        .catch((e) => {
          validation.validationMessage(error)
        })
    },
    async create(data) {
      await StoreService.create(data)
        .then((response) => {
            this.store = response.data.data
            validation.validationMessage(response)

            router.push({name: 'registers-stores'})
        })
        .catch((error) => {
          validation.validationMessage(error)
        })
    },
    async update(id, data) {
      await StoreService.update(id, data)
        .then((response) => {
            this.store = response.data.data
            validation.validationMessage(response)

            router.push({name: 'registers-stores'})
        })
        .catch((error) => {
          validation.validationMessage(error)
        })
    },
  }
})
