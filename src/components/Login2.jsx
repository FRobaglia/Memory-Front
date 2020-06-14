import React, { useState }from 'react'
import axios from 'axios';

function Login2() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberUser, setRememberUser] = useState(true)

  function handleLogin(event) {
    event.preventDefault()

    axios.post(`${process.env.REACT_APP_API_BASE_URL}api/login_check`, {
      username: email,
      password: password
    }).then(response => {
      const token = response.data.token
      const refreshToken = response.data.refresh_token

      if (rememberUser) {
        localStorage.setItem('JSONWEBTOKEN', token)
        localStorage.setItem('JSONWEBTOKEN_REFRESH', refreshToken)
      } else {
        sessionStorage.setItem('JSONWEBTOKEN', token)
        sessionStorage.setItem('JSONWEBTOKEN_REFRESH', refreshToken)
      }
      
    }).catch(err => {
      console.log(err)
    })
  }

  return (
      <form onSubmit={handleLogin} method="get">
        <label>Adresse e-mail</label>
        <input type="mail" name="email" placeholder="test@example.com" value={email} onChange={e => setEmail(e.target.value)}/>
        <label>Mot de passe</label>
        <input type="password" name="password" value={password} onChange={e => setPassword(e.target.value)}/>
        <label>Remember me</label>
        <input type="checkbox" name="remember" checked={rememberUser} onChange={e => setRememberUser(e.target.checked)} />
        <input type="submit" value="Me connecter" />
      </form>
  )
}

export default Login2
