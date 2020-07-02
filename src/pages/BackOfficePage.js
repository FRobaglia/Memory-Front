import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';
import SpaceService from '../services/SpaceService';
import SpaceCard from '../components/space/spaceCard/SpaceCard';
import Forbidden from '../components/utilsTemplates/forbidden/Forbidden';

function BackOfficePage() {
  const { user } = useContext(UserContext);
  const [unvalidatedSpaces, setUnvalidatedSpaces] = useState([]);
  const isAdmin = user.roles.includes('ROLE_BACK_MANAGER');

  useEffect(() => {
    async function getSpaces() {
      setUnvalidatedSpaces(await SpaceService.getUnvalidatedSpaces());
    }
    if (isAdmin) {
      getSpaces();
    }
  }, []);

  function validateSpace(id, index) {
    SpaceService.validateSpace(id);
    unvalidatedSpaces.splice(index, 1);
    setUnvalidatedSpaces([...unvalidatedSpaces]);
  }

  if (!isAdmin)
    return (
      <Forbidden message="Vous n'avez PAS LE DROIT d'être ici, partez immédiatement !!!!!!! :(" />
    );

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
