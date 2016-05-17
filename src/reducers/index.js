import { combineReducers } from 'redux'
import PromosReducer from './reducer_promos'
import { reducer as formReducer } from 'redux-form'

const rootReducer = combineReducers({
  promos: PromosReducer,
  form: formReducer
})

export default rootReducer
