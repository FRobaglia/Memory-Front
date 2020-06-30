import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SpaceService from '../../services/SpaceService';
// import spaceID from '../../utils/getSpaceID';

function SpaceSettingsReqAccess({ space }) {
  // const spaceLocation = useLocation();
  // const [spaceID, setSpaceID] = useState(space.id);
  // const spaceID = space.id;
  const [waitingSubscribers, setWaitingSubscribers] = useState(
    "Chargement des utilisateurs ayant fait une demande d'accès..."
  );
  // console.log(spaceID);
  // console.log('Req', space.id);

  useEffect(() => {
    // setSpaceID(space.id);
    // const spaceID = space.id;
    getWaitingSubscribersList();
  }, []);

  async function getWaitingSubscribersList() {
    const subscribers = await SpaceService.getWaitingSubscribers(space);
    setWaitingSubscribers(subscribers);
  }

  async function validateSubscriber(subscriberId) {
    await SpaceService.validateSubscriber(space, subscriberId);
  }

  async function unvalidateSubscriber(subscriberId) {
    await SpaceService.unvalidateSubscriber(space, subscriberId);
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
