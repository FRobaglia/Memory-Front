import React, { useState, useEffect } from 'react';
import SpaceService from '../../services/SpaceService';
import SpaceCard from './spaceCard/SpaceCard';

function RequestAccessContainer() {
  const [requestAccess, setRequestAccess] = useState([]);

  useEffect(() => {
    getInvitations();
  }, []);
  async function getInvitations() {
    setRequestAccess(await SpaceService.getUserSpaces('requestAccess'));
  }
  return (
    <div>
      <h1>Invitations</h1>
      {requestAccess &&
        requestAccess.map((space) => (
          <SpaceCard key={space.space.id} space={space.space} />
        ))}
    </div>
  );
}

export default RequestAccessContainer;
