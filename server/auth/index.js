import users from './users'

/**
 * Find user by email and password
 * @param {string} email
 * @param {string} password
 */
export const findUser = async (email, password) => {
  return new Promise(resolve => {
    resolve(
      users.find(user => {
        return user.email === email && user.password === password
      })
    )
  })
}
