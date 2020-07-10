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
      if (err.response.status === 401) {
        return 'INVALID_CREDENTIALS';
      }
      if (err.response.status === 400) {
        return 'NO_VALUES_FIELDS';
      }
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
    AxiosService.setInterceptors(this.getAccessToken()); // Les tokens ayant changé, on met à jour le header Authorization dans Axios
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
  static async createAccount(data, errorMessage, setErrorMessage) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}api/user/new`,
        data
      );
      if (response && response.data) {
        console.log(response.data);
        console.log('nouvel utilisateur créé !');
      }
    } catch (err) {
      console.log(err);
      if (err.response.status === 401) {
        // Vider l'objet errorMessage
        for (let key in errorMessage) {
          delete errorMessage[key];
        }
        errorMessage.err401 =
          'Un compte a déjà été créé avec cette adresse email';
        setErrorMessage(errorMessage);
      }
    }
  }

  static async editUser(data) {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}api/user/edit`,
        data
      );
      if (response && response.data) {
        console.log('Informations du profil modifiées');
        return response.data.account;
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async editPassword(data) {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}api/user/password/new`,
        data
      );
      if (response && response.data) {
        console.log('Mot de passe modifié');
        return response.data;
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async editUserImage(data) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}api/user/image/new`,
        data
      );
      if (response && response.data) {
        console.log(response.data);
        console.log('Image de profil modifiée');
      }
    } catch (err) {
      console.log(err);
    }
  }
}
