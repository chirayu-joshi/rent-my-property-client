import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import 'leaflet/dist/leaflet.css';

import './index.css';
import App from './containers/App';
import signInReducer from './store/reducers/signIn';
import signUpReducer from './store/reducers/signUp';
import authReducer from './store/reducers/auth';
import hostReducer from './store/reducers/host';
import mapReducer from './store/reducers/map';
import * as serviceWorker from './serviceWorker';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  signIn: signInReducer,
  signUp: signUpReducer,
  auth: authReducer,
  host: hostReducer,
  map: mapReducer
})

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
