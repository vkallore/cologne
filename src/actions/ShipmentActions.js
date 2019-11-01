import {
  apiGetShipments,
  apiGetShipmentDetails,
  apiGetBikers,
  apiUpdateShipment
} from 'services/shipment'

import { errorHandler, setAjaxProcessing, showMessage } from 'actions'
import {
  SUCCESS,
  SHIPMENT_DATA,
  SHIPMENT_DETAILS,
  BIKERS
} from 'constants/AppConstants'

/**
 * Get shipments
 */
export const getShipments = () => {
  return async dispatch => {
    try {
      dispatch(setAjaxProcessing(true))

      const { data: response } = await apiGetShipments()

      await dispatch({
        type: SHIPMENT_DATA,
        data: response
      })

      dispatch(setAjaxProcessing(false))
      return true
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

      const { data: response } = await apiGetShipmentDetails(shipmentId)

      await dispatch({
        type: SHIPMENT_DETAILS,
        data: response
      })
      dispatch(setAjaxProcessing(false))

      return response
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
      const { data: response } = await apiGetBikers()

      await dispatch({
        type: BIKERS,
        data: response
      })

      dispatch(setAjaxProcessing(false))

      return true
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
      const { message, data } = response
      await dispatch({
        type: SHIPMENT_DETAILS,
        data: data
      })

      dispatch(setAjaxProcessing(false))
      showMessage(message, '', SUCCESS)

      return true
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
