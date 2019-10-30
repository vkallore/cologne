import { apiGetShipments, apiGetShipmentDetails } from 'services/shipment'

import { errorHandler, setAjaxProcessing, checkLoggedInStatus } from 'actions'

/**
 * Get shipments
 */
export const getShipments = () => {
  return async dispatch => {
    try {
      dispatch(setAjaxProcessing(true))

      /**
       * Check whether user is already logged in or not
       */
      const statusIsLoggedIn = await checkLoggedInStatus(dispatch)
      if (!statusIsLoggedIn) {
        return []
      }

      const response = await apiGetShipments()

      dispatch(setAjaxProcessing(false))

      const shipments = response.data || []

      return shipments
    } catch (error) {
      errorHandler(dispatch, error, true)
      dispatch(setAjaxProcessing(false))
      return []
    }
  }
}

/**
 * Get shipment details
 */
export const getShipmentDetails = shipmentId => {
  return async dispatch => {
    try {
      dispatch(setAjaxProcessing(true))

      /**
       * Check whether user is already logged in or not
       */
      const statusIsLoggedIn = await checkLoggedInStatus(dispatch)
      if (!statusIsLoggedIn) {
        return []
      }

      const response = await apiGetShipmentDetails(shipmentId)

      dispatch(setAjaxProcessing(false))

      const shipment = response.data || []

      return shipment
    } catch (error) {
      errorHandler(dispatch, error, true)
      dispatch(setAjaxProcessing(false))
      return []
    }
  }
}
