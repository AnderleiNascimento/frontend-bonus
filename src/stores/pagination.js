import { defineStore } from 'pinia'

export const usePaginationStore = defineStore('usePaginationStore', {
  state: () => ({
    currentPage: 1,
    perPage: 15,
    totalRows: 0,
  }),

  getters: {
    getCurrentPage: (state) => state.currentPage,
    getPerPage: (state) => state.perPage,
    getTotalRows: (state) => state.totalRows,
  },
  actions: {
    setCurrentPage(page) {
      this.currentPage = page
    },
    setPerPage(perPage) {
      this.perPage = perPage
    },
    setTotalRows(total) {
      this.totalRows = total
    },
    resetPagination() {
      this.currentPage = 1
      this.perPage = 15
      this.totalRows = 0
    }
  }
})
