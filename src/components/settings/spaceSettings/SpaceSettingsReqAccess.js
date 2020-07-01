import React, { useState, useEffect } from 'react';
import SpaceService from '../../../services/SpaceService';
import spaceId from '../../../utils/getSpaceID';

function SpaceSettingsReqAccess() {
  const [waitingSubscribers, setWaitingSubscribers] = useState(
    "Chargement des utilisateurs ayant fait une demande d'accès..."
  );

  useEffect(() => {
    console.log('pepe');
    getWaitingSubscribersList();
  }, []);

  async function getWaitingSubscribersList() {
    const subscribers = await SpaceService.getWaitingSubscribers(spaceId);
    setWaitingSubscribers(subscribers);
  }
  getWaitingSubscribersList();

  async function validateSubscriber(subscriberId) {
    await SpaceService.validateSubscriber(spaceId, subscriberId);
  }

  async function unvalidateSubscriber(subscriberId) {
    await SpaceService.unvalidateSubscriber(spaceId, subscriberId);
  }

  return (
    <div>
      <div>
        <h2>Utilisateurs ayant fait une demande d'accès</h2>
        <ul>
          {waitingSubscribers instanceof Array
            ? waitingSubscribers.map((user) => (
                <li key={user.id}>
                  Nom: {user.firstName}
                  <button
                    onClick={() => validateSubscriber(user.id)}
                    type="button"
                  >
                    Accepter la demande
                  </button>
                  <button
                    onClick={() => unvalidateSubscriber(user.id)}
                    type="button"
                  >
                    Refuser la demande
                  </button>
                </li>
              ))
            : waitingSubscribers}
        </ul>
      </div>
    </div>
  );
}

export default SpaceSettingsReqAccess;
