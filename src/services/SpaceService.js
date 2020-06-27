import axios from 'axios';

class SpaceService {
  static async getUserSpaces() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}api/user/spaces`
      );
      if (response && response.data) {
        return response.data.spaces;
      }
    } catch (err) {
      console.error(err);
    }
  }

  static async createNewSpace(data) {
    // data est une instance de FormData()
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}api/space/new`,
        data
      );
      if (response && response.data) {
        console.log(response.data);
        console.log('nouvel espace créé');
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async getUnvalidatedSpaces() {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}api/spaces/unvalidated`
      );
      if (response && response.data) {
        return response.data.spaces;
      }
    } catch (err) {
      console.error(err);
    }
  }

  static async validateSpace(id) {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}api/spaces/${id}/validation`
      );
      if (response) {
        console.log(response && response.data);
        console.log(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  static async focusSpace(id) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}api/space/${id}`
      );
      if (response && response.data) {
        console.log('RUZE', response.data);
        return response.data;
      }
    } catch (err) {
      console.error('ERR', err);
    }
  }

  static errorMessageSpace(status) {
    let message = '';
    switch (status) {
      case 'SPACE_NOT_VALIDATED':
        message = "Votre espace n'a pas encore été validé par MEMORY";
        break;
      case 'SPACE_NOT_SUBSCRIBED':
        message = "Vous n'êtes pas membre de cet espace de mémoire";
        break;
      case 'SPACE_SUBSCRIBED_WAITING':
        message =
          "Votre demande d'accès est en cours de traitement par le manager de l'espace";
        break;
      case 'SPACE_INVITATION_WAITING':
        message = "Vous n'avez pas demander l'accès à cet espace de mémoire";
        break;
      default:
        message =
          'Vous rencontrer un problème pour accéder à cet espace? Contactez MEMORY';
    }
    return message;
  }
}

export default SpaceService;
