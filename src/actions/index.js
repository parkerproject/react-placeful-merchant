/* global localStorage */
import axios from 'axios'
import { browserHistory } from 'react-router'
import { UNAUTH_USER, AUTH_USER, AUTH_ERROR, FETCH_PROMOS, FETCH_MERCHANT_INFO, FETCH_FOLLOWERS_PROMOS } from './types'

const ROOT_URL = 'https://data.placeful.co' // api-placeful-merchant repo

export function loginUser ({email, password}) {
  // returning func gives us access to dispatch
  return function (dispatch) {
    // submit email to server
    axios.post(`${ROOT_URL}/login`, {email, password})
      .then(response => {
        // - Update state to indicate user is authenticated
        dispatch({type: AUTH_USER})
        // - Save the JWT token
        localStorage.setItem('placeful_token', response.data.token)
        // - redirect the route to /home
        browserHistory.push('/app')
      })
      .catch(() => {
        // if request is bad, show an error to user
        dispatch(authError('Bad Login info'))
      })
  }
}

export function signupUser (formProps) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/register`, {formProps})
      .then(response => {
        dispatch({type: AUTH_USER})
        browserHistory.push('/app/thanks')
      })
      .catch(response => dispatch(authError(response.data.error)))
  }
}

export function logoutUser () {
  localStorage.removeItem('placeful_token')
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER })
    browserHistory.push('/app/login')
  }
}

export function fetchPromos () {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/promos`, {
      headers: { authorization: localStorage.getItem('placeful_token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_PROMOS,
          payload: response.data
        })
      })
  }
}

export function fetchMerchantInfo () {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/merchant`, {
      headers: { authorization: localStorage.getItem('placeful_token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_MERCHANT_INFO,
          payload: response.data
        })
      })
  }
}

export function editPromo (formProps) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/promo/edit`, formProps, {
      headers: {authorization: localStorage.getItem('placeful_token')}
    })
      .then(response => {
        dispatch({
          type: FETCH_PROMOS,
          payload: response.data
        })
        browserHistory.push('/app/promotions')
      })
  }
}

export function createPromo (formProps) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/promo/new`, formProps, {
      headers: {authorization: localStorage.getItem('placeful_token')}
    })
      .then(response => {
        dispatch({
          type: FETCH_PROMOS,
          payload: response.data
        })
        browserHistory.push('/app/promotions')
      })
  }
}

export function pausePromo (deal_id, merchant_id, status) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/promo/status`, {deal_id, merchant_id, status}, {
      headers: {authorization: localStorage.getItem('placeful_token')}
    })
      .then(response => {
        dispatch({
          type: FETCH_PROMOS,
          payload: response.data
        })
        browserHistory.push('/app/promotions')
      })
  }
}

export function editProfile (formProps) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/profile/edit`, formProps, {
      headers: {authorization: localStorage.getItem('placeful_token')}
    }).then(response => {
      dispatch({
        type: FETCH_MERCHANT_INFO,
        payload: response.data
      })
      browserHistory.push('/app/promotions')
    })
  }
}

export function readMessage (message_id) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/message/read`, {message_id}, {
      headers: {authorization: localStorage.getItem('placeful_token')}
    }).then(response => {
      dispatch({
        type: FETCH_MERCHANT_INFO,
        payload: response.data
      })
    })
  }
}

export function promoteToFollowers (formProps) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/followers/promote`, formProps, {
      headers: {authorization: localStorage.getItem('placeful_token')}
    })
      .then(response => {
        dispatch({
          type: FETCH_FOLLOWERS_PROMOS,
          payload: response.data
        })
        browserHistory.push('/app/promotions')
      })
  }
}

export function fetchFollowersPromos () {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/followers/promos`, {
      headers: { authorization: localStorage.getItem('placeful_token') }
    })
      .then(response => {
        dispatch({
          type: FETCH_FOLLOWERS_PROMOS,
          payload: response.data
        })
      })
  }
}

export function lastMinutePromo (formProps) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/promos/lastminute`, formProps, {
      headers: {authorization: localStorage.getItem('placeful_token')}
    })
      .then(response => {
        dispatch({
          type: FETCH_PROMOS,
          payload: response.data
        })
        browserHistory.push('/app/promotions')
      })
  }
}

export function resetPassword (email) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/merchant/resetpassword`, email)
      .then(response => {
        dispatch({
          type: FETCH_MERCHANT_INFO,
          payload: response.data
        })
        browserHistory.push('/app/login')
      })
  }
}

export function setPassword (formProps) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/merchant/setpassword`, formProps)
      .then(response => {
        dispatch({
          type: FETCH_MERCHANT_INFO,
          payload: response.data
        })
        browserHistory.push('/app/login')
      })
  }
}

export function authError (error) {
  return {
    type: AUTH_ERROR,
    payload: error
  }
}
