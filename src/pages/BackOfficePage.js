import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';
import SpaceService from '../services/SpaceService';
import SpaceCard from '../components/space/spaceCard/SpaceCard';

function BackOfficePage() {
  const { user } = useContext(UserContext);
  const [unvalidatedSpaces, setUnvalidatedSpaces] = useState([]);

  useEffect(() => {
    async function getSpaces() {
      setUnvalidatedSpaces(await SpaceService.getUnvalidatedSpaces());
    }
    getSpaces();
  }, []);

  function validateSpace(id, index) {
    SpaceService.validateSpace(id);
    unvalidatedSpaces.splice(index, 1);
    setUnvalidatedSpaces([...unvalidatedSpaces]);
  }

  return (
    <div>
      <p>{user.firstName}</p>
      {unvalidatedSpaces.map((space, index) => (
        <SpaceCard
          key={space.id}
          index={index}
          space={space}
          backOffice
          validateSpace={validateSpace}
        />
      ))}
    </div>
  );
}

export default BackOfficePage;
