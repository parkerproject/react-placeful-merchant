import { FETCH_PROMOS } from '../actions/types'
export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_PROMOS:
      return {...state, promos: action.payload}
  }

  return state
}
