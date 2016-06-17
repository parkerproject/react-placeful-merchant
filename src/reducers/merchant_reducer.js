import { FETCH_MERCHANT_INFO } from '../actions/types'
export default function (state = {}, action) {
  switch (action.type) {
    case FETCH_MERCHANT_INFO:
      return {...state, merchant: action.payload}
  }

  return state
}
