import axios from 'axios';
import SessionService from './SessionService'

class AxiosService {
  static setInterceptors() {
    axios.defaults.headers.common['Authorization'] = `Bearer ${SessionService.getAccessToken()}`
  }
}

export default AxiosService