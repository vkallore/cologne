import {
  errorHandler,
  setUserData,
  resetForm,
  setAjaxProcessing,
  checkLoggedInStatus,
  setLoggedIn
} from 'actions'
import { FORM_LOGIN } from 'constants/AppForms'

import { doLogin } from 'services/auth'

/**
 * Login form
 * @param {string} email
 * @param {string} password
 */
export const login = ({ email, password }) => {
  return async dispatch => {
    dispatch(setAjaxProcessing(true))
    try {
      /**
       * Check whether user is already logged in or not
       */
      const statusIsLoggedIn = await checkLoggedInStatus(dispatch, false)
      if (statusIsLoggedIn) {
        return []
      }

      const { data: userData } = await doLogin({ email, password })

      const { token } = userData
      if (token) {
        setUserData(userData)

        dispatch(resetForm(FORM_LOGIN))
        dispatch(setLoggedIn(true, userData))
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
