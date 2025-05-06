import httpCommon from '@/helpers/http'

let http = httpCommon.http_backend

class PermissionService {
  async get() {
    return await http.get(`/permissions`)
  }
  async getRoles() {
    return await http.get(`/roles`)
  }
}

export default new PermissionService()
