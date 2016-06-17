/* localStorage */
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { Router, browserHistory } from 'react-router'
import routes from './routes'
import reduxThunk from 'redux-thunk'
import { AUTH_USER } from './actions/types'
import createLogger from 'redux-logger'

import reducers from './reducers'

const logger = createLogger()
const createStoreWithMiddleware = applyMiddleware(reduxThunk, logger)(createStore)
const store = createStoreWithMiddleware(reducers)
const token = localStorage.getItem('placeful_token') // if we have token, user is signed in

if (token) {
  // we need to update application state
  store.dispatch({type: AUTH_USER})
}

// createStoreWithMiddleware(reducers)
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes} />
  </Provider>
  , document.querySelector('.root'))
