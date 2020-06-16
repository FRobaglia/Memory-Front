import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from './Home';
import Login from './Login';

function Routes() {
  return (
    <Switch>
      <Route path='/' exact component={Home}/>
      <Route path='/Login' exact component={Login}/>
    </Switch>
  )
}

export default withRouter(Routes)