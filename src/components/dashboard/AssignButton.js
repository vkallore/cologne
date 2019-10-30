import React from 'react'
import { Link } from 'react-router-dom'

import { TEXT_ASSIGN } from 'constants/AppLanguage'

const AssignButton = props => {
  return (
    <Link className="button is-default btn-assign" to={`shipments/${props.id}`}>
      {TEXT_ASSIGN}
    </Link>
  )
}

export default AssignButton
