import http from '@/helpers/http';

let url = '/cashbacks'

class CashbackService {
  async get(data) {
    return await http.http_backend.get(`${url}`, { params: data })
  }
}

export default new CashbackService()
