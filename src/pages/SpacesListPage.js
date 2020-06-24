import React, { useState, useEffect } from 'react';
import UserService from '../services/UserService';
import {useForm, toFormData} from '../utils/forms';
import SpaceList from '../components/molecules/spaceList/SpaceList';
import UploadInput from '../components/atoms/uploadInput/UploadInput';

function SpacesListPage() {

  const [ values, handleChange ] = useForm();
  const [ userSpaces, setUserSpaces ] = useState([])

  useEffect(() => {
    UserService.getUserSpaces()
    .then(response => setUserSpaces(response.data.spaces))
  }, [userSpaces])

  function createSpace(event){
    event.preventDefault();
    const data = toFormData(values) // Nécessaire de créer une instance de FormData quand on a un formulaire avec des images
    UserService.createNewSpace(data)
  }

  return(
    <div>
      <form action="/spaces" method="post" onSubmit={createSpace}>
          <UploadInput labelText='Photo du défunt' handleChange={handleChange} />
          <UploadInput labelText='Preuve acte de décès au format PDF' specificFieldName='proof' isMultiple={false} handleChange={handleChange} />
          <label>Nom</label>
          <input type="text" name="lastName" value={values.lastName || ""} onChange={handleChange}/>
          <label>Prénom</label>
          <input type="text" name="firstName" value={values.firstName || ""} onChange={handleChange}/>
          <label htmlFor="description">Qui etait ce ?</label>
          <textarea name="description" id="" cols="30" rows="10" value={values.description || ""} onChange={handleChange}/>
          <label>Date de naissance</label>
          <input type="date" name="dateBirth" value={values.dateBirth || ""} onChange={handleChange}/>
          <label>Date de deces</label>
          <input type="date" name="dateDeath" value={values.dateDeath || ""} onChange={handleChange}/>
          <button type="submit">Creer un memory</button>
      </form>
      {userSpaces.map(memory => <SpaceList key={memory.space.id} memory={memory}></SpaceList>)}
    </div>
  )
}

export default SpacesListPage;