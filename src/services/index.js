import axios from 'axios'

/**
 * API Base URL - Proxy!
 */
const baseURL = `${process.env.REACT_APP_API_URL}`

/**
 * Axios services
 */
export default axios.create({
  baseURL
  // headers: { 'content-type': 'multipart/form-data' }
})
