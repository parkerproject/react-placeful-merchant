import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import promosReducer from './promos_reducer'
import authReducer from './auth_reducer'
import merchantReducer from './merchant_reducer'
import followersPromosReducer from './followers_promos_reducer'

const rootReducer = combineReducers({
  promos: promosReducer,
  form: formReducer,
  auth: authReducer,
  merchant: merchantReducer,
  followers_promos: followersPromosReducer
})

export default rootReducer
