import axios from 'axios';
import AuthService from './AuthService'

class AxiosService {
  static setInterceptors() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${AuthService.getAccessToken()}`
  }
}

export default AxiosService