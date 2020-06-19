import axios from 'axios'
import StorageService from './StorageService'

export default class AuthService {
  static setInterceptors() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${this.getAccessToken()}`
  }

  static async requestTokens(email, password) {
    await axios.post(`${process.env.REACT_APP_API_BASE_URL}api/login_check`, {
      username: email,
      password: password
    }).then(response => {
      AuthService.setTokens(response.data)
    }).catch(err => {
      console.error(err)
    })
  }

  static async requestUserData() {
    return ( 
      await axios.get(`${process.env.REACT_APP_API_BASE_URL}api/account`).then(response => {
        console.log("Données de l'utilisateur récupérées.")
        const user = response.data
        return user
      }).catch(err => {
        console.error(err)
      })
    )
  }

  static async refreshTokens() {
    await axios.post(`${process.env.REACT_APP_API_BASE_URL}api/token/refresh`, {
      refresh_token: this.getRefreshToken()
    }).then(response => {
      AuthService.setTokens(response.data)
    }).catch(err => {
      console.error(err)
    })
  }

  static setTokens(tokenObject) {
    StorageService.setStorage('JWT', tokenObject.token)
    StorageService.setStorage('JWT_REFRESH', tokenObject.refresh_token)
    this.setInterceptors() // Les tokens ayant changé, on met à jour le header Authorization dans Axios
  }

  static getAccessToken() {
    return (
      StorageService.getStorage('JWT')
    )
  }

  static getRefreshToken() {
    return (
      StorageService.getStorage('JWT_REFRESH')
    )
  }

  static clearTokens() {
    StorageService.deleteStorageItem('JWT', 'JWT_REFRESH')
  }
}