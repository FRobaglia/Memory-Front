import React, { useEffect, useState } from 'react';
import UserService from '../services/UserService';
import { Link } from 'react-router-dom';


function Profile({isLoggedIn}) {

  const [userInfos, setUserInfos] = useState([])
  
  useEffect(() => {
    UserService.getUserInfo()
    .then(response => setUserInfos(response.data))
  }, [])

  return(
    <div>
      <h2>{userInfos.firstName} {userInfos.lastName}</h2>
      <Link to='/spaces'><button>Mes espaces</button></Link>
    </div>
  )
}

export default Profile