import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const ShipmentDetailField = ({ faIcon, label, field }) => {
  return (
    <div className="field has-icons-left">
      <label className="label">
        <FontAwesomeIcon icon={faIcon} color="blue" /> {label}
      </label>
      <div className="control">{field}</div>
    </div>
  )
}

export default ShipmentDetailField
