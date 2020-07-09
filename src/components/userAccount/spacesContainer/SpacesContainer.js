import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SpaceService from '../../../services/SpaceService';
import SpaceCard from '../../space/spaceCard/SpaceCard';
import './spacesContainer.scss';

function SpacesContainer() {
  const [userSpaces, setUserSpaces] = useState([]);

  useEffect(() => {
    getSpaces();
  }, []);

  async function getSpaces() {
    const data = await SpaceService.getUserSpaces();
    setUserSpaces(data.spaces);
  }

  return (
    <section className="section section--espaces">
      <h2>Tous mes espaces</h2>
      <Link
        to="/create"
        className="button button--full button--full--noPadding button--creEspace--top button-link button__link--create"
      >
        + Créer un espace
      </Link>

      {userSpaces && userSpaces.length !== 0 ? (
        userSpaces.map((space) => (
          <SpaceCard
            key={space.space.id}
            space={space.space}
            role={space.role.role}
          />
        ))
      ) : (
        <p className="text text__noContent">
          Vous ne faites parti d'aucun espace.
        </p>
      )}
    </section>
  );
}

export default SpacesContainer;
