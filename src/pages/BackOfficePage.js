import React, { useContext, useEffect, useState } from 'react';
import UserContext from '../context/UserContext';
import SpaceService from '../services/SpaceService';
import SpaceList from '../components/molecules/spaceList/SpaceList';

function BackOfficePage() {
  const { user, setUser } = useContext(UserContext);
  const [unvalidatedSpaces, setUnvalidatedSpaces] = useState([]);
  const backOffice = true;

  useEffect(() => {
    async function getSpaces() {
      setUnvalidatedSpaces(await SpaceService.getUnvalidatedSpaces());
    }
    getSpaces();
  }, []);

  function validateSpace(id, i) {
    SpaceService.validateSpace(id);
    const arr = unvalidatedSpaces;
    arr.splice(i, 1);
    setUnvalidatedSpaces(arr);
  }
  // console.log(unvalidatedSpaces);
  return (
    <div>
      <p>{user.firstName}</p>
      {unvalidatedSpaces.map((memory) => (
        <SpaceList
          key={memory.id}
          memory={memory}
          backOffice={backOffice}
          validateSpace={validateSpace}
        />
      ))}
    </div>
  );
}

export default BackOfficePage;
