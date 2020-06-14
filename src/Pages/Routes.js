import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Home from './Home';
import Login from './Login';
// import Register from './Register';
import Register from './Register'
import Register2 from './Register2'

function Routes() {
  return (
    <Switch>
      <Route path='/' exact component={Home}/>
      <Route path='/login' exact component={Login}/>
      <Route path='/register' exact component={Register}/>
      <Route path='/register2' exact component={Register2}/>
    </Switch>
  )
}

export default withRouter(Routes)