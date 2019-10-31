import request from 'services'

import { getLocalStorage } from 'actions'
import { USER_API_KEY } from 'constants/AppConstants'

export const apiGetShipments = async () => {
  const requestConfig = {
    headers: {
      [USER_API_KEY]: await getLocalStorage(USER_API_KEY)
    }
  }
  return request.get('/shipments', requestConfig)
}

export const apiGetShipmentDetails = async shipmentId => {
  const requestConfig = {
    headers: {
      [USER_API_KEY]: await getLocalStorage(USER_API_KEY)
    }
  }
  return request.get(`/shipments/${shipmentId}`, requestConfig)
}

export const apiGetBikers = async () => {
  const requestConfig = {
    headers: {
      [USER_API_KEY]: await getLocalStorage(USER_API_KEY)
    }
  }
  return request.get(`/bikers`, requestConfig)
}

export const apiAssignBiker = async (shipmentId, assignee) => {
  const requestConfig = {
    headers: {
      [USER_API_KEY]: await getLocalStorage(USER_API_KEY)
    }
  }

  return request.put(
    `/shipments`,
    {
      shipment_id: shipmentId,
      assignee
    },
    requestConfig
  )
}
