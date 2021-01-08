import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './App.css';
import Header from './components/Header';
import Routes from './routes';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './util/setAuthToken';
import { loadUser } from './actions/authAction';

const history = createBrowserHistory();

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <React.Fragment>
        <BrowserRouter>
          <Header history={history} />
          <Routes history={history} />
        </BrowserRouter>
      </React.Fragment>
    </Provider>
  );
};

export default App;
