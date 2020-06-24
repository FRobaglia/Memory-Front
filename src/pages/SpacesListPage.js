import React, { useState, useEffect } from 'react';
import UserService from '../services/UserService';
import {useForm} from '../utils/forms';
import SpaceList from '../components/molecules/SpaceList/SpaceList';

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
          <label>Nom</label>
          <input type="text" name="lastName" value={values.lastName || ""} onChange={handleChange}/>
          <label>Prénom</label>
          <input type="text" name="firstName" value={values.firstName || ""} onChange={handleChange}/>
          <label>Date de naissance</label>
          <input type="date" name="dateBirth" value={values.dateBirth || ""} onChange={handleChange}/>
          <label>Date de deces</label>
          <input type="date" name="dateDeath" value={values.dateDeath || ""} onChange={handleChange}/>
          <label htmlFor="description">Qui etait ce ?</label>
          <textarea name="description" id="" cols="30" rows="10" value={values.description || ""} onChange={handleChange}/>
          <button type="submit">Creer un memory</button>
      </form>
      {userSpaces.map(memory => <SpaceList key={memory.space.id} memory={memory}></SpaceList>)}
    </div>
  )
}

export default SpacesListPage;