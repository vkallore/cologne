import { combineReducers } from 'redux'

import { commonReducer } from 'reducers/CommonReducers'
import { formsReducer } from 'reducers/FormsReducers'

export default combineReducers({
  common: commonReducer,
  forms: formsReducer
})
