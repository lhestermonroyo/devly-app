import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// Redux
import { useSelector } from 'react-redux';
import LoadingScreen from '../components/LoadingScreen';

const PublicRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  return (
    <Route
      exact
      {...rest}
      render={(props) => {
        if (loading) {
          return <LoadingScreen loadingMsg='Loading, please wait...' />;
        }

        if (isAuthenticated !== null) {
          return isAuthenticated === true ? (
            <Redirect to='/dashboard' />
          ) : (
            <Component {...props} />
          );
        }
      }}
    />
  );
};

export default PublicRoute;
