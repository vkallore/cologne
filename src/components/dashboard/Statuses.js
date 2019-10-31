import React from 'react'

import { TEXT_SELECT_STATUS } from 'constants/AppLanguage'
import { BIKER_STATUSES } from 'constants/AppConstants'

const Statuses = props => {
  return (
    <>
      <div className="select is-fullwidth">
        <select required onChange={props.onChange} value={props.value}>
          <option>{TEXT_SELECT_STATUS}</option>
          {BIKER_STATUSES.map(status => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
      </div>
    </>
  )
}

export default Statuses
