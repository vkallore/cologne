import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import * as dotenv from 'dotenv'
import path from 'path'

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

// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, '../build')))

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

// Set port to be used by Node.js
app.set('port', process.env.PORT || process.env.SERVER_PORT)

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

// Handle React routing, return all requests to React app
app.get('*', (req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.status(200)

  res.sendFile(path.join(__dirname + '/../build/index.html'))
})

app.listen(app.get('port'), () =>
  console.log(`Express server is running on localhost: ${app.get('port')}`)
)
