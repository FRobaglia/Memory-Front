import axios from 'axios';

class AxiosService {
  static setInterceptors(accessToken) {
    axios.defaults.headers.common[['Authorization']] = `Bearer ${accessToken}`;
  }
}

export default AxiosService;
