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
    <section className="section section--invitation demandAcess">
      <div className="section__content">
        <h2>
          {account
            ? "Demandes d'accès aux espaces"
            : "Demandes d'accès a l'espace"}
        </h2>
        {account &&
          requestAccess &&
          requestAccess.map((space) => (
            <div className="line--member line--member--demand" key={space.id}>
              <div className="line--member__image">
                <img src={space.image.url} alt={space.firstName} />
              </div>
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
                        validateSubscriber(
                          space.id,
                          user.relation.id_subscriber
                        )
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
            <div
              className="line--member line--member--demand"
              key={subscriber.user.id}
            >
              <div className="line--member__image">
                <img
                  src={subscriber.user.image.url}
                  alt={subscriber.user.firstName}
                />
              </div>
              <div className="line--member__text">
                <p className="line--member__text__text">
                  {subscriber.user.firstName} {subscriber.user.lastName}
                </p>
                <p className="line--member__text__role">
                  {subscriber.relationDefunct}
                </p>
                <div className="line--member--demand__buttonGroup">
                  <button
                    className="button button--strong button--full  button--inForm line--member__button--accept"
                    onClick={() => validateSubscriber(spaceId, subscriber.id)}
                    type="button"
                  >
                    Accepter la demande
                  </button>
                  <button
                    className="button button--delte line--member__delte"
                    onClick={() => unvalidateSubscriber(spaceId, subscriber.id)}
                    type="submit"
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}

export default RequestAccessContainer;
