import httpCommon from '@/helpers/http'

let url = '/auth'
let http = httpCommon.http_backend

class AuthService {
  async login(data) {
    return await http.post(`${url}/login`, data)
  }
  async logout() {
    return await http.post(`${url}/logout`)
  }
}

export default new AuthService()
