import React, { useState, useEffect } from 'react';
import SpaceService from '../../services/SpaceService';

function RequestAccessContainer() {
  const [requestAccess, setRequestAccess] = useState([]);

  useEffect(() => {
    getInvitations();
  }, []);
  async function getInvitations() {
    setRequestAccess(await SpaceService.getUserSpaces('requestAccess'));
  }
  async function validateSubscriber(spaceId, subscriberId) {
    await SpaceService.validateSubscriber(spaceId, subscriberId);
  }

  async function unvalidateSubscriber(spaceId, subscriberId) {
    await SpaceService.unvalidateSubscriber(spaceId, subscriberId);
  }

  return (
    <div>
      <h1>Demande D'access</h1>
      {requestAccess &&
        requestAccess.map((space) => (
          <div key={space.id}>
            <h2>
              Espace de {space.firstName} {space.lastName}
            </h2>
            <div>
              {space.users.map((user) => (
                <div key={user.id}>
                  <p>
                    {user.firstName} {user.lastName}
                  </p>
                  <span>{user.relation.text}</span>
                  <button
                    onClick={() => validateSubscriber(space.id, user.id)}
                    type="button"
                  >
                    Accepter la demande
                  </button>
                  <button
                    onClick={() => unvalidateSubscriber(space.id, user.id)}
                    type="button"
                  >
                    Refuser la demande
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}

export default RequestAccessContainer;
