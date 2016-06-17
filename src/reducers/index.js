import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import promosReducer from './promos_reducer'
import authReducer from './auth_reducer'
import merchantReducer from './merchant_reducer'

const rootReducer = combineReducers({
  promos: promosReducer,
  form: formReducer,
  auth: authReducer,
  merchant: merchantReducer
})

export default rootReducer
