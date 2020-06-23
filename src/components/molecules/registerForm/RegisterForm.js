import React, { useState, useContext } from 'react';
import { Link, Redirect } from 'react-router-dom';
import useForm from './../../../utils/useForm';
import validateAuth from './../../../utils/validateAuth';
import SessionService from './../../../services/SessionService'
import { UserContext } from './../../../context/UserContext'

function RegisterForm() {
  // Custom hook useForm
  const [ values, handleChange ] = useForm();
  const [ errorMessage, setErrorMessage ] = useState({})
  const {user} = useContext(UserContext)

  if (user) return <Redirect to="/" /> // Si l'utilisateur est connecté, il ne peut pas voir la route /login (sans se déconnecter)

  const handleSubmit = (event) => {
    event.preventDefault();
 
    if (Object.keys(validateAuth(values)).length === 0) {
      setErrorMessage({})
      SessionService.createAccount(values.firstname, values.lastname, values.email, values.password, values.confirmPassword, errorMessage, setErrorMessage)
    } else {
      setErrorMessage(validateAuth(values))
    }
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

        { errorMessage &&  <p>{errorMessage.err401}</p>}
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

export default RegisterForm