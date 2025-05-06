import { defineStore } from 'pinia'

export const useSpinnerStore = defineStore('useSpinnerStore', {
  id: 'useSpinnerStore',
  state: () => ({
    show: false,
  }),
  getters: {
    getShow(state) {
      return state.show
    },
  },
  actions: {
    setShow(value) {
      this.show = value
    }
  }
})