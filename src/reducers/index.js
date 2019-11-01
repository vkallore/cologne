import { combineReducers } from 'redux'
import { reducer as toastrReducer } from 'react-redux-toastr'
import { commonReducer } from 'reducers/CommonReducers'
import { formsReducer } from 'reducers/FormsReducers'
import { shipmentReducer } from 'reducers/ShipmentReducers'

export default combineReducers({
  common: commonReducer,
  forms: formsReducer,
  shipment: shipmentReducer,
  toastr: toastrReducer // <- Mounted at toastr.
})
