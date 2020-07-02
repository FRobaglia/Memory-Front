import React, { useState, useEffect } from 'react';
import SpaceService from '../../../services/SpaceService';

function SpaceSettingsReqAccess() {
  const [waitingSubscribers, setWaitingSubscribers] = useState(
    "Chargement des utilisateurs ayant fait une demande d'accès..."
  );
  const spaceId = window.location.href
    .split('/')[4]
    .substring(window.location.href.split('/')[4].lastIndexOf('-') + 1);

  useEffect(() => {
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