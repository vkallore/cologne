import {
  errorHandler,
  clearMessage,
  setUserData,
  setAjaxProcessing,
  checkLoggedInStatus,
  setLoggedIn
} from 'actions'
import { doLogin } from 'services/auth'

/**
 * Login form
 * @param {string} username
 * @param {string} password
 */
export const login = ({ username, password }) => {
  return async dispatch => {
    dispatch(setAjaxProcessing(true))
    try {
      dispatch(clearMessage())

      /**
       * Check whether user is already logged in or not
       */
      const statusIsLoggedIn = await checkLoggedInStatus(dispatch, false)
      if (statusIsLoggedIn) {
        return []
      }

      const { data: userData } = await doLogin({ username, password })

      const { api_key, is_admin } = userData
      if (api_key) {
        setUserData(userData)

        dispatch(setLoggedIn(true, is_admin))
        dispatch(setAjaxProcessing(false))
      }
      return userData
    } catch (error) {
      errorHandler(dispatch, error, true)
      dispatch(setAjaxProcessing(false))
      return []
    }
  }
}

/**
 * Set as not logged in & clear user data
 */
export const logout = () => {
  return dispatch => {
    dispatch(setLoggedIn(false, false))
    setUserData()
  }
}
