import { defineStore } from 'pinia'

export const useToastStore = defineStore('useToastStore', {
  state: () => ({
    message: null,
    bg: null,
    title: null
  }),
  getters: {
    getMessage: (state) => state.message,
    getBg: (state) => state.bg,
  },
  actions: {
    setMessage(value, title = '', bg = 'bg-primary') {
      this.message = value
      this.title = title
      this.bg = bg
    },
    setBg(value) {
      this.bg = value
    },
  }
})
