import React, { useContext, useEffect, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { UserContext } from './../UserContext'

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
      <p>{user ? `Bonjour, ${user.firstName}` : ""}</p>
      <Link to='/login'><button>Log in</button></Link>
      <Link to='/register'><button>Register</button></Link>
      <Redirect to={redirect} />
    </div>
  )
}

export default Home