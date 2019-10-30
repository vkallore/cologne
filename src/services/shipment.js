import request from 'services'

export const apiGetShipments = () => {
  return request.get('/shipments')
}
