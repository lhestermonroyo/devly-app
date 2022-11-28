import React from 'react';
import { Switch } from 'react-router-dom';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import LoadingScreen from '../components/LoadingScreen';

const Home = React.lazy(() => import('../pages/Home'));
const Developers = React.lazy(() => import('../pages/Developers'));
const SignIn = React.lazy(() => import('../pages/SignIn'));
const SignUp = React.lazy(() => import('../pages/SignUp'));
const Dashboard = React.lazy(() => import('../pages/Dashboard'));
const PostDetails = React.lazy(() => import('../pages/PostDetails'));
const CreatePost = React.lazy(() => import('../pages/CreatePost'));
const EditPost = React.lazy(() => import('../pages/EditPost'));
const Profile = React.lazy(() => import('../pages/Profile'));
const EditProfile = React.lazy(() => import('../pages/EditProfile'));

const Routes = props => {
  const { history } = props;

  return (
    <Switch>
      <React.Suspense
        fallback={<LoadingScreen loadingMsg="Loading, please wait..." />}
      >
        <PublicRoute exact path="/" history={history} component={Home} />
        <PublicRoute exact path="/developers" component={Developers} />
        <PublicRoute
          exact
          path="/sign-in"
          history={history}
          component={SignIn}
        />
        <PublicRoute
          exact
          path="/sign-up"
          history={history}
          component={SignUp}
        />
        <PrivateRoute
          exact
          path="/dashboard"
          history={history}
          component={Dashboard}
        />
        <PrivateRoute
          exact
          path="/post/:id"
          component={PostDetails}
          history={history}
        />
        <PrivateRoute
          exact
          path="/create-post"
          component={CreatePost}
          history={history}
        />
        <PrivateRoute
          exact
          path="/edit-post/:id"
          component={EditPost}
          history={history}
        />
        <PrivateRoute exact path="/profile" component={Profile} />
        <PrivateRoute
          exact
          path="/edit-profile"
          history={history}
          component={EditProfile}
        />
      </React.Suspense>
    </Switch>
  );
};

export default Routes;
