import users from './users'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

/**
 * Find user by email and password
 * @param {string} email
 * @param {string} password
 */
export const findUserByEmailAndPassword = (email, password) =>
  new Promise(resolve =>
    resolve(
      users.find(user => user.email === email && user.password === password)
    )
  )

/**
 * Find user by email and password
 * @param {string} email
 * @param {string} password
 */
export const findUserById = userId =>
  new Promise(resolve => resolve(users.find(user => user.id === userId)))

/**
 * Sign the JWT
 * @param {object} user object
 */
export const signToken = ({ id, email, type }) => {
  const token = jwt.sign({ user_id: id, email, type }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  })

  return token
}

/**
 * Verify token and stop execution if required
 * @param {string} token
 * @param {boolean} stopExecution
 * @param {object} res
 */
export const verifyToken = (token, stopExecution = false, res) => {
  try {
    const jwtData = jwt.verify(token, process.env.JWT_SECRET)
    return jwtData
  } catch (err) {
    if (stopExecution) {
      res.status(401)
      res.json({ message: 'Session expired or invalid token!' })
    }

    return false
  }
}
