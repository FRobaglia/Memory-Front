import React from 'react';
import moment from 'moment';

function SpaceList({ space, backOffice, validateSpace, index }) {
  return (
    <div>
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
    </div>
  );
}

export default SpaceList;
