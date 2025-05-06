class MeService {
  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem('user'))
    return user.access_token
  }

  updateLocalUser(user) {
    this.removeUser()
    this.setUser(user)
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'))
  }

  getFirstName() {
    if (JSON.parse(localStorage.getItem('user'))) {
      const fullName = JSON.parse(localStorage.getItem('user')).name

      const firstName = fullName.split(" ")[0];
  
      return firstName
    }

    return '';
  }

  getName() {
    if (JSON.parse(localStorage.getItem('user'))) {
      const fullName = JSON.parse(localStorage.getItem('user')).name
  
      return fullName
    }

    return '';
  }

  setUser(user) {
    localStorage.setItem('user', JSON.stringify(user))
  }

  removeUser() {
    localStorage.removeItem('user')
  }
}

export default new MeService()
