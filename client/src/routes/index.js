import React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';
import Developers from '../pages/Developers';
import Home from '../pages/Home';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import PostDetails from '../pages/PostDetails';
import Profile from '../pages/Profile';
import EditProfile from '../pages/EditProfile';
import CreatePost from '../pages/CreatePost';

const Routes = (props) => {
  const { history } = props;

  return (
    <Switch>
      <PublicRoute exact path='/' history={history} component={Home} />
      <PublicRoute exact path='/developers' component={Developers} />
      <PublicRoute exact path='/sign-in' history={history} component={SignIn} />
      <PublicRoute exact path='/sign-up' history={history} component={SignUp} />
      <PrivateRoute
        exact
        path='/dashboard'
        history={history}
        component={Dashboard}
      />
      <PrivateRoute exact path='/post/:id' component={PostDetails} />
      <PrivateRoute exact path='/profile' component={Profile} />
      <PrivateRoute
        exact
        path='/edit-profile'
        history={history}
        component={EditProfile}
      />
      <PrivateRoute
        exact
        path='/create-post'
        component={CreatePost}
        history={history}
      />
    </Switch>
  );
};

export default Routes;
