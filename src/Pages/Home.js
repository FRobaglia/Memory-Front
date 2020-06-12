import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <p>ceci est la home</p>
      <Link to='/Login'>Log in</Link>
    </div>
  )
}

export default Home