import express from 'express'
import bodyParser from 'body-parser'
import * as dotenv from 'dotenv'

import { findUserByEmailAndPassword, signToken, verifyToken } from './auth'
import { findShipments } from './shipments'

dotenv.config()

const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

// CORS middleware
app.use((req, res, next) => {
  // Allow all, RISK!
  res.setHeader('Access-Control-Allow-Origin', '*')

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
  const token = req.headers.token
  const userData = verifyToken(token, true, res)

  const userShipments = await findShipments(userData)

  res.status(200)
  res.send(userShipments)
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
  const tokenVerified = verifyToken(req.body.token || '')
  if (!tokenVerified) {
    res.status(401)
    res.json({ message: 'Session expired or invalid token' })
  } else {
    res.status(200)
    res.send()
  }
})

/* Throw 404 for all other requests */
app.get('*', (req, res) => {
  res.status(404)
  res.send(
    JSON.stringify({ message: 'I do not know what you are looking for!' })
  )
})

app.listen(process.env.PORT, () =>
  console.log(`Express server is running on localhost: ${process.env.PORT}`)
)
