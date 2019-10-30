import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { SvgLoader } from 'components/common/Loaders'

import { getShipmentDetails } from 'actions/ShipmentActions'
import {
  TEXT_SHIPMENT_DETAILS,
  TITLE_SHIPMENT_DETAILS
} from 'constants/AppLanguage'

import { toLocaleString } from 'helpers'

class ShipmentDetails extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      shipment: null
    }

    this.getData = this.getData.bind(this)
  }

  getData = async () => {
    const { getShipmentDetails, match } = this.props
    const { id: shipmentId } = match.params

    const shipmentDetails = await getShipmentDetails(shipmentId)
    const newState = { ...this.state, shipment: shipmentDetails }
    this.setState(newState)
  }

  componentDidMount() {
    this.getData()
  }

  shipmentForm() {
    const { shipment } = this.state
    const { loggedInManager } = this.props

    if (shipment === null || shipment === undefined || shipment.length === 0) {
      return null
    }

    return (
      <form className="box">
        <div className="field">
          <label className="label">Origin</label>
          <div className="control">{shipment.origin}</div>
        </div>
        <div className="field">
          <label className="label">Destination</label>
          <div className="control">{shipment.destination}</div>
        </div>
        <div className="field">
          <label className="label">Status</label>
          <div className="control">{shipment.status}</div>
        </div>
        <div className="field">
          <label className="label">Status Time</label>
          <div className="control">{toLocaleString(shipment.last_update)}</div>
        </div>

        {loggedInManager && shipment.assignee !== null && (
          <div className="field">
            <label className="label">Assignee</label>
            <div className="control">
              {shipment.assignee.name} ({shipment.assignee.email})
            </div>
          </div>
        )}

        {loggedInManager && shipment.assignee === null && (
          <div className="field">
            <label className="label">Assignee</label>
            <div className="control">ASSIGN TO BIKER</div>
          </div>
        )}
      </form>
    )
  }

  render() {
    const { ajaxProcessing } = this.props

    return (
      <>
        <Helmet>
          <title>{TITLE_SHIPMENT_DETAILS}</title>
        </Helmet>
        <h1 className="title">{TEXT_SHIPMENT_DETAILS}</h1>
        <div className="container">
          <div className="columns">
            <div className="column is-half is-offset-one-quarter">
              {this.shipmentForm()}
            </div>
          </div>

          <div className="ajaxloader">{ajaxProcessing && <SvgLoader />}</div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.common.loggedIn,
  loggedInManager: state.common.loggedInManager,
  ajaxProcessing: state.common.ajaxProcessing
})

export default withRouter(
  connect(
    mapStateToProps,
    {
      getShipmentDetails
    }
  )(ShipmentDetails)
)
