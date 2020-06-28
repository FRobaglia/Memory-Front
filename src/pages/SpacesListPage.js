import React, { useState, useEffect } from 'react';
import moment from 'moment';
import SpaceService from '../services/SpaceService';
import { useForm, toFormData } from '../utils/forms';
import SpaceCard from '../components/molecules/space/spaceCard/SpaceCard';
import UploadInput from '../components/atoms/UploadInput';

function SpacesListPage() {
  const [values, handleChange] = useForm();
  const [userSpaces, setUserSpaces] = useState([]);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    getSpaces();
  }, []);

  async function getSpaces() {
    setUserSpaces(await SpaceService.getUserSpaces());
  }

  async function createSpace(event) {
    event.preventDefault();
    if (moment(values.dateBirth).isBefore(values.dateDeath)) {
      setErrorMessage();
      const data = toFormData(values); // Nécessaire de créer une instance de FormData quand on a un formulaire avec des images
      await SpaceService.createNewSpace(data);
      getSpaces();
    } else {
      setErrorMessage(
        'La date de naissance ne peut pas etre avant la date décès'
      );
    }
  }

  return (
    <div>
      <form action="/spaces" method="post" onSubmit={createSpace}>
        <UploadInput
          labelText="Photo du défunt"
          specificFieldName="spaceImage"
          handleChange={handleChange}
        />
        <UploadInput
          labelText="Preuve acte de décès au format PDF"
          specificFieldName="spaceProof"
          restrictedFileTypes="application/pdf"
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
        <label htmlFor="relationDefunctText">
          Je suis son/sa...
          <textarea
            name="relationDefunctText"
            id="relationDefunctText"
            placeholder="ami depuis 20 ans / petit-fils / voisine..."
            cols="30"
            rows="10"
            value={values.relationDefunctText || ''}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Creer un espace</button>
      </form>
      {userSpaces &&
        userSpaces.map((space) => (
          <SpaceCard key={space.space.id} space={space.space} />
        ))}
    </div>
  );
}

export default SpacesListPage;
