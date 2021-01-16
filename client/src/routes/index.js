import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Developers from '../pages/Developers';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import CreatePost from '../pages/CreatePost';
import PublicRoute from './PublicRoute';
import Profile from '../pages/Profile';
import EditProfile from '../pages/EditProfile';

const Routes = (props) => {
  const { history } = props;

  return (
    <Switch>
      <PublicRoute exact path='/' history={history} component={Home} />
      <PublicRoute exact path='/developers' component={Developers} />
      <PublicRoute exact path='/sign-in' history={history} component={SignIn} />
      <PublicRoute exact path='/sign-up' history={history} component={SignUp} />
      <PrivateRoute exact path='/dashboard' component={Dashboard} />
      <PrivateRoute exact path='/create-post' component={CreatePost} />
      <PrivateRoute exact path='/profile' component={Profile} />
      <PrivateRoute
        exact
        path='/edit-profile'
        history={history}
        component={EditProfile}
      />
    </Switch>
  );
};

export default Routes;
