import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <p>ceci est la home</p>
      <Link to='/login'><button>Log in</button></Link>
      <Link to='/register'><button>Register</button></Link>
      <Link to='/register2'><button>Register2</button></Link>
    </div>
  )
}

export default Home