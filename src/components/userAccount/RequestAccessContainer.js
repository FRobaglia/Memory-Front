import React, { useState, useEffect } from 'react';
import SpaceService from '../../services/SpaceService';
import '../../styles/layout/line.scss';

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
    <section className="section section--invitation demandAcess">
      <div className="section__content">
        <h2>Demande d'accès reçues pour :</h2>
        {requestAccess &&
          requestAccess.map((space) => (
            <div className="line--member line--member--demand" key={space.id}>
              <div className="line--member__image">
                <img src={space.image.url} alt={space.firstName} />
              </div>
              <h3 className="group__Headline__text">
                l'espace de {space.firstName} {space.lastName}
              </h3>
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
        {!requestAccess && <p>Aucun utilisateur en attente d'accès</p>}
      </div>
    </section>
  );
}

export default RequestAccessContainer;
