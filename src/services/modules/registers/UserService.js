import http from '@/helpers/http';

let url = '/users'

class UserService {
  async get(data) {
    return await http.http_backend.get(`${url}`, { params: data })
  }
  async find(user) {
    return await http.http_backend.get(`${url}/${user}`)
  }
  async create(data) {
    return await http.http_backend.post(`${url}`, data)
  }
  async update(user, data) {
    return await http.http_backend.put(`${url}/${user}`, data)
  }
  async remove(user) {
    return await http.http_backend.delete(`${url}/${user}`)
  }
}

export default new UserService()
