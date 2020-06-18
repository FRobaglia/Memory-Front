import React from 'react';
import UserService from '../services/UserService';


function Profile({isLoggedIn}) {
  
  const currentUserInfo = UserService.getUserInfo();
  const currentUserSpaces = UserService.getUserSpaces();
  console.log(currentUserInfo)
  console.log(currentUserSpaces)


  return(
    <div>
      <h1>{isLoggedIn}</h1>
      <h2>{currentUserInfo.firstName}</h2>
    </div>
  )
}

export default Profile