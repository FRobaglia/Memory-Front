import React from 'react';
import UserService from '../services/UserService';


function UserAccountPage() {
  
  const currentUserInfo = UserService.getUserInfo();
  const currentUserSpaces = UserService.getUserSpaces();
  console.log(currentUserInfo)
  console.log(currentUserSpaces)


  return(
    <div>
      <h2>{currentUserInfo.firstName}</h2>
    </div>
  )
}

export default UserAccountPage