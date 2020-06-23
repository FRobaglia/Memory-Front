import React, { useEffect, useState } from 'react';
import UserService from '../services/UserService';
import { Link } from 'react-router-dom';


function UserAccountPage() {
  
  const currentUserInfo = UserService.getUserInfo();
  const currentUserSpaces = UserService.getUserSpaces();
  console.log(currentUserInfo)
  console.log(currentUserSpaces)

  const [userInfos, setUserInfos] = useState([])
  
  useEffect(() => {
    UserService.getUserInfo()
    .then(response => setUserInfos(response.data))
  }, [])

  return(
    <div>
      <h2>{currentUserInfo.firstName}</h2>
    </div>
  )
}

export default UserAccountPage