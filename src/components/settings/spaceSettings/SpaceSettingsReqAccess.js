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
    console.log('pi', waitingSubscribers);
    getWaitingSubscribers();
  }, []);

  async function getWaitingSubscribers() {
    const subscribers = await SpaceService.getWaitingSubscribers(spaceId);
    setWaitingSubscribers(subscribers);
  }

  async function validateSubscriber(subscriberId) {
    await SpaceService.validateSubscriber(spaceId, subscriberId);
    getWaitingSubscribers();
  }

  async function unvalidateSubscriber(subscriberId) {
    await SpaceService.unvalidateSubscriber(spaceId, subscriberId);
    getWaitingSubscribers();
  }

  return (
    <section className="section section--invitation members">
      <div>
        <h2>Utilisateurs ayant fait une demande d'accès</h2>
        <ul>
          {waitingSubscribers instanceof Array
            ? waitingSubscribers.map((subscriber) => (
                <li key={subscriber.user.id}>
                  Nom: {subscriber.user.firstName}
                  <button
                    onClick={() => validateSubscriber(subscriber.id)}
                    type="button"
                  >
                    Accepter la demande
                  </button>
                  <button
                    onClick={() => unvalidateSubscriber(subscriber.id)}
                    type="button"
                  >
                    Refuser la demande
                  </button>
                </li>
              ))
            : waitingSubscribers}
        </ul>
      </div>
    </section>
  );
}

export default SpaceSettingsReqAccess;
