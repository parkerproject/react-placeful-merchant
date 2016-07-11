import { SUBSCRIBER_USER, TRIAL_EXPIRED } from '../actions/types'
export default function (state = {}, action) {
  switch (action.type) {
    case SUBSCRIBER_USER:
      return {...state, subscriber_user: true}
    case TRIAL_EXPIRED:
      return {...state, trial_expired: true, subscriber_user: false}
  }

  return state
}
