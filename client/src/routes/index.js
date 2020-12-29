import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Developers from '../pages/Developers';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/developers' component={Developers} />
      <Route exact path='/sign-in' component={SignIn} />
      <Route exact path='/sign-up' component={SignUp} />
    </Switch>
  );
};

export default Routes;
