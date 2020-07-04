import axios from 'axios';

class SpaceService {
  static async getUserSpaces(parameter) {
    try {
      let response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}api/user/spaces`
      );
      if (response && response.data) {
        if (parameter === 'requestAccess') {
          const { spacesRequestAccess } = response.data;
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
          response = spacesRequestSort;
        } else {
          response = response.data;
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
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}api/space/${spaceId}/subscriber/${subscriberId}/invalidate`
      );
      if (response) {
        console.log('rar', response);
        return response;
      }
    } catch (err) {
      console.error('RAI', err);
    }
  }

  static async createInvitation(spaceId, data) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}api/space/${spaceId}/invitation`,
        data
      );
      if (response) {
        console.log(response);
        return response;
      }
    } catch (err) {
      console.error(err);
      if (err.response.status === 401) {
        return 'ALREADY_INVITED';
      }
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
      console.error('ERROR from focusSpaced', err);
      if (err.response.status === 401) {
        return err.response.data.status;
      }
    }
  }

  static errorMessageSpace(status) {
    let message = '';
    switch (status) {
      case 'SPACE_NOT_VALIDATED':
        message = "Cet espace n'a pas encore été validé par MEMORY";
        break;
      case 'SPACE_NOT_SUBSCRIBED':
        message =
          "Vous n'êtes pas membre de cet espace de mémoire. Faites une demande d'accès";
        break;
      case 'SPACE_SUBSCRIBED_WAITING':
        message =
          "Votre demande d'accès est en cours de traitement par le manager de l'espace";
        break;
      case 'SPACE_INVITATION_WAITING':
        message =
          "Vous avez été invité a rejoindre cet espace de recueillement. Merci d'indiquer la relation  avec le/la défunt(e)";
        break;
      default:
        message =
          'Vous rencontrer un problème pour accéder à cet espace? Contactez MEMORY';
    }
    return message;
  }

  static async subcribeToSpace(id, data) {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}api/space/${id}/subscribe`,
        data
      );
      if (response && response.data) {
        return response.data;
      }
    } catch (err) {
      if (err.response.status === 401) {
        return 'USER_ALREADY_REQUEST_SUBSCRIPTION';
      }
    }
  }
}

export default SpaceService;
