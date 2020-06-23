import React from 'react';
import moment from 'moment'

function SpaceList({memory}) {
  
  return (
    <div>
      <h1>{memory.space.firstName} {memory.space.lastName}</h1>
      <h2>Né le: {moment(memory.space.dateBirth).format('D MMMM YYYY')}, Mort le: {moment(memory.space.dateDeath).format('D MMMM YYYY')}</h2>
      <p>{memory.space.description}</p>
    </div>
  )
}

export default SpaceList