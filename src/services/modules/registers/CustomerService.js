import http from '@/helpers/http';

let url = '/customers'

class CustomerService {
  async get(data) {
    return await http.http_backend.get(`${url}`, { params: data })
  }
  async find(customer) {
    return await http.http_backend.get(`${url}/${customer}`)
  }
  async create(data) {
    return await http.http_backend.post(`${url}`, data)
  }
  async update(customer, data) {
    return await http.http_backend.put(`${url}/${customer}`, data)
  }
}

export default new CustomerService()
