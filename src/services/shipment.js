import request from 'services'

export const apiGetShipments = () => {
  return request.get('/shipments')
}

export const apiGetShipmentDetails = shipmentId => {
  return request.get(`/shipments/${shipmentId}`)
}
