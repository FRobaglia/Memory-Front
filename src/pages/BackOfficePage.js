import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';
import SpaceService from '../services/SpaceService';
import SpaceCard from '../components/molecules/spaceCard/SpaceCard';

function BackOfficePage() {
  const { user } = useContext(UserContext);
  const [unvalidatedSpaces, setUnvalidatedSpaces] = useState([]);
  const backOffice = true;

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
      {unvalidatedSpaces.map((memory, index) => (
        <SpaceCard
          key={memory.id}
          index={index}
          memory={memory}
          backOffice={backOffice}
          validateSpace={validateSpace}
        />
      ))}
    </div>
  );
}

export default BackOfficePage;
