import { defineStore } from 'pinia'
import UserService from '@/services/modules/registers/UserService'
import router from "@/router";
import { usePaginationStore } from '@/stores/pagination'
import { useValidation } from '@/composables/useValidation'
import { useSpinnerStore } from '@/stores/spinner'

const spinner = useSpinnerStore()
const pagination = usePaginationStore()
const validation = useValidation()

export const useUsersStore = defineStore('useUsersStore', {
  id: 'useUsersStore',
  state: () => ({
    user: {},
    users: []
  }),
  getters: {
    getUser(state) {
      return state.user
    },
    getUsers(state) {
      return state.users
    }
  },
  actions: {
    async get(data) {
      spinner.setShow(true)

      await UserService.get(data)
        .then((response) => {
          this.users = response.data.data
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
      await UserService.find(id)
        .then(async (response) => {
          if (response.status === 200) {
            this.user = response.data.data
          }
        })
        .catch((e) => {
          validation.validationMessage(error)
        })
    },

    async create(data) {
      await UserService.create(data)
        .then((response) => {
            this.user = response.data.data
            validation.validationMessage(response)

            router.push({name: 'registers-users'})
        })
        .catch((error) => {
          validation.validationMessage(error)
        })
    },
    async update(id, data) {
      await UserService.update(id, data)
        .then((response) => {
            this.user = response.data.data
            validation.validationMessage(response)

            router.push({name: 'registers-users'})
        })
        .catch((error) => {
          validation.validationMessage(error)
        })
    },
    async remove(id) {
      await UserService.remove(id)
        .then((response) => {
          validation.validationMessage(response)
          const itemIndex = this.users.findIndex((data) => data.id === id)
          this.users.splice(itemIndex, 1)
        })
        .catch((e) => {
          validation.validationMessage(error)
        })
    },
  }
})
