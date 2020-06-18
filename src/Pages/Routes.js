import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register';
import Profile from './Profile';

function Routes({isLoggedIn, setIsLoggedIn}) {
  return (
    <Switch>
      <Route
        exact
        path='/'
        render={props => (
          <Home {...props} isLoggedIn={isLoggedIn}/>
        )}
      />
      <Route
        exact
        path='/login'
        render={props => (
          <Login {...props} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>  
        )}
      />
      <Route path='/register' exact component={Register}/>
      <Route
        exact
        path='/profile'
        render={props => (
          <Profile {...props} isLoggedIn={isLoggedIn}/>
        )}
      />
    </Switch>
  )
}

export default withRouter(Routes)