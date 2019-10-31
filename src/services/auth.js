import request from 'services'

import { getLocalStorage } from 'actions'
import { USER_API_KEY } from 'constants/AppConstants'

/**
 * Login
 * @param {object}
 */
export const doLogin = ({ ...formData }) => {
  return request.post('login', formData)
}

/**
 * Check whether user token is alive
 */
export const isTokenAlive = async () => {
  const requestConfig = {
    headers: {
      [USER_API_KEY]: await getLocalStorage(USER_API_KEY)
    }
  }
  return request.post('token-verify', {}, requestConfig)
}
