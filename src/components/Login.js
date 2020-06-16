import React, { useState }from 'react'
import axios from 'axios';
import AuthService from '../services/AuthService.js'

function Login() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  function handleLogin(event) {
    event.preventDefault()

    axios.post(`${process.env.REACT_APP_API_BASE_URL}api/login_check`, {
      username: email,
      password: password
    }).then(response => {
      const tokenObject = response.data
      AuthService.setTokens(tokenObject)
      saveSession()
    }).catch(err => {
      console.error(err)
    })
  }

  function saveSession() {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}api/account`).then(response => {
      console.log(response.data)
    }).catch(err => {
      console.error(err)
    })
  }

  return (
      <form onSubmit={handleLogin}>
        <label>Adresse e-mail</label>
        <input type="mail" name="email" placeholder="test@example.com" value={email} onChange={e => setEmail(e.target.value)}/>
        <label>Mot de passe</label>
        <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
        <input type="submit" value="Me connecter" />
      </form>
  )
}

export default Login