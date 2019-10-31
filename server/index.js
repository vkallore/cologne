import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import * as dotenv from 'dotenv'

import {
  findUserByEmailAndPassword,
  signToken,
  verifyToken,
  findBikers
} from './auth'
import { findShipments, findShipment, updateShipment } from './shipments'
import { MANAGER } from './auth/users'

dotenv.config()

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

// Allow cors, RISK!
app.use(cors())

// CORS middleware
app.use((req, res, next) => {
  // Request methods you wish to allow
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true)

  // Default contnet type as json
  res.setHeader('Content-Type', 'application/json')

  // Default response code as 400
  res.status(400)

  // Pass to next layer of middleware
  next()
})

/* Accept incoming request bodies & parse it to req.body! */
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

/**
 * Get shipments accessible by the user
 */
app.get('/shipments', async (req, res) => {
  // Find user from token
  const userData = verifyToken(req, res)

  if (userData !== false) {
    const userShipments = await findShipments(userData)
    if (userShipments !== false) {
      res.status(200).json(userShipments)
    }
  }
})

/**
 * Get shipments accessible by the user
 */
app.get('/shipments/:id', async (req, res) => {
  // Find user from token
  const userData = verifyToken(req, res)

  if (userData !== false) {
    const shipmentId = +req.params.id
    const shipment = await findShipment(shipmentId, userData)
    if (shipment !== false && shipment !== null) {
      return res.status(200).json(shipment)
    } else if (shipment === null) {
      return res.status(404).json({ message: 'Shipment not found' })
    }
    res
      .status(403)
      .json({ message: 'You do not have access to this shipment!' })
  }
})

/**
 * Update a shipment status
 */
app.put('/shipments', async (req, res) => {
  // Find user from token
  const userData = verifyToken(req, res)

  if (userData !== false) {
    const shipmentData = await updateShipment(req.body, userData, res)
    if (shipmentData !== false) {
      res
        .status(200)
        .json({ message: 'Shipment updated successfully', data: shipmentData })
      return
    }
    res.send()
  }
})

/**
 * Login request
 */
app.post('/login', async (req, res) => {
  const { email, password } = req.body

  const user = await findUserByEmailAndPassword(email, password)

  // Login failed
  if (!user) {
    res.status(401)
    res.json({ message: 'Invalid login' })
  } else {
    user.token = signToken(user)

    res.status(200)
    res.json({ name: user.name, type: user.type, token: user.token })
  }
})

/**
 * Verify user token
 */
app.post('/token-verify', (req, res) => {
  const tokenVerified = verifyToken(req, res)
  if (tokenVerified) {
    res.status(200)
    res.json({
      name: tokenVerified.name
    })
  }
})

/**
 * Get all bikers
 */
app.get('/bikers', async (req, res) => {
  // Find user from token
  const userData = verifyToken(req, res)

  if (userData !== false) {
    if (userData.type !== MANAGER) {
      return res.status(403).json({ message: 'Unauthorized' })
    }
    const bikers = await findBikers(userData)

    if (bikers !== false) {
      res.status(200).json(bikers)
    }
  }
})

/* Throw 404 for all other requests */
app.get('*', (req, res) => {
  res.status(404)
  res.json({ message: 'I do not know what you are looking for!' })
})

app.listen(process.env.SERVER_PORT, () =>
  console.log(
    `Express server is running on localhost: ${process.env.SERVER_PORT}`
  )
)
