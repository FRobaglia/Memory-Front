import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
import Register from './Register'

function Routes() {
  return (
    <Switch>
      <Route path='/' exact component={Home}/>
      <Route path='/login' exact component={Login}/>
      <Route path='/register' exact component={Register}/>
    </Switch>
  )
}

export default withRouter(Routes)