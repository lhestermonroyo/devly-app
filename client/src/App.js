import React, { useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import 'antd/dist/antd.css';
import './App.css';
import Header from './components/Header';
import Routes from './routes';
import LoadingScreen from './components/LoadingScreen';

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
    authenticateUser();
  }, []);

  const authenticateUser = async () => {
    await store.dispatch(loadUser());
  };

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header history={history} />
        <Routes history={history} />
      </BrowserRouter>
    </Provider>
  );
};

export default App;
