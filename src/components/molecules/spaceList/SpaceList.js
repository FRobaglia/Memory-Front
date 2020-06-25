import React from 'react';
import moment from 'moment';

function SpaceList({ memory, backOffice, validateSpace }) {
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
        <button type="button" onClick={() => validateSpace(memory.id)}>
          Valider l'espace
        </button>
      ) : (
        ''
      )}
    </div>
  );
}

export default SpaceList;
