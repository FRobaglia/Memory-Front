import axios from 'axios';

class UserService {

  static getUserInfo() {
    return axios.get(`${process.env.REACT_APP_API_BASE_URL}api/account`).then(response => {
      console.log(response.data)
    }).catch(err => {
      console.error(err)
    })
  }

  static getUserSpaces() {
    return axios.get(`${process.env.REACT_APP_API_BASE_URL}api/user/spaces`)
  }
}

export default UserService