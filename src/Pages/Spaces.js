import React, { useState, useEffect } from 'react';
import UserService from '../services/UserService';
import useForm from '../utils/useForm';

function Spaces() {

  const [ values, handleChange ] = useForm();
  const [ userSpaces, setUserSpaces ] = useState([])

  useEffect(() => {
    UserService.getUserSpaces()
    .then(response => setUserSpaces(response.data.spaces))
  }, [])

  console.log(userSpaces)

  function createSpace(event){
    event.preventDefault();
    UserService.createNewSpace(values.lastName, values.firstName, values.description, values.dateBirth, values.dateDeath)

    // Ajouter le nouvel au State mais erreur "memory is undefined" POURQUOI ?
    // const memory = event.target.value;
    // setUserSpaces(userSpaces => [...userSpaces, memory]);
  }

  function formatDate(date) {
    return new Date(date).toLocaleDateString('fr-FR');
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
      {userSpaces.map(memory =>
      <div key={memory.space.id}>
        <h1>{memory.space.firstName} {memory.space.lastName}</h1>
        <h2>Ne le: {formatDate(memory.space.dateBirth)}, Mort le: {formatDate(memory.space.dateDeath)}</h2>
        <p>{memory.space.description}</p>
      </div>
      )}
    </div>
  )
}

export default Spaces;