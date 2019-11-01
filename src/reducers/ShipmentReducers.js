import { SHIPMENT_DATA, SHIPMENT_DETAILS, BIKERS } from 'constants/AppConstants'

const initialState = {
  shipments: [],
  bikers: [],
  shipmentDetails: []
}

export const shipmentReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHIPMENT_DATA:
      return {
        ...state,
        shipments: action.data
      }

    case SHIPMENT_DETAILS:
      console.log(action.data)
      return {
        ...state,
        shipmentDetails: action.data
      }

    case BIKERS:
      return {
        ...state,
        bikers: action.data
      }

    default:
      return state
  }
}
