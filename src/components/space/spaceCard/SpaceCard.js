import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './spaceCard.scss';
import iconSettings from '../../../assets/svg/icons/icon-settings.svg';

function SpaceCard({ space, backOffice, validateSpace, index, role }) {
  const [spaceRoute, setSpaceRoute] = useState();

  useEffect(() => {
    setSpaceRoute(() =>
      backOffice
        ? '/admin'
        : `/space/${space.firstName}-${space.lastName}-${space.id}`
    );
  }, []);

  return (
    <div className="espace">
      {role === 'ACCESS_USER_MANAGER' && (
        <Link
          to={{
            pathname: `/space/${space.firstName}-${space.lastName}-${space.id}/settings/`,
            state: { id: `${space.id}` },
          }}
          className="spaceCard__settings--link"
        >
          <p className="spaceCard__settings--status">Manager de l'espace</p>
          <img
            src={iconSettings}
            alt="iconSettings"
            className="spaceCard__settings--icon"
          />
        </Link>
      )}
      <Link
        to={{
          pathname: `${spaceRoute}`,
          state: { id: `${space.id}` },
        }}
      >
        <div className="espace__hero  espace__hero--noDeco">
          <div className="espace__hero__image">
            <img
              src={space.image.url}
              alt={space.firstName}
              className="spaceCard__image"
            />
          </div>
          <p className="espace__hero__name">
            {space.firstName} {space.lastName}
          </p>
          {backOffice && (
            <button
              type="button"
              onClick={() => validateSpace(space.id, index)}
            >
              Valider l'espace
            </button>
          )}
        </div>
      </Link>
    </div>
  );
}

export default SpaceCard;
