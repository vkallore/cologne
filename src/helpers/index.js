/**
 * Convert date time to ISO String
 * @param {*} param0
 */
export const toISOString = ({ date, time, strDateTime }) => {
  if (
    (strDateTime === undefined || strDateTime === '') &&
    date !== undefined &&
    time !== undefined
  ) {
    strDateTime = `${date} ${time}`
  }
  return new Date(strDateTime).toISOString()
}

/**
 * Convert the ISO format date & time to locale
 * @param {*} isoString Time in ISO format
 */
export const toLocaleString = isoString => {
  if (isoString === undefined || isoString === null || isoString === '') {
    return null
  }
  return new Date(isoString).toLocaleString()
}

/**
 * Convert minutes to hours
 */
export const toHours = minutes => {
  minutes = typeof minutes === 'number' ? minutes : 0
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`
}

/**
 * Get the redirect URL
 * @param {boolean} loggedIn
 */
export const getLoginRedirect = loggedIn => {
  return !loggedIn ? '/' : '/shipments'
}
