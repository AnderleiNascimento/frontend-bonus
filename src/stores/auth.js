import { defineStore } from 'pinia'

import AuthService from '@/services/AuthService'
import MeService from '@/services/MeService'
import TokenService from '@/services/TokenService'
import router from "@/router";

export const useAuthStore = defineStore('useAuthStore', {
  id: 'useAuthStore',
  state: () => ({
    me: {},
    isAlreadyFetchingAccessToken: false
  }),
  getters: {
    getMe(state) {
      return state.me
    },
    getIsAlreadyFetchingAccessToken(state) {
      return state.isAlreadyFetchingAccessToken
    }
  },
  actions: {
    async login(data) {
      await AuthService.login(data)
        .then(async (response) => {
          if (response) {
            TokenService.setToken(response.data.data)
            MeService.setUser(response.data.data.user)

            this.redirectUser()
          }
        })
        .catch((error) => {
          router.push({name: 'auth.sign-in'})
        })
    },
    async logout() {
      await AuthService.logout()
        .then(async (response) => {
          TokenService.removeToken()
          MeService.removeUser()

          router.push({name: 'auth.sign-in'})
        })
        .catch(async (e) => {
          TokenService.removeToken()
          MeService.removeUser()

          router.push({name: 'auth.sign-in'})
        })
    },
    redirectUser() {
      if (router.query && router.query.redirectedFrom != undefined) {
        router.push(`${router.query.redirectedFrom}`);
      }
      
      router.push("/");
    }
  }
})