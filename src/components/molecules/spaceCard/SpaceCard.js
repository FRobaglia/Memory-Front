import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import SpaceContext from '../../../context/SpaceContext';

function SpaceCard({ space, backOffice, validateSpace, index }) {
  const { setValue } = useContext(SpaceContext);
  const [spaceRoute, setSpaceRoute] = useState();

  useEffect(() => {
    setSpaceRoute(() =>
      backOffice
        ? '/admin'
        : `/spaces/space/${space.firstName}-${space.lastName}-${space.id}`
    );
  }, []);

  return (
    <div>
      <Link
        to={{
          pathname: `${spaceRoute}`,
          state: { id: `${space.id}` },
        }}
      >
        <img width="300" src={space.image.url} alt={space.firstName} />
        <h1>
          {space.firstName} {space.lastName}
        </h1>
        <h2>
          Né le: {moment(space.dateBirth).format('D MMMM YYYY')}, Mort le:{' '}
          {moment(space.dateDeath).format('D MMMM YYYY')}
        </h2>
        <p>{space.description}</p>
        {backOffice ? (
          <button type="button" onClick={() => validateSpace(space.id, index)}>
            Valider l'espace
          </button>
        ) : (
          ''
        )}
      </Link>
    </div>
  );
}

export default SpaceCard;
