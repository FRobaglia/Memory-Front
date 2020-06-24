import React, { useEffect, useState } from 'react';
import UserService from '../services/UserService';

function UserAccountPage() {
  const [userInfos, setUserInfos] = useState([]);

  useEffect(() => {
    UserService.getUserInfo().then((response) => setUserInfos(response.data));
  }, []);

  return (
    <div>
      <h2>{userInfos.firstName}</h2>
    </div>
  );
}

export default UserAccountPage;
