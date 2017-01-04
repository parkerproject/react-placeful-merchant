import { FETCH_FOLLOWERS_PROMOS } from '../actions/types'
export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_FOLLOWERS_PROMOS:
      return {...state, promos: action.payload}
  }

  return state
}
