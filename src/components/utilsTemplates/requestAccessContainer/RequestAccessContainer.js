import React, { useState, useEffect } from 'react';
import SpaceService from '../../../services/SpaceService';

function RequestAccessContainer({ account, spaceSettings, spaceId }) {
  const [requestAccess, setRequestAccess] = useState([]);
  const [waitingSubscribers, setWaitingSubscribers] = useState(
    "Chargement des utilisateurs ayant fait une demande d'accès..."
  );

  function requestData() {
    if (account) {
      getInvitations();
    } else {
      getWaitingSubscribers();
    }
  }

  useEffect(() => {
    requestData();
  }, []);

  async function getInvitations() {
    setRequestAccess(await SpaceService.getUserSpaces('requestAccess'));
  }
  async function getWaitingSubscribers() {
    const subscribers = await SpaceService.getWaitingSubscribers(spaceId);
    setWaitingSubscribers(subscribers);
  }
  async function validateSubscriber(idSpace, subscriberId) {
    await SpaceService.validateSubscriber(idSpace, subscriberId);
    requestData();
  }

  async function unvalidateSubscriber(idSpace, subscriberId) {
    await SpaceService.unvalidateSubscriber(idSpace, subscriberId);
    requestData();
  }

  return (
    <div>
      <h1>
        {account
          ? "Demandes d'accès aux espaces"
          : "Demandes d'accès a l'espace"}
      </h1>
      {account &&
        requestAccess &&
        requestAccess.map((space) => (
          <div key={space.id}>
            <h2>
              Espace de {space.firstName}
              {space.lastName}
            </h2>
            <div>
              {space.users.map((user) => (
                <div key={user.id}>
                  <p>
                    {user.firstName}
                    {user.lastName}
                  </p>
                  <span>{user.relation.text}</span>
                  <button
                    onClick={() =>
                      validateSubscriber(space.id, user.relation.id_subscriber)
                    }
                    type="button"
                  >
                    Accepter la demande
                  </button>
                  <button
                    onClick={() =>
                      unvalidateSubscriber(
                        space.id,
                        user.relation.id_subscriber
                      )
                    }
                    type="button"
                  >
                    Refuser la demande
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      {spaceSettings &&
        waitingSubscribers instanceof Array &&
        waitingSubscribers.map((subscriber) => (
          <li key={subscriber.user.id}>
            Nom: {subscriber.user.firstName}
            <button
              onClick={() => validateSubscriber(spaceId, subscriber.id)}
              type="button"
            >
              Accepter la demande
            </button>
            <button
              onClick={() => unvalidateSubscriber(spaceId, subscriber.id)}
              type="button"
            >
              Refuser la demande
            </button>
          </li>
        ))}
    </div>
  );
}

export default RequestAccessContainer;
