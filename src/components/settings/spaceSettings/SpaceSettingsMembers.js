import React, { useContext } from 'react';
import SpaceContext from '../../../context/SpaceContext';

function SpaceSettingsMembers() {
  const { value } = useContext(SpaceContext);

  return (
    <div>
      <h1>Hello les membres</h1>
      {value.subscribers && value.subscribers.map((el) => console.log(el.user))}
      {value.subscribers &&
        value.subscribers.map((subscriber) => (
          <div key={subscriber.user.id}>
            <h3>
              <img
                src={subscriber.user.image.url}
                alt={subscriber.user.firstName}
                width="100"
                height="100"
              />
              {subscriber.user.firstName} {subscriber.user.lastName}
            </h3>
            <p>Relation: {subscriber.relationDefunct || 'a venir'}</p>
          </div>
        ))}
    </div>
  );
}

export default SpaceSettingsMembers;
