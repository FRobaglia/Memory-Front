import React, { useState, useEffect } from 'react';
import UserService from '../services/UserService';
import useForm from '../utils/useForm';
import SpaceList from '../components/molecules/spaceList/SpaceList';
import moment from 'moment';

function SpacesListPage() {

  const [ values, handleChange ] = useForm();
  const [ userSpaces, setUserSpaces ] = useState([]);
  const [ errorMessage, setErrorMessage ] = useState();

  useEffect(() => {
    UserService.getUserSpaces()
    .then(response => setUserSpaces(response.data.spaces))
  }, [])

  function createSpace(event){
    event.preventDefault();
    if(moment(values.dateBirth).isBefore(values.dateDeath)){
      setErrorMessage()
      UserService.createNewSpace(values.lastName, values.firstName, values.description, moment(values.dateBirth), moment(values.dateDeath))
    }
    else {
      setErrorMessage('La date de naissance ne peut pas etre avant la date décès');
    }
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
          { errorMessage &&  <p>{errorMessage}</p>}
          <label htmlFor="description">Qui etait ce ?</label>
          <textarea name="description" id="description" cols="30" rows="10" value={values.description || ""} onChange={handleChange}/>
          <button type="submit">Creer un memory</button>
      </form>
      {userSpaces.map(memory => <SpaceList key={memory.space.id} memory={memory}></SpaceList>)}
    </div>
  )
}

export default SpacesListPage;