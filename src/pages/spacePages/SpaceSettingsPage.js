import React, { useState, useEffect } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import SpaceService from '../../services/SpaceService';

function SpaceSettingsPage() {
  const spaceLocation = useLocation();
  const [deleteSuccess, setDeleteSuccess] = useState();
  const [waitingSubscribers, setWaitingSubscribers] = useState(
    "Chargement des utilisateurs ayant fait une demande d'accès..."
  );

  useEffect(() => {
    getWaitingSubscribers();
  }, []);

  async function deleteSpace(id) {
    setDeleteSuccess(await SpaceService.deleteSpace(id));
  }

  async function getWaitingSubscribers() {
    const subscribers = await SpaceService.getWaitingSubscribers(
      spaceLocation.state.id
    );
    setWaitingSubscribers(subscribers);
  }

  async function validateSubscriber(subscriberId) {
    await SpaceService.validateSubscriber(spaceLocation.state.id, subscriberId);
  }

  async function unvalidateSubscriber(subscriberId) {
    await SpaceService.unvalidateSubscriber(
      spaceLocation.state.id,
      subscriberId
    );
  }

  if (deleteSuccess) return <Redirect to="/" />;
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

      <div>
        <button
          type="button"
          onClick={() => deleteSpace(spaceLocation.state.id)}
        >
          Supprimer l'espace
        </button>
      </div>
    </div>
  );
}

export default SpaceSettingsPage;
