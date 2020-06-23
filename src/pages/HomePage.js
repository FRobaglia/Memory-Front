import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { UserContext } from './../context/UserContext';
import AuthService from '../services/AuthService';

function Home() {
  const [redirect, setRedirect] = useState("/")
  const {user, setUser} = useContext(UserContext)

  useEffect(() => {
    if (user === null) {
      return setRedirect("/login")
    }
  }, [])

  return (
    <div>
      <h1>Homepage</h1>
      <p>{user ? `Bonjour, ${user.firstName}` : ""}</p>
      <Link to='/login'><button>Log in</button></Link>
      <Link to='/register'><button>Register</button></Link>
      <Link to='/spaces'><button>Mes espaces</button></Link>
      <button onClick={() => {AuthService.clearTokens()}}>logout</button>
      <Redirect to={redirect} />
    </div>
  )
}

export default Home