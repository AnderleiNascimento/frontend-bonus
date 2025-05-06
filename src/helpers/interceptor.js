import TokenService from '@/services/TokenService'
import { useAuthStore } from '@/stores/auth'
import axiosInstance from '@/helpers/http'

const setup = () => {
  for (const instance in axiosInstance) {
    axiosInstance[instance].interceptors.request.use(
      (config) => {
        if (config.customContentType) {
          config.headers['Content-Type'] = config.customContentType
        } else {
          config.headers['Content-Type'] = 'application/json'
        }

        if (!['/auth/login', '/auth/reset-password'].includes(config.url)) {
          const token = TokenService.getLocalAccessToken()

          if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
          }
        }

        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )

    axiosInstance[instance].interceptors.response.use(
      (res) => {
        return res
      },
      async (error) => {
        const originalConfig = error.config

        if (
          originalConfig != undefined &&
          !['/auth/login', '/auth/reset-password'].includes(originalConfig.url) &&
          error.response
        ) {
          if (error.response.status === 401 && !originalConfig._retry) {
            if (!useAuthStore().isAlreadyFetchingAccessToken) {
              originalConfig._retry = true
              await useAuthStore().logout()

              return axiosInstance[instance](originalConfig)
            }
          }
        }

        return Promise.reject(error)
      }
    )
  }
}

export default setup
