import React from 'react';
import { Link } from 'react-router-dom';

function Login() {
  return (
    <div>
      <p>ceci est le login</p>
      <Link to='/'>Go back Home</Link>
      <Link to='/register'>S'inscrire</Link>
    </div>
  )
}

export default Login