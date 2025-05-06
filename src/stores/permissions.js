import { defineStore } from 'pinia'
import PermissionService from '@/services/PermissionService'
import { useValidation } from '@/composables/useValidation'

const validation = useValidation()

export const usePermissionStore = defineStore('usePermissionStore', {
  id: 'usePermissionStore',
  state: () => ({
    permissions: [],
    roles: [],
  }),
  getters: {
    getPermissions(state) {
      return state.permissions
    },
    getRoles(state) {
      return state.roles
    },
  },
  actions: {
    async fetchPermissions() {
      await PermissionService.get()
        .then(async (response) => {
          if (response) {
            this.permissions = response.data.data
          }
        })
        .catch((error) => {
          validation.validationMessage(error)
        })
    },
    async fetchRoles() {
      await PermissionService.getRoles()
        .then(async (response) => {
          if (response) {
            this.roles = response.data.data
          }
        })
        .catch((error) => {
          validation.validationMessage(error)
        })
    }
  }
})