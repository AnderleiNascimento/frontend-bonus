import axios from 'axios'

export default {
  http_backend: axios.create({
    baseURL: import.meta.env.VITE_API_URL
  })
}
