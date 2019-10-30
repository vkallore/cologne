import {
  SHOW_MODAL,
  HIDE_MODAL,
  SET_AJAX_PROCESSING,
  CHANGE_FORM,
  USER_API_KEY,
  SET_LOGGED_IN,
  SHOW_MESSAGE,
  CSS_CLASS_DANGER,
  CLEAR_MESSAGE,
  RESET_FORM,
  USER_IS_MANAGER
} from 'constants/AppConstants'
import {
  API_ERROR_404,
  API_COMMON_ERROR,
  LOGGED_IN_ALREADY,
  LOGGED_IN_NOT
} from 'constants/AppMessage'

/**
 * Common error hander for API calls
 * @param {*} error
 */
export const errorHandler = (dispatch, error, allowMessageClose = false) => {
  let message = ''
  let detailedMessage = []
  try {
    if (error.response) {
      /* Handle response */
      const httpErrorCode = error.response.status

      /* Handle error code for 404 & others seperately */
      switch (httpErrorCode) {
        case 404:
          message = API_ERROR_404
          break

        case 500:
          try {
            message = error.response.data.message
            detailedMessage = error.response.data.data
          } catch (err) {
            message = API_COMMON_ERROR
          }
          break

        default:
          message = error.response.data.message
          detailedMessage = error.response.data.data
          break
      }
    } else if (error.request) {
      /* Handle Request Timeout */
      message = error.request.statusText
    } else if (error.message) {
      message = error.message
      /* Handle any other error */
    } else if (typeof error === 'string') {
      message = error
    }
    if (message === '' || message === undefined) {
      message = API_COMMON_ERROR
    }
  } catch (err) {
    message = API_COMMON_ERROR
  }

  dispatchMessage(
    dispatch,
    message,
    detailedMessage,
    CSS_CLASS_DANGER,
    allowMessageClose
  )
}

/**
 * Dispatch message
 * @param {*} dispatch
 * @param {*} message
 */
export const dispatchMessage = async (
  dispatch,
  message,
  detailedMessage,
  messageType,
  allowMessageClose = false
) => {
  message += await buildDetailedMessage(detailedMessage)
  dispatch({
    type: SHOW_MESSAGE,
    apiResponse: message,
    apiResponseType: messageType,
    allowMessageClear: allowMessageClose
  })
}

/**
 * Split detailed message
 * and
 * construct message string
 * by prefixing new line character
 * @param {array} detailedMessage
 */
export const buildDetailedMessage = detailedMessage =>
  new Promise(resolve => {
    let strDetailedMessage = ''
    try {
      detailedMessage.forEach(message => {
        strDetailedMessage += `\n - ${message}`
      })
    } catch (err) {}
    resolve(strDetailedMessage)
  })

/**
 * Clear the message shown
 */
export const clearMessage = () => {
  return dispatch => {
    dispatch({
      type: CLEAR_MESSAGE
    })
  }
}

/**
 * Show the modal
 * @param {*} modalActions
 */
export const showModal = modalActions => {
  return dispatch => {
    dispatch({ type: SHOW_MODAL, modalActions })
  }
}

/**
 * Close the modal
 * @param {*} modalActions
 */
export const closeModal = modalActions => {
  return dispatch => {
    dispatch({ type: HIDE_MODAL, modalActions })
  }
}

/**
 * Handle change in login/register forms
 * @param {*} formType
 * @param {*} newState
 */
export const changeFormValue = (formType, newState) => {
  return { type: CHANGE_FORM, newState, formType: formType }
}

/**
 * Set state as ajax processing is ON/OFF
 * @param {boolean} ajaxProcessing
 */
export const setAjaxProcessing = ajaxProcessing => {
  return { type: SET_AJAX_PROCESSING, ajaxProcessing }
}

/**
 * Set state as logged in TRUE/FALSE
 * &
 * Set logged in as admin or not
 * @param {boolean} loggedIn
 * @param {boolean} isAdmin
 */
export const setLoggedIn = (loggedIn, isAdmin) => {
  return { type: SET_LOGGED_IN, loggedIn, isAdmin }
}

/**
 * Set user data to local storage
 * @param  {...any} loginData
 */
export const setUserData = ({ ...loginData }) => {
  const { token } = loginData

  setLocalStorage(USER_API_KEY, token)
  setLocalStorage(USER_IS_MANAGER, loginData.type === 'Manager')
}

/**
 * Set local storage
 * @param {*} key
 * @param {*} value
 */
export const setLocalStorage = (key, value) => {
  if (value !== null && value !== undefined) {
    localStorage.setItem(key, value)
  } else {
    localStorage.removeItem(key)
  }
}

/**
 * Get local storage
 * @param {*} key
 */
export const getLocalStorage = key => {
  return localStorage ? localStorage.getItem(key) : ''
}

/**
 * Check and set as logged in
 * @param {object} dispatch
 * @param {boolean} setAsLoggedIn - Whether to set the state as
 * @param {boolean} checkTokenIsAlive - Check whether user's token is alive/active
 * logged in or not
 * To prevent state update, pass it as `false`
 */
export const checkAndSetLogin = async (dispatch, setAsLoggedIn = true) => {
  let isLoggedIn = false
  const userApiKey = await getLocalStorage(USER_API_KEY)
  let userIsAdmin = await getLocalStorage(USER_IS_MANAGER)
  // String to Boolean
  userIsAdmin = JSON.parse(userIsAdmin)
  if (userApiKey) {
    isLoggedIn = true
  }

  if (setAsLoggedIn === true) {
    dispatch(setLoggedIn(isLoggedIn, userIsAdmin))
  }
  return isLoggedIn
}

/**
 * Check whether user is already logged in or not
 * @param {*} dispatch
 * @param {*} fromProtectectedRoute - Whether to check already logged in status or not
 * @return boolean - True if token exists
 */
export const checkLoggedInStatus = async (
  dispatch,
  fromProtectectedRoute = true
) => {
  const isLoggedIn = await checkAndSetLogin(
    dispatch,
    true,
    fromProtectectedRoute
  )
  let message = ''
  if (!fromProtectectedRoute && isLoggedIn) {
    message = LOGGED_IN_ALREADY
  } else if (fromProtectectedRoute && !isLoggedIn) {
    message = LOGGED_IN_NOT
  } else {
    return isLoggedIn
  }
  errorHandler(dispatch, message, true)
  dispatch(setAjaxProcessing(false))
  return false
}

/**
 * Reset the form
 * @param {string} form Form Type
 */
export const resetForm = form => {
  return { type: RESET_FORM, formType: form }
}
