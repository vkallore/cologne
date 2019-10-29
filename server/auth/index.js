import users from './users'
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
dotenv.config()

/**
 * Find user by email and password
 * @param {string} email
 * @param {string} password
 */
export const findUser = (email, password) =>
  new Promise(resolve =>
    resolve(
      users.find(user => user.email === email && user.password === password)
    )
  )

/**
 * Sign the JWT
 * @param {object} user object
 */
export const signToken = ({ email, type }) => {
  const token = jwt.sign({ email, type }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  })

  return token
}

export const verifyToken = token => {
  try {
    jwt.verify(token, process.env.JWT_SECRET)
    return true
  } catch (err) {
    return false
  }
}
