import React, { useState, useEffect } from 'react';
import UserService from '../services/UserService';
import useForm from '../utils/useForm';
import SpaceList from '../components/molecules/spaceList/SpaceList';

function SpacesListPage() {

  const [ values, handleChange ] = useForm();
  const [ userSpaces, setUserSpaces ] = useState([])

  useEffect(() => {
    UserService.getUserSpaces()
    .then(response => setUserSpaces(response.data.spaces))
  }, [userSpaces])

  function createSpace(event){
    event.preventDefault();
    UserService.createNewSpace(values.lastName, values.firstName, values.description, values.dateBirth, values.dateDeath)
  }

  return(
    <div>
      <form action="/spaces" method="post" onSubmit={createSpace}>
          <label htmlFor="lastName">Nom</label>
          <input type="text" name="lastName" id="lastName" value={values.lastName || ""} onChange={handleChange}/>
          <label htmlFor="firstName">Prénom</label>
          <input type="text" name="firstName" id="firstName" value={values.firstName || ""} onChange={handleChange}/>
          <label htmlFor="dateBirth">Date de naissance</label>
          <input type="date" name="dateBirth" id="dateBirth" value={values.dateBirth || ""} onChange={handleChange}/>
          <label htmlFor="dateDeath">Date de deces</label>
          <input type="date" name="dateDeath" id="dateDeath" value={values.dateDeath || ""} onChange={handleChange}/>
          <label htmlFor="description">Qui etait ce ?</label>
          <textarea name="description" id="description" cols="30" rows="10" value={values.description || ""} onChange={handleChange}/>
          <button type="submit">Creer un memory</button>
      </form>
      {userSpaces.map(memory => <SpaceList key={memory.space.id} memory={memory}></SpaceList>)}
    </div>
  )
}

export default SpacesListPage;