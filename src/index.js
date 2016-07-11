/* global localStorage */
/* global location */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { Router, browserHistory } from 'react-router'
import routes from './routes'
import reduxThunk from 'redux-thunk'
import { AUTH_USER, TRIAL_EXPIRED } from './actions/types'
import createLogger from 'redux-logger'
import Moment from 'moment'

import reducers from './reducers'

const logger = createLogger()
const createStoreWithMiddleware = applyMiddleware(reduxThunk, logger)(createStore)
const store = createStoreWithMiddleware(reducers)
const token = localStorage.getItem('placeful_token')
const joined_date = localStorage.getItem('placeful_joined')
const placeful_subscriber = localStorage.getItem('placeful_subscriber')

if (token && joined_date) {
  let todayDate = new Moment().format('M/D/YYYY')
  todayDate = new Moment(todayDate, 'M/D/YYYY')
  let joinedDate = new Moment(joined_date, 'M/D/YYYY')
  let diffDays = todayDate.diff(joinedDate, 'days')
  if (diffDays > 14 && !placeful_subscriber) {
    // we need to update application state
    store.dispatch({type: TRIAL_EXPIRED})
    store.dispatch({type: AUTH_USER})
    browserHistory.push('/app/payment')
  }
  store.dispatch({type: AUTH_USER})
} else {
  let paths = ['/app/forgotpass', '/app/setpass', '/app/signup']
  if (paths.indexOf(location.pathname) == -1) {
    browserHistory.push('/app/login')
  }
}

// createStoreWithMiddleware(reducers)
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.querySelector('.root'))
