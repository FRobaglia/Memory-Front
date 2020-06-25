import React, { useState, useEffect } from 'react';
import UserService from '../services/UserService';
import {useForm, toFormData} from '../utils/forms';
import SpaceList from '../components/molecules/spaceList/SpaceList';
import UploadInput from '../components/atoms/uploadInput/UploadInput';
import moment from 'moment';

function SpacesListPage() {

  const [ values, handleChange ] = useForm();
  const [ userSpaces, setUserSpaces ] = useState([]);
  const [ errorMessage, setErrorMessage ] = useState();

  useEffect(() => {
    UserService.getUserSpaces()
    .then(response => setUserSpaces(response.data.spaces))
  },[])

  const Space = {
    space: {
      lastName: values.lastName,
      firstName: values.firstName,
      description: values.description,
      dateBirth: moment(values.dateBirth),
      dateDeath: moment(values.dateDeath)
    }
  };

  function createSpace(event){
    event.preventDefault();
    if(moment(values.dateBirth).isBefore(values.dateDeath)){
      setErrorMessage()
      setUserSpaces(userSpaces => [...userSpaces, Space]);
      const data = toFormData(values) // Nécessaire de créer une instance de FormData quand on a un formulaire avec des images
      UserService.createNewSpace(data)
    }
    else {
      setErrorMessage('La date de naissance ne peut pas etre avant la date décès');
    }
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
          { errorMessage &&  <p>{errorMessage}</p>}
          <label htmlFor="description">Qui etait ce ?</label>
          <textarea name="description" id="description" cols="30" rows="10" value={values.description || ""} onChange={handleChange}/>
          <button type="submit">Creer un memory</button>
      </form>
      {userSpaces.map((memory, index) => <SpaceList key={index} memory={memory}></SpaceList>)}
    </div>
  )
}

export default SpacesListPage;