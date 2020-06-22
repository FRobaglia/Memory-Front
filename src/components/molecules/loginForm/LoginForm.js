import React, { useEffect, useContext } from 'react'
import { Link } from "react-router-dom";
import AuthService from './../../../services/AuthService'
import { UserContext } from './../../../context/UserContext'
import useForm from './../../../utils/useForm'



function LoginForm() {

  const [ values, handleChange ] = useForm();
  const {user, setUser} = useContext(UserContext)

  useEffect(() => {
  
    if (AuthService.getRefreshToken() !== null) {
      AuthService.refreshTokens()
      persistSession()
    } else {
      console.log("Aucun refresh token trouvé, pas d'autologin possible.")
    }
  }, [])

  const handleLogin = (event) => {
    event.preventDefault() // Empêcher le refresh de la page lors de l'envoi du formulaire
    AuthService.requestTokens(values.email, values.password) // Faire la requête API pour récupérer les JWT token avec les identifiants soumis
    persistSession()
  }

  const persistSession = () => {
    AuthService.requestUserData().then(user => {
      setUser(user)
    })
    // console.log(`L'utilisateur ${user.firstName} ${user.lastName} est connecté.`)
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
      {/* <button onClick={() => {AuthService.clearTokens(); setIsLoggedIn('not logged in')}}>logout</button> */}
    </div>
      

  )
}

export default LoginForm