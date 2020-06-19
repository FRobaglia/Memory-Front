import React, { useState, useEffect, useContext }from 'react'
import { Redirect, Link } from "react-router-dom";
import AuthService from '../services/AuthService.js'
import { UserContext } from './../UserContext'



function Login({ isLoggedIn, setIsLoggedIn }) {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [redirect, setRedirect] = useState("/login")
  const {user, setUser} = useContext(UserContext)

  useEffect(() => {
    // if (user !== null) {
    //   return setRedirect("/")
    // }
    if (AuthService.getRefreshToken() !== null) {
      AuthService.refreshTokens()
      persistSession()
    } else {
      console.log("Aucun refresh token trouvé, pas d'autologin possible.")
    }
  }, [])

  const handleLogin = (event) => {
    event.preventDefault() // Empêcher le refresh de la page lors de l'envoi du formulaire
    AuthService.requestTokens(email, password) // Faire la requête API pour récupérer les JWT token avec les identifiants soumis
    persistSession()
  }

  const persistSession = () => {
    AuthService.requestUserData().then(user => {
      setUser(user)
      // console.log(`L'utilisateur ${user.firstName} ${user.lastName} est connecté.`)
      console.log(`L'utilisateur est connecté.`)
      return setRedirect("/")
    })
  }

  return (
    <div>
      <h1>Status: {isLoggedIn}</h1>
      <form onSubmit={handleLogin}>
        <label>Adresse e-mail</label>
        <input type="mail" name="email" placeholder="test@example.com" value={email} onChange={e => setEmail(e.target.value)}/>
        <label>Mot de passe</label>
        <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
        <input type="submit" value="Me connecter" />
        <Link to='/'>Home</Link>
        <Link to='/register'>S'inscrire</Link>
        <Redirect to={redirect} />

      </form>
      {/* <button onClick={() => {AuthService.clearTokens(); setIsLoggedIn('not logged in')}}>logout</button> */}
    </div>
      

  )
}

export default Login