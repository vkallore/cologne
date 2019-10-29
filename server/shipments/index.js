import { shipments } from './data'
import { MANAGER } from '../auth/users'
import { findUserById } from '../auth/index'

export const findShipments = userData => {
  const { type, user_id: userId } = userData
  /* Manager should get all shipments */
  if (type === MANAGER) {
    return Promise.all(
      shipments.map(async (shipment, ind) => {
        const userId = shipment.assignee
        console.log(ind)
        if (userId !== null) {
          const userData = await findUserById(userId)
          shipment.assignee = userData
        }
        return shipment
      })
    )
  }

  /* User shipments */
  return Promise.resolve(
    shipments.filter(shipment => shipment.assignee === userId)
  )
}
