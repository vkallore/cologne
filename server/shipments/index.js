import { shipments } from './data'
import { MANAGER } from '../auth/users'
import { findUserById } from '../auth/index'

/**
 * Get all shipments by access level
 * @param {*} userData
 */
export const findShipments = userData => {
  const { type } = userData
  let { user_id: userId } = userData
  userId = +userId
  /* Manager should get all shipments */
  if (type === MANAGER) {
    return Promise.all(
      shipments.map(async shipment => {
        const userId = shipment.assignee
        if (userId !== null) {
          const assignedUserData = await findUserById(userId)
          if (assignedUserData) {
            shipment.assignee = {
              id: assignedUserData.id,
              name: assignedUserData.name,
              email: assignedUserData.email
            }
          }
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
  const { status } = reqBody
  let { shipment_id: shipmentId, assignee } = reqBody
  shipmentId = +shipmentId
  assignee = +assignee
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
      shipment.assignee = assignee !== 0 ? assignee : null
      shipment.last_update = new Date()

      shipments[shipmentIndex] = shipment
      return Promise.resolve(true)
    }

    if (shipment.assignee === userId) {
      shipment.status = status
      shipment.last_update = new Date()

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
