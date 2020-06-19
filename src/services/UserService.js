import axios from 'axios';

class UserService {

  static async getUserInfo() {
    return await axios.get(`${process.env.REACT_APP_API_BASE_URL}api/account`)
  }

  static async getUserSpaces() {
    return await axios.get(`${process.env.REACT_APP_API_BASE_URL}api/user/spaces`)
  }

  static async createNewSpace(lastName, firstName, description, dateBirth, dateDeath) {
    return await axios.post(`${process.env.REACT_APP_API_BASE_URL}api/space/new`, {
      lastName,
      firstName,
      description,
      dateBirth,
      dateDeath,
    }).then(response => {
      console.log(response.data)
      console.log("nouvel espace creer")
    }).catch(err => {
      console.log(err)
    })
  }
}

export default UserService