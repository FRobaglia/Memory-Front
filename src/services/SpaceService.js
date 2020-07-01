import axios from 'axios';

class SpaceService {
  static async getUserSpaces(parameter) {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}api/user/spaces`
      );
      if (response && response.data) {
        if (parameter === 'spaces') {
          response = response.data.spaces;
        } else if (parameter === 'invitations') {
          response = response.data.invitations;
        } else if (parameter === 'requestAccess') {
          const spacesRequestAccess = response.data;
          const spacesRequestSort = [];
          spacesRequestAccess.forEach((request) => {
            if (!spacesRequestSort.find((x) => x.id === request.space.id)) {
              request.space.users = [];
              spacesRequestSort.push(request.space);
            }
            const index = spacesRequestSort.findIndex(
              (x) => x.id === request.space.id
            );

            request.user.relation = {
              text: request.relationDefunct,
              dateCreation: request.dateCreation,
            };

            spacesRequestSort[index].users.push(request.user);
          });

          response = response.data.spaces;
          console.log(response);
        }
        return response;
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

  static async getWaitingSubscribers(id) {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}api/space/${id}/subscribers/waiting`
      );
      if (response) {
        if (response.data.subscribers.length === 0)
          return "Aucun utilisateur en attente d'accès";
        return response.data.subscribers;
      }
    } catch (err) {
      console.error(err);
    }
  }

  static async validateSubscriber(spaceId, subscriberId) {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}api/space/${spaceId}/subscriber/${subscriberId}/validate`
      );
      if (response) {
        console.log(response);
      }
    } catch (err) {
      console.error(err);
    }
  }

  static async unvalidateSubscriber(spaceId, subscriberId) {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}api/space/${spaceId}/subscriber/${subscriberId}/unvalidate`
      );
      if (response) {
        console.log(response);
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

  static async deleteSpace(id) {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}api/space/${id}/delete`
      );
      if (response) {
        console.log(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  static async editSpace(id) {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}api/space/${id}/edit`
      );
      if (response) {
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
