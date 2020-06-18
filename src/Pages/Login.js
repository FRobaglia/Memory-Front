import React, { useState, useEffect }from 'react'
import axios from 'axios';
import AuthService from '../services/AuthService.js';
import { Link, useHistory } from 'react-router-dom';

function Login({ isLoggedIn, setIsLoggedIn }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  useEffect(() => {
    // Auto Login
    AuthService.getAccessToken() !== null ? getUserInfo() : console.log("Aucun token d'accès trouvé, pas d'autologin possible.")
  }, []);

  function handleLogin(event) {
    event.preventDefault();

    axios.post(`${process.env.REACT_APP_API_BASE_URL}api/login_check`, {
      username: email,
      password: password
    }).then(response => {
      const tokenObject = response.data;
      setIsLoggedIn('Logged in');
      AuthService.setTokens(tokenObject);
      getUserInfo();
      history.push('/');
    }).catch(err => {
      console.error(err);
    })
  }
  
  function getUserInfo() {
    return axios.get(`${process.env.REACT_APP_API_BASE_URL}api/account`).then(response => {
      console.log(response.data)
    }).catch(err => {
      console.error(err)
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
      </form>
      <Link to='/'>Home</Link>
      <Link to='/register'>Register</Link>
      <button onClick={() => getUserInfo()}>get session info</button>
      <button onClick={() => {AuthService.clearTokens(); setIsLoggedIn('not logged in')}}>logout</button>
    </div>
      

  )
}

export default Login