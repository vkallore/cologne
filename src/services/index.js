import axios from 'axios'

import { getLocalStorage } from 'actions'

import { USER_API_KEY } from 'constants/AppConstants'

/**
 * API Base URL - Proxy!
 */
const baseURL = `${process.env.REACT_APP_API_URL}`

/**
 * Axios services
 */
export default axios.create({
  baseURL,
  headers: {
    [USER_API_KEY]: getLocalStorage(USER_API_KEY)
  }
})
