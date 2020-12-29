import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './App.css';
import Header from './components/Header';
import Routes from './routes';
// Redux
import { Provider } from 'react-redux';
import store from './store';

const history = createBrowserHistory();

const App = () => {
  return (
    <Provider store={store}>
      <React.Fragment>
        <BrowserRouter>
          <Header history={history} />
          <Routes />
        </BrowserRouter>
      </React.Fragment>
    </Provider>
  );
};

export default App;
