/* global localStorage */
import axios from 'axios';
import { browserHistory } from 'react-router';
import {
  UNAUTH_USER,
  AUTH_USER,
  AUTH_ERROR,
  FETCH_PROMOS,
  FETCH_MERCHANT_INFO,
  FETCH_FOLLOWERS_PROMOS,
  SUBSCRIBER_USER } from './types';

const ROOT_URL = 'https://data.placeful.co'; // api-placeful-merchant repo

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error,
  };
}

export function loginUser({ email, password }) {
  // returning func gives us access to dispatch
  return function (dispatch) {
    // submit email to server
    axios.post(`${ROOT_URL}/login`, { email, password })
      .then(response => {
        // - Update state to indicate user is authenticated
        dispatch({ type: AUTH_USER });
        // - Save the JWT token
        localStorage.setItem('placeful_token', response.data.token);
        localStorage.setItem('placeful_joined', response.data.joined_date);
        // - redirect the route to /home
        browserHistory.push('/');
      })
      .catch(() => {
        // if request is bad, show an error to user
        dispatch(authError('Bad Login info'));
      });
  };
}

export function sendPayment(token) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/payment`, token)
      .then(response => {
        dispatch({ type: SUBSCRIBER_USER });
        dispatch({
          type: FETCH_MERCHANT_INFO,
          payload: response.data,
        });
        localStorage.setItem('placeful_subscriber', true);
        browserHistory.push('/');
      })
      .catch(response => console.log(response.data));
  };
}

export function signupUser(formProps) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/register`, { formProps })
      .then(() => {
        dispatch({ type: AUTH_USER });
        browserHistory.push('/thanks');
      })
      .catch(response => dispatch(authError(response.data.error)));
  };
}

export function logoutUser() {
  localStorage.removeItem('placeful_token');
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER });
    browserHistory.push('/login');
  };
}

export function fetchPromos() {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/promos`, {
      headers: { authorization: localStorage.getItem('placeful_token') },
    })
      .then(response => {
        dispatch({
          type: FETCH_PROMOS,
          payload: response.data,
        });
      });
  };
}

export function fetchMerchantInfo() {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/merchant`, {
      headers: { authorization: localStorage.getItem('placeful_token') },
    })
      .then(response => {
        dispatch({
          type: FETCH_MERCHANT_INFO,
          payload: response.data,
        });
      });
  };
}

export function editPromo(formProps) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/promo/edit`, formProps, {
      headers: { authorization: localStorage.getItem('placeful_token') },
    })
      .then(response => {
        dispatch({
          type: FETCH_PROMOS,
          payload: response.data,
        });
        browserHistory.push('/promotions');
      });
  };
}

export function createPromo(formProps) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/promo/new`, formProps, {
      headers: { authorization: localStorage.getItem('placeful_token') },
    })
      .then(response => {
        dispatch({
          type: FETCH_PROMOS,
          payload: response.data,
        });
        browserHistory.push('/promotions');
      });
  };
}

export function pausePromo(dealId, merchantId, status) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/promo/status`, { dealId, merchantId, status }, {
      headers: { authorization: localStorage.getItem('placeful_token') },
    })
      .then(response => {
        dispatch({
          type: FETCH_PROMOS,
          payload: response.data,
        });
        browserHistory.push('/promotions');
      });
  };
}

export function editProfile(formProps) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/profile/edit`, formProps, {
      headers: { authorization: localStorage.getItem('placeful_token') },
    }).then(response => {
      dispatch({
        type: FETCH_MERCHANT_INFO,
        payload: response.data,
      });
      browserHistory.push('/promotions');
    });
  };
}

export function readMessage(messageId) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/message/read`, { messageId }, {
      headers: { authorization: localStorage.getItem('placeful_token') },
    }).then(response => {
      dispatch({
        type: FETCH_MERCHANT_INFO,
        payload: response.data,
      });
    });
  };
}

export function promoteToFollowers(formProps) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/followers/promote`, formProps, {
      headers: { authorization: localStorage.getItem('placeful_token') },
    })
      .then(response => {
        dispatch({
          type: FETCH_FOLLOWERS_PROMOS,
          payload: response.data,
        });
        browserHistory.push('/promotions');
      });
  };
}

export function fetchFollowersPromos() {
  return function (dispatch) {
    axios.get(`${ROOT_URL}/followers/promos`, {
      headers: { authorization: localStorage.getItem('placeful_token') },
    })
      .then(response => {
        dispatch({
          type: FETCH_FOLLOWERS_PROMOS,
          payload: response.data,
        });
      });
  };
}

export function lastMinutePromo(formProps) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/promos/lastminute`, formProps, {
      headers: { authorization: localStorage.getItem('placeful_token') },
    })
      .then(response => {
        dispatch({
          type: FETCH_PROMOS,
          payload: response.data,
        });
        browserHistory.push('/promotions');
      });
  };
}

export function resetPassword(email) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/merchant/resetpassword`, email)
      .then(response => {
        dispatch({
          type: FETCH_MERCHANT_INFO,
          payload: response.data,
        });
        browserHistory.push('/login');
      });
  };
}

export function setPassword(formProps) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/merchant/setpassword`, formProps)
      .then(response => {
        dispatch({
          type: FETCH_MERCHANT_INFO,
          payload: response.data,
        });
        browserHistory.push('/login');
      });
  };
}

export function activateSocial(obj, businessId) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/merchant/social/add`, { obj, businessId }, {
      headers: { authorization: localStorage.getItem('placeful_token') },
    }).then(response => {
      dispatch({
        type: FETCH_MERCHANT_INFO,
        payload: response.data,
      });
    });
  };
}

export function deactivateSocial(socialName, businessId) {
  return function (dispatch) {
    axios.post(`${ROOT_URL}/merchant/social/delete`, { socialName, businessId }, {
      headers: { authorization: localStorage.getItem('placeful_token') },
    }).then(response => {
      dispatch({
        type: FETCH_MERCHANT_INFO,
        payload: response.data,
      });
    });
  };
}
