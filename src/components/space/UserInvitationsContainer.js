import React, { useState, useEffect } from 'react';
import SpaceService from '../../services/SpaceService';
import SpaceCard from './spaceCard/SpaceCard';

function UserInvitationContainer() {
  const [userInvitation, setUserInvitations] = useState([]);

  useEffect(() => {
    getInvitations();
  }, []);
  async function getInvitations() {
    setUserInvitations(await SpaceService.getUserSpaces('invitations'));
  }
  return (
    <div>
      <h1>Invitations</h1>
      {userInvitation &&
        userInvitation.map((space) => (
          <SpaceCard key={space.space.id} space={space.space} />
        ))}
    </div>
  );
}

export default UserInvitationContainer;
