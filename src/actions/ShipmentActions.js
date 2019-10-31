import {
  apiGetShipments,
  apiGetShipmentDetails,
  apiGetBikers
} from 'services/shipment'

import { errorHandler, setAjaxProcessing } from 'actions'

/**
 * Get shipments
 */
export const getShipments = () => {
  return async dispatch => {
    try {
      dispatch(setAjaxProcessing(true))

      const response = await apiGetShipments()

      dispatch(setAjaxProcessing(false))

      const shipments = response.data || []

      return shipments
    } catch (error) {
      errorHandler(error, true)
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

      const response = await apiGetShipmentDetails(shipmentId)

      dispatch(setAjaxProcessing(false))

      const shipment = response.data || []

      return shipment
    } catch (error) {
      errorHandler(error, true)
      dispatch(setAjaxProcessing(false))
      return []
    }
  }
}

/**
 * Get all bikers
 */
export const getBikers = () => {
  return async dispatch => {
    try {
      dispatch(setAjaxProcessing(true))
      const response = await apiGetBikers()

      dispatch(setAjaxProcessing(false))

      const bikers = response.data || []

      return bikers
    } catch (error) {
      errorHandler(error, true)
      dispatch(setAjaxProcessing(false))
      return []
    }
  }
}
