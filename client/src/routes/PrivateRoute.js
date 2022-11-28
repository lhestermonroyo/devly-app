import React from 'react';
import { Route, Redirect } from 'react-router-dom';
// Redux
import { useSelector } from 'react-redux';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useSelector(state => state.auth);

  return (
    <Route
      exact
      {...rest}
      render={props => {
        if (isAuthenticated !== null) {
          return isAuthenticated === true ? (
            <Component {...props} />
          ) : (
            <Redirect to="/" />
          );
        }
      }}
    />
  );
};

export default PrivateRoute;
