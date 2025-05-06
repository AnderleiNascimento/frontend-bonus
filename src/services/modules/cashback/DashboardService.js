import http from '@/helpers/http';

let url = '/dashboard'

class DashboardService {
  async getCashback(data) {
    return await http.http_backend.get(`${url}/cashback`, { params: data })
  }
  async getLoyalties(data) {
    return await http.http_backend.get(`${url}/loyalties`, { params: data })
  }
}

export default new DashboardService()
