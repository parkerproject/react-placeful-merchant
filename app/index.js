/* global localStorage */
/* global location */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, browserHistory } from 'react-router';
import routes from './routes';
import reduxThunk from 'redux-thunk';
import { AUTH_USER, TRIAL_EXPIRED } from './actions/types';
import createLogger from 'redux-logger';
import Moment from 'moment';

import reducers from './reducers';

const logger = createLogger();
const createStoreWithMiddleware = applyMiddleware(reduxThunk, logger)(createStore);
const store = createStoreWithMiddleware(reducers);
const token = localStorage.getItem('placeful_token');

if (token && localStorage.getItem('placeful_joined')) {
  let todayDate = new Moment().format('M/D/YYYY');
  todayDate = new Moment(todayDate, 'M/D/YYYY');
  const joinedDate = new Moment(localStorage.getItem('placeful_joined'), 'M/D/YYYY');
  const diffDays = todayDate.diff(joinedDate, 'days');
  if (diffDays > 14 && !localStorage.getItem('placeful_subscriber')) {
    // we need to update application state
    store.dispatch({ type: TRIAL_EXPIRED });
    store.dispatch({ type: AUTH_USER });
    browserHistory.push('/payment');
  }
  store.dispatch({ type: AUTH_USER });
} else {
  const paths = ['/forgotpass', '/setpass', '/signup'];
  if (paths.indexOf(location.pathname) > -1) {
    browserHistory.push('/login');
  }
}

// createStoreWithMiddleware(reducers)
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.querySelector('.root'));
