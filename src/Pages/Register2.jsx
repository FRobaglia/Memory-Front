import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import useForm from '../utils/useForm';

function Register2() {
  // Custom hook useForm
  const [values, handleChange] = useForm();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (emailValidator(values.email)) {

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
    } else {
      console.log("Veuillez saisir un e-mail valide.");
    }

    
  }

  // Email must have "@"" and "."
  const emailValidator = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
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
        <label>Mot de passe</label>
        <input type="password" name="password" value={values.password || ""} onChange={handleChange} required/>
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