import {
  apiGetShipments,
  apiGetShipmentDetails,
  apiGetBikers,
  apiUpdateShipment
} from 'services/shipment'

import { errorHandler, setAjaxProcessing, showMessage } from 'actions'
import { SUCCESS } from 'constants/AppConstants'

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
      return null
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

/**
 * Assing biker
 */
export const assignBiker = ({ id: shipmentId, assignee }) => {
  return async dispatch => {
    try {
      dispatch(setAjaxProcessing(true))
      const { data: response } = await apiUpdateShipment({
        shipment_id: shipmentId,
        assignee
      })

      dispatch(setAjaxProcessing(false))
      const { message, data: shipment } = response
      showMessage(message, '', SUCCESS)

      return shipment
    } catch (error) {
      errorHandler(error, true)
      dispatch(setAjaxProcessing(false))
      return false
    }
  }
}

/**
 * Update status & date
 */
export const updateShipment = ({ id: shipmentId, date, status }) => {
  return async dispatch => {
    try {
      dispatch(setAjaxProcessing(true))
      const { data: response } = await apiUpdateShipment({
        shipment_id: shipmentId,
        status_update_time: date,
        status
      })

      dispatch(setAjaxProcessing(false))
      const { message, data: shipment } = response
      showMessage(message, '', SUCCESS)

      return shipment
    } catch (error) {
      errorHandler(error, true)
      dispatch(setAjaxProcessing(false))
      return false
    }
  }
}
