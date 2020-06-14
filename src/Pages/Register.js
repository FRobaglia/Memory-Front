import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {

  const [ firstname, setFirstname ] = useState('')
  const [ lastname, setLastname ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ confirmPassword, setConfirmPassword ] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault();

    if (emailValidator(email)) {
      // axios.post
      console.log(`
        Firstname: ${firstname}
        Lastname: ${lastname}
        Email: ${email}
        Password: ${password}
        ConfirmPassword: ${confirmPassword}
      `);
    } else {
      console.log("Veuillez saisir un e-mail valide.");
    }
    
  }

  const emailValidator = (email) => {
    // const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  }

  return (
    <div>
      <p>ceci est le register</p>

      <form method="get" onSubmit={handleSubmit}>
        <label>Nom</label>
        <input type="text" name="lastname" value={lastname} onChange={e => setLastname(e.target.value)} required/>
        <label>Prénom</label>
        <input type="text" name="firstname" value={firstname} onChange={e => setFirstname(e.target.value)} required/>
        <label>Email</label>
        <input type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="test@example.com" required/>
        <label>Mot de passe</label>
        <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required/>
        <label>Confirmer le mot de passe</label>
        <input type="password" name="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required/>
        <button type="submit">S'inscrire</button>
      </form>

      <Link to='/'>Go back Home</Link>
      <Link to='/login'>Se connecter</Link>
    </div>
  )
}

export default Register