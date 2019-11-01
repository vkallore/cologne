export const SHOW_MESSAGE = 'SHOW_MESSAGE'
export const CLEAR_MESSAGE = 'CLEAR_MESSAGE'
export const SHOW_MODAL = 'SHOW_MODAL'
export const HIDE_MODAL = 'HIDE_MODAL'
export const SET_AJAX_PROCESSING = 'SET_AJAX_PROCESSING'
export const RESET_FORM = 'RESET_FORM'
export const CHANGE_FORM = 'CHANGE_FORM'
export const SET_LOGGED_IN = 'SET_LOGGED_IN'
export const USER_TYPE_MANAGER = 'MANAGER'
export const USER_IS_MANAGER = 'USER_IS_MANAGER'
export const SHIPMENT_DATA = 'SHIPMENT_DATA'
export const SHIPMENT_DETAILS = 'SHIPMENT_DETAILS'
export const BIKERS = 'BIKERS'

/* Header/Localstorage */
export const USER_API_KEY = 'token'

/* HTML/CSS related constants */
export const SUCCESS = 'success'
export const DANGER = 'danger'
export const INFO = 'info'
export const WARNING = 'warning'

/* Status */
export const WAITING = 'WAITING'
export const ASSIGNED = 'ASSIGNED'
export const PICKED_UP = 'PICKED_UP'
export const DELIVERED = 'DELIVERED'
export const ALL_STATUS_AND_COLORS = {
  [WAITING]: {
    label: WAITING,
    className: 'is-danger'
  },
  [ASSIGNED]: { label: ASSIGNED, className: 'is-warning' },
  [PICKED_UP]: { label: PICKED_UP, className: 'is-info' },
  [DELIVERED]: { label: DELIVERED, className: 'is-success' }
}
export const BIKER_STATUSES = [PICKED_UP, DELIVERED]
