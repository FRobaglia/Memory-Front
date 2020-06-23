import React, { useContext } from 'react'
import { Link, Redirect } from "react-router-dom";
import AuthService from './../../../services/AuthService'
import { UserContext } from './../../../context/UserContext'
import useForm from './../../../utils/useForm'

function LoginForm() {

  const [ values, handleChange ] = useForm();
  const {user, setUser} = useContext(UserContext)

  if (user) return <Redirect to="/" /> // Si l'utilisateur est connecté, il ne peut pas voir la route /login (sans se déconnecter)

  const handleLogin = (event) => {
    event.preventDefault() // Empêcher le refresh de la page lors de l'envoi du formulaire
    persistSession()
  }
    
  async function persistSession() {
    await AuthService.requestTokens(values.email, values.password)
    setUser(await AuthService.fetchUserData())
  }

  return (
    <div>
      <form onSubmit={handleLogin}>
        <label>Adresse e-mail</label>
        <input type="mail" name="email" placeholder="test@example.com" value={values.email} onChange={handleChange}/>
        <label>Mot de passe</label>
        <input type="password" name="password" value={values.password} onChange={handleChange}/>
        <input type="submit" value="Me connecter" />
        <Link to='/'>Home</Link>
        <Link to='/register'>S'inscrire</Link>
      </form>
    </div>
      

  )
}

export default LoginForm