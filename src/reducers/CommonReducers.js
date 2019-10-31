import {
  SET_AJAX_PROCESSING,
  SET_LOGGED_IN,
  SHOW_MESSAGE,
  CLEAR_MESSAGE,
  CHANGE_FORM
} from 'constants/AppConstants'

const initialState = {
  ajaxProcessing: false,
  loggedIn: false,
  loggedInManager: false,
  loggedUserName: '',
  apiResponse: '',
  apiResponseType: '',
  allowMessageClear: false
}

export const commonReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AJAX_PROCESSING:
      return setAjaxProcessing(state, action)
    case SET_LOGGED_IN:
      return setLoggedIn(state, action)
    case SHOW_MESSAGE:
      return showMessage(state, action)
    case CHANGE_FORM:
    case CLEAR_MESSAGE:
      return showMessage(state, {
        apiResponse: '',
        apiResponseType: '',
        allowMessageClear: false
      })
    default:
      return state
  }
}

/**
 * Show message
 * @param {*} state
 * @param {*} action
 */
const showMessage = (state, action) => {
  return {
    ...state,
    apiResponse: action.apiResponse,
    apiResponseType: action.apiResponseType,
    allowMessageClear: action.allowMessageClear
  }
}

/**
 * Set state as ajax processing is ON/OFF
 * @param {*} state
 * @param {*} action
 */
const setAjaxProcessing = (state, action) => {
  return {
    ...state,
    ajaxProcessing: action.ajaxProcessing
  }
}

/**
 * Set state as logged in TRUE/FALSE
 * @param {*} state
 * @param {*} action
 */
const setLoggedIn = (state, action) => {
  return {
    ...state,
    loggedIn: action.loggedIn,
    loggedInManager: action.isManager,
    loggedUserName: action.userName
  }
}
