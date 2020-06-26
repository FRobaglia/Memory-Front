import React from 'react';
import moment from 'moment';

function SpaceList({ memory, backOffice, validateSpace, index }) {
  return (
    <div>
      <h1>
        {memory.firstName} {memory.lastName}
      </h1>
      <h2>
        Né le: {moment(memory.dateBirth).format('D MMMM YYYY')}, Mort le:{' '}
        {moment(memory.dateDeath).format('D MMMM YYYY')}
      </h2>
      <p>{memory.description}</p>
      {backOffice ? (
        <button type="button" onClick={() => validateSpace(memory.id, index)}>
          Valider l'espace
        </button>
      ) : (
        ''
      )}
    </div>
  );
}

export default SpaceList;
