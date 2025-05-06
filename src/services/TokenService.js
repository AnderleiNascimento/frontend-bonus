class TokenService {
    getLocalAccessToken() {
      const user = JSON.parse(localStorage.getItem('token'))
      return user.access_token
    }
  
    updateLocalAccessToken(token) {
      this.removeToken()
      this.setToken(token)
    }
  
    getToken() {
      return JSON.parse(localStorage.getItem('token'))
    }
  
    setToken(token) {
      localStorage.setItem('token', JSON.stringify(token))
    }
  
    removeToken() {
      localStorage.removeItem('token')
    }
  }
  
  export default new TokenService()
  