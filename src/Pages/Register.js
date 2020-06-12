import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register() {

  const [ firstname, setFirstname ] = useState('')
  const [ lastname, setLastname ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ confirmPassword, setConfirmPassword ] = useState('')


  return (
    <div>
      <p>ceci est le register</p>

      <form>
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