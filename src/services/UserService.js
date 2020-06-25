import axios from 'axios';

class UserService {
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
}

export default UserService;
