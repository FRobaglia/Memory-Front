import React from 'react';
import formatDate from './../../utils/date';

function SpaceList({memory}) {
  
  return (
    <div>
      <h1>{memory.space.firstName} {memory.space.lastName}</h1>
      <h2>Ne le: {formatDate(memory.space.dateBirth)}, Mort le: {formatDate(memory.space.dateDeath)}</h2>
      <p>{memory.space.description}</p>
    </div>
  )
}

export default SpaceList