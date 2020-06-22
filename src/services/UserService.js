import axios from 'axios';

class UserService {

  static async getUserSpaces() {
    return await axios.get(`${process.env.REACT_APP_API_BASE_URL}api/user/spaces`)
  }

  async createNewSpace(lastName, firstName, description, dateBirth, dateDeath) {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}api/space/new`, {
        lastName: lastName,
        firstName: firstName,
        description: description,
        dateBirth: dateBirth,
        dateDeath: dateDeath,
      });
      if(response && response.data) {
        console.log(response.data)
        console.log("nouvel espace creer")
      }
    }
    catch(err) {
      console.log(err)
    }
  }
}

export default UserService