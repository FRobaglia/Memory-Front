import axios from 'axios';
import StorageService from './StorageService';
import AxiosService from './AxiosService';

export default class SessionService {
  /**
   * Login - JWT
   */

  static async requestTokens(email, password) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}api/login_check`,
        {
          username: email,
          password,
        }
      );
      if (response && response.data) {
        SessionService.setTokens(response.data);
      }
    } catch (err) {
      console.error(`requestTokens : ${err}`);
    }
  }

  static async fetchUserData() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}api/account`
      );
      if (response && response.data) {
        const user = response.data;
        return user;
      }
    } catch (err) {
      console.error(`fetchUserData : ${err}`);
    }
  }

  static async refreshTokens() {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}api/token/refresh`,
        {
          refresh_token: this.getRefreshToken(),
        }
      );
      if (response && response.data) {
        SessionService.setTokens(response.data);
      }
    } catch (err) {
      console.error(`refreshTokens : ${err}`);
    }
  }

  static setTokens(tokenObject) {
    StorageService.setStorage('JWT', tokenObject.token);
    StorageService.setStorage('JWT_REFRESH', tokenObject.refresh_token);
    AxiosService.setInterceptors(); // Les tokens ayant changé, on met à jour le header Authorization dans Axios
  }

  static getAccessToken() {
    return StorageService.getStorage('JWT');
  }

  static getRefreshToken() {
    return StorageService.getStorage('JWT_REFRESH');
  }

  static clearTokens() {
    StorageService.deleteStorageItem('JWT', 'JWT_REFRESH');
  }

  /**
   * Create a new user account
   */
  static async createAccount(
    firstname,
    lastname,
    email,
    password,
    confirmPassword,
    errorMessage,
    setErrorMessage
  ) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}api/user/new`,
        {
          passwords: {
            initial: password,
            final: confirmPassword,
          },
          lastName: lastname,
          firstName: firstname,
          email,
        }
      );
      if (response && response.data) {
        console.log(response.data);
        console.log('nouvel espace creer');
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        // Vider l'objet errorMessage
        for (let key in errorMessage) {
          delete errorMessage[key];
        }
        errorMessage.err401 =
          'Un compte a déjà été créer avec cette adresse email';
        setErrorMessage(errorMessage);
      }
    }
  }
}
