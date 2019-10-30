import request from 'services'

/**
 * Login
 * @param {object}
 */
export const doLogin = ({ ...formData }) => {
  return request.post('login', formData)
}
