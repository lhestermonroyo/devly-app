import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Developers from '../pages/Developers';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import CreatePost from '../pages/CreatePost';

const Routes = (props) => {
  const { history } = props;
  return (
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/developers' component={Developers} />
      <Route exact path='/sign-in' history={history} component={SignIn} />
      <Route exact path='/sign-up' history={history} component={SignUp} />
      <PrivateRoute exact path='/dashboard' component={Dashboard} />
      <PrivateRoute exact path='/create-post' component={CreatePost} />
    </Switch>
  );
};

export default Routes;
