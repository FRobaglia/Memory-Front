import React from 'react';
import moment from 'moment';

function SpaceCard({ space }) {
  return (
    <div>
      <img
        width="300"
        src={space.space.image.url}
        alt={space.space.firstName}
      />
      <h1>
        {space.space.firstName} {space.space.lastName}
      </h1>
      <h2>
        Né le: {moment(space.space.dateBirth).format('D MMMM YYYY')}, Mort le:{' '}
        {moment(space.space.dateDeath).format('D MMMM YYYY')}
      </h2>
      <p>{space.space.description}</p>
    </div>
  );
}

export default SpaceCard;
