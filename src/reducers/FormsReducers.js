import { RESET_FORM, CHANGE_FORM } from 'constants/AppConstants'
import { FORM_LOGIN } from 'constants/AppForms'

const initialState = {
  login: {
    username: '',
    password: ''
  }
}

export const formsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_FORM:
      return resetForm(state, action)

    case CHANGE_FORM:
      return updateForm(state, action)

    default:
      return state
  }
}

const resetForm = (state, action) => {
  switch (action.formType) {
    case FORM_LOGIN:
      return {
        ...state,
        login: initialState.login
      }

    default:
      break
  }
}

const updateForm = (state, action) => {
  switch (action.formType) {
    case FORM_LOGIN:
      return {
        ...state,
        login: { ...state.login, ...action.newState }
      }

    default:
      return state
  }
}
