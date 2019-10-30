import { combineReducers } from 'redux'

import { commonReducer } from 'reducers/CommonReducers'
export default combineReducers({
  common: commonReducer
})
