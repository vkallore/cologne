import {
  errorHandler,
  setUserData,
  resetForm,
  setAjaxProcessing,
  setLoggedIn,
  getLocalStorage
} from 'actions'
import { USER_API_KEY, USER_IS_MANAGER } from 'constants/AppConstants'
import { FORM_LOGIN } from 'constants/AppForms'

import { doLogin, isTokenAlive } from 'services/auth'

/**
 * Login form
 * @param {string} email
 * @param {string} password
 */
export const login = ({ email, password }) => {
  return async dispatch => {
    dispatch(setAjaxProcessing(true))
    try {
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
      errorHandler(error, true)
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
    // Clear state
    dispatch(setLoggedIn())
    setUserData()
  }
}

/**
 * Check and set as logged in
 * @param {object} dispatch
 * @param {boolean} setAsLoggedIn - Whether to set the state as
 * @param {boolean} checkTokenIsAlive - Check whether user's token is alive/active
 * logged in or not
 * To prevent state update, pass it as `false`
 */
export const checkAndSetLogin = async dispatch => {
  let isLoggedIn = false
  const userToken = await getLocalStorage(USER_API_KEY)
  let userIsManager = await getLocalStorage(USER_IS_MANAGER)
  // String to Boolean
  userIsManager = JSON.parse(userIsManager)
  if (userToken !== null) {
    try {
      /* While reload */
      const { data: tokenData } = await isTokenAlive()
      // Use tokenData to store the user's name
      if (tokenData.name) {
        isLoggedIn = true
        dispatch(
          setLoggedIn(isLoggedIn, { userIsManager, name: tokenData.name })
        )
      }
    } catch (err) {
      errorHandler(err, true)
    }
  }
  return isLoggedIn
}
