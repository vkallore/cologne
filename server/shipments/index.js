import { shipments } from './data'
import { MANAGER } from '../auth/users'
import { findUserById } from '../auth/index'

/**
 * Get all shipments by access level
 * @param {*} userData
 */
export const findShipments = userData => {
  const { type, user_id: userId } = userData
  /* Manager should get all shipments */
  if (type === MANAGER) {
    return Promise.all(
      shipments.map(async shipment => {
        const userId = shipment.assignee
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

/**
 * Update shipment
 * @param {*} reqBody
 * @param {*} userData
 */
export const updateShipment = async (reqBody, userData, res) => {
  const { assignee, status } = reqBody
  let { shipment_id: shipmentId } = reqBody
  shipmentId = +shipmentId
  const { type, user_id: userId } = userData
  let shipmentIndex

  shipments.map((shipment, index) => {
    if (shipment.id === shipmentId) {
      shipmentIndex = index
    }
    return shipment
  })

  try {
    if (shipmentIndex === undefined) {
      res.json({ message: 'Invalid request' })
      throw new Error()
    }
    const shipment = shipments[shipmentIndex]

    /* Manager can update any shipment */
    if (type === MANAGER) {
      shipment.status = status
      shipment.assignee = assignee

      shipments[shipmentIndex] = shipment
      return Promise.resolve(true)
    }

    if (shipment.assignee === userId) {
      shipment.status = status
      shipments[shipmentIndex] = shipment
    } else {
      res
        .status(403)
        .json({ message: 'You do not have access to update this shipment!' })
      throw new Error()
    }
    return Promise.resolve(true)
  } catch (err) {
    return Promise.resolve(false)
  }
}
