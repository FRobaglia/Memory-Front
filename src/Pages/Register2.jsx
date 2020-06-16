import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useForm from '../utils/useForm';
import validateAuth from '../utils/validateAuth';

function Register2() {
  // Custom hook useForm
  const [values, handleChange] = useForm();
  const [ errorMessage, setErrorMessage ] = useState({})

  const handleSubmit = (event) => {
    event.preventDefault();

    // if (emailValidator(values.email)) {
    // if (emailValidator(values)) {

    //   axios.post(`${process.env.REACT_APP_API_BASE_URL}api/user/new`,
    //     {
    //       passwords: {
    //         initial: values.password,
    //         final: values.confirmPassword,
    //       },
    //       lastName: values.lastname,
    //       firstName: values.firstname,
    //       email: values.email
    //     }
    //   ).then(response => {
    
    //     console.log('res', response)
    //     console.log('res data', response.data)
        
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // } else {
    //   console.log("Veuillez saisir un e-mail valide.");
    // }

    //  // Email must have "@"" and "."
    // const emailTest = /\S+@\S+\.\S+/;
    // // Password 
    // const passwordTest = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{6,}$/;
    // let errors = {};

    // if ( !emailTest.test(values.email) || )
  }

  // Email must have "@"" and "."
  // const emailValidator = (email) => {
  //   const re = /\S+@\S+\.\S+/;
  //   return re.test(email);
  // }

  // Post request

  const createAccount = () => {
      axios.post(`${process.env.REACT_APP_API_BASE_URL}api/user/new`,
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
      <p>ceci est le register 2</p>

      <form action="/register" method="post" onSubmit={handleSubmit}>
        <label>Nom</label>
        <input type="text" name="lastname" value={values.lastname || ""} onChange={handleChange} required/>
        <label>Prénom</label>
        <input type="text" name="firstname" value={values.firstname || ""} onChange={handleChange} required/>
        <label>Email</label>
        <input type="email" name="email" value={values.email || ""} onChange={handleChange} placeholder="test@example.com" required/>
        { errorMessage &&  <p>{errorMessage.email}</p>}
       
        <label>Mot de passe</label>
        <input type="password" name="password" value={values.password || ""} onChange={handleChange} required/>
        <p id="passwordError"></p>
        <label>Confirmer le mot de passe</label>
        <input type="password" name="confirmPassword" value={values.confirmPassword || ""} onChange={handleChange} required/>
        <button type="submit">S'inscrire</button>
      </form>

      <Link to='/'>Go back Home</Link>
      <Link to='/login'>Se connecter</Link>
    </div>
  )
}

export default Register2