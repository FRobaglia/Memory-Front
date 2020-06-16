import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useForm from '../utils/useForm';
import validateAuth from '../utils/validateAuth';

function Register2() {
  // Custom hook useForm
  const [ values, handleChange ] = useForm();
  const [ errorMessage, setErrorMessage ] = useState({})

  const handleSubmit = (event) => {
    event.preventDefault();

    if (Object.keys(validateAuth(values)).length === 0 ) 
    {
      createAccount();
      // console.log("Compte créé");
    }
    else 
    {
      setErrorMessage(validateAuth(values))
    }
  }

  // Post request to create an account
  async function createAccount () {
    await axios.post(`${process.env.REACT_APP_API_BASE_URL}api/user/new`,
      {
        passwords: {
          initial: values.password,
          final: values.confirmPassword,
        },
        lastName: values.lastname,
        firstName: values.firstname,
        email: values.email
      }
    ).then(response => {
      console.log('res', response)
      console.log('res data', response.data)
    }).catch(err => {
      console.log(err)
    })
  }

  return (
    <div>
      <p>ceci est le register 2 : Se créer un compte utilisateur</p>

      <form action="/register" method="post" onSubmit={handleSubmit}>
        <label>Nom</label>
        <input type="text" name="lastname" value={values.lastname || ""} onChange={handleChange}/>
        <label>Prénom</label>
        <input type="text" name="firstname" value={values.firstname || ""} onChange={handleChange}/>
        <label>Email</label>
        <input type="email" name="email" value={values.email || ""} onChange={handleChange} placeholder="test@example.com"/>
        { errorMessage &&  <p>{errorMessage.email}</p>}
       
        <label>Mot de passe</label>
        <input type="password" name="password" value={values.password || ""} onChange={handleChange}/>
        { errorMessage &&  <p>{errorMessage.password}</p>}
        <label>Confirmer le mot de passe</label>
        <input type="password" name="confirmPassword" value={values.confirmPassword || ""} onChange={handleChange}/>
        { errorMessage &&  <p>{errorMessage.confirmPassword}</p>}
        <button type="submit">S'inscrire</button>
      </form>

      <Link to='/'>Go back Home</Link>
      <Link to='/login'>Se connecter</Link>
    </div>
  )
}

export default Register2