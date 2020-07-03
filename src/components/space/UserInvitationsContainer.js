import React, { useState, useEffect } from 'react';
import SpaceService from '../../services/SpaceService';
import SpaceCard from './spaceCard/SpaceCard';

function UserInvitationContainer() {
  const [userInvitation, setUserInvitations] = useState([]);

  useEffect(() => {
    getInvitations();
  }, []);
  async function getInvitations() {
    const data = await SpaceService.getUserSpaces();
    setUserInvitations(data.invitations);
  }
  return (
    <div>
      <h1>Invitations</h1>
      {userInvitation &&
        userInvitation.map(
          (space) => <SpaceCard key={space.id} space={space.space} />
          /* console.log(space) */
        )}
    </div>
  );
}

export default UserInvitationContainer;
