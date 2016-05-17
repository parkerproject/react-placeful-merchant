import axios from 'axios'

export const FETCH_PROMOS = 'FETCH_PROMOS'

const ROOT_URL = 'http://api.placeful.co/merchant'

export function fetchPromos () {
  const request = axios.get(`${ROOT_URL}/promos`)
  return {
    type: FETCH_PROMOS,
    payload: request
  }
}
