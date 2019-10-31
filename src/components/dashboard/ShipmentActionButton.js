import React from 'react'
import { Link } from 'react-router-dom'

const ShipmentActionButton = props => {
  return (
    <Link className="button is-default btn-assign" to={`shipments/${props.id}`}>
      {props.text || ''}
    </Link>
  )
}

export default ShipmentActionButton
