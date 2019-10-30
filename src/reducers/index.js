import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
import { commonReducer } from 'reducers/CommonReducers'
import { formsReducer } from 'reducers/FormsReducers'

export default combineReducers({
  common: commonReducer,
  forms: formsReducer,
  toastr: toastrReducer // <- Mounted at toastr.
})
