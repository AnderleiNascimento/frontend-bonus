import http from '@/helpers/http';

let url = '/orders'

class OrderService {
  async get(data) {
    return await http.http_backend.get(`${url}`, { params: data })
  }
  async find(order) {
    return await http.http_backend.get(`${url}/${order}`)
  }
  async create(data) {
    return await http.http_backend.post(`${url}`, data)
  }
}

export default new OrderService()
