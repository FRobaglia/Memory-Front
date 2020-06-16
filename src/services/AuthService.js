import axios from 'axios'

class AuthService {
  static setInterceptors() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.getAccessToken()}`
  }

  static getAccessToken() {
    return (
      localStorage.getItem('JWT')
    )
  }

  static getRefreshToken() {
    return (
      localStorage.getItem('JWT_REFRESH')
    )
  }

  static setTokens(tokenObject) {
    localStorage.setItem('JWT', tokenObject.token)
    localStorage.setItem('JWT_REFRESH', tokenObject.refresh_token)

    this.setInterceptors()
  }

  static clearTokens() {
    localStorage.removeItem('JWT')
    localStorage.removeItem('JWT_REFRESH')
  }
}

export default AuthService