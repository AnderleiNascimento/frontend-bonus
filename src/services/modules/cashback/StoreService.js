import http from '@/helpers/http';

let url = '/stores'

class StoreService {
  async get(data) {
    return await http.http_backend.get(`${url}`, { params: data })
  }
  async find(store) {
    return await http.http_backend.get(`${url}/${store}`)
  }
  async create(data) {
    return await http.http_backend.post(`${url}`, data)
  }
  async update(store, data) {
    return await http.http_backend.put(`${url}/${store}`, data)
  }
}

export default new StoreService()
