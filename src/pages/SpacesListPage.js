import React, { useState, useEffect } from 'react';
import moment from 'moment';
import UserService from '../services/UserService';
import { useForm, toFormData } from '../utils/forms';
import SpaceList from '../components/molecules/spaceList/SpaceList';
import UploadInput from '../components/atoms/uploadInput/UploadInput';

function SpacesListPage() {
  const [values, handleChange] = useForm();
  const [userSpaces, setUserSpaces] = useState([]);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    async function getSpaces() {
      setUserSpaces(await UserService.getUserSpaces());
    }
    getSpaces();
  }, []);

  const Space = {
    space: {
      lastName: values.lastName,
      firstName: values.firstName,
      description: values.description,
      dateBirth: moment(values.dateBirth),
      dateDeath: moment(values.dateDeath),
    },
  };

  function createSpace(event) {
    event.preventDefault();
    if (moment(values.dateBirth).isBefore(values.dateDeath)) {
      setErrorMessage();
      setUserSpaces(() => [...userSpaces, Space]);
      const data = toFormData(values); // Nécessaire de créer une instance de FormData quand on a un formulaire avec des images
      UserService.createNewSpace(data);
    } else {
      setErrorMessage(
        'La date de naissance ne peut pas etre avant la date décès'
      );
    }
  }

  return (
    <div>
      <form action="/spaces" method="post" onSubmit={createSpace}>
        <UploadInput labelText="Photo du défunt" handleChange={handleChange} />
        <UploadInput
          labelText="Preuve acte de décès au format PDF"
          specificFieldName="proof"
          isMultiple={false}
          handleChange={handleChange}
        />
        <label htmlFor="lastName">
          Nom
          <input
            type="text"
            name="lastName"
            id="lastName"
            value={values.lastName || ''}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="firstName">
          Prénom
          <input
            type="text"
            name="firstName"
            id="firstName"
            value={values.firstName || ''}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="dateBirth">
          Date de naissance
          <input
            type="date"
            name="dateBirth"
            id="dateBirth"
            value={values.dateBirth || ''}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="dateDeath">
          Date de deces
          <input
            type="date"
            name="dateDeath"
            id="dateDeath"
            value={values.dateDeath || ''}
            onChange={handleChange}
          />
        </label>
        {errorMessage && <p>{errorMessage}</p>}
        <label htmlFor="description">
          Qui etait ce ?
          <textarea
            name="description"
            id="description"
            cols="30"
            rows="10"
            value={values.description || ''}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Creer un memory</button>
      </form>
      {userSpaces.map((memory, index) => (
        <SpaceList key={index} memory={memory} />
      ))}
    </div>
  );
}

export default SpacesListPage;
