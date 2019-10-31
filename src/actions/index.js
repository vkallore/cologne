import { toastr } from 'react-redux-toastr'

import {
  SET_AJAX_PROCESSING,
  CHANGE_FORM,
  USER_API_KEY,
  SET_LOGGED_IN,
  SUCCESS,
  INFO,
  DANGER,
  WARNING,
  RESET_FORM,
  USER_IS_MANAGER,
  USER_TYPE_MANAGER
} from 'constants/AppConstants'
import { API_ERROR_404, API_COMMON_ERROR } from 'constants/AppMessage'

/**
 * Common error hander for API calls
 * @param {*} error
 */
export const errorHandler = (error, allowMessageClose = false) => {
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

  showMessage(message, detailedMessage, DANGER, allowMessageClose)
}

/**
 * Dispatch message
 * @param {*} dispatch
 * @param {string} message
 * @param {string} detailedMessage
 * @param {string} messageType
 * @param {boolean} allowMessageClose
 */
export const showMessage = async (
  message,
  detailedMessage,
  messageType,
  allowMessageClose = false
) => {
  message += await buildDetailedMessage(detailedMessage)
  let toasterFunc = 'error'
  switch (messageType) {
    case SUCCESS:
    case INFO:
    case WARNING:
      toasterFunc = messageType
      break
    default:
      break
  }

  toastr[toasterFunc](message, {
    showCloseButton: allowMessageClose
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
 * @param {*} userData
 */
export const setLoggedIn = (loggedIn = false, userData = {}) => {
  const isManager = !userData.userIsManager
    ? isManagerType(userData.type)
    : userData.userIsManager
  const userName = userData.name
  return { type: SET_LOGGED_IN, loggedIn, isManager, userName }
}

/**
 * Set user data to local storage
 * @param  {...any} loginData
 */
export const setUserData = ({ ...loginData }) => {
  const { token, type: userType } = loginData

  setLocalStorage(USER_API_KEY, token)
  const userIsManager = isManagerType(userType)
  setLocalStorage(
    USER_IS_MANAGER,
    userType !== undefined ? userIsManager : null
  )
}

/**
 * String comparision to check user type is Manager or not
 * @param {*} type
 */
const isManagerType = type => {
  return type === USER_TYPE_MANAGER
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
  return Promise.resolve(localStorage ? localStorage.getItem(key) : '')
}

/**
 * Reset the form
 * @param {string} form Form Type
 */
export const resetForm = form => {
  return { type: RESET_FORM, formType: form }
}
