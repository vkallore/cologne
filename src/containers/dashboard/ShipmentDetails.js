import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import {
  faPlaneDeparture,
  faPlaneArrival,
  faShippingFast,
  faClock,
  faMotorcycle
} from '@fortawesome/free-solid-svg-icons'

import ShipmentDetailField from 'components/dashboard/ShipmentDetailField'

import { SvgLoader } from 'components/common/Loaders'

import {
  getShipmentDetails,
  getBikers,
  assignBiker
} from 'actions/ShipmentActions'
import {
  TEXT_SHIPMENT_DETAILS,
  TITLE_SHIPMENT_DETAILS
} from 'constants/AppLanguage'
import { TEXT_ASSIGN, TEXT_CANCEL } from 'constants/AppLanguage'

import { toLocaleString } from 'helpers'
import { API_CONTACT_SUPPORT } from 'constants/AppMessage'

const Bikers = React.lazy(() => import('components/dashboard/Bikers'))

class ShipmentDetails extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      shipment: null,
      bikers: [],
      assignee: null,
      noAccess: false
    }

    this.getShipmentData = this.getShipmentData.bind(this)
    this.updateBikerState = this.updateBikerState.bind(this)
    this.assignBiker = this.assignBiker.bind(this)
  }

  getShipmentData = async () => {
    const { getShipmentDetails, getBikers, match } = this.props
    const { id: shipmentId } = match.params
    let { bikers } = this.state

    const shipmentDetails = await getShipmentDetails(shipmentId)

    if (shipmentDetails === null) {
      this.setState({ noAccess: true })
      return
    }

    if (shipmentDetails.status === 'WAITING') {
      bikers = await getBikers()
    }
    const newState = { ...this.state, shipment: shipmentDetails, bikers }
    this.setState(newState)
  }

  componentDidMount() {
    this.getShipmentData()
  }

  updateBikerState(e) {
    const assigneeId = e.target.value
    this.setState({
      assignee: assigneeId
    })
  }

  async assignBiker(e) {
    e.preventDefault()

    const { assignBiker, ajaxProcessing } = this.props

    if (ajaxProcessing) {
      return
    }

    const { shipment, assignee } = this.state
    const { id } = shipment

    const updatedShipment = await assignBiker({ id, assignee })

    if (updatedShipment !== false) {
      this.setState({ shipment: updatedShipment, assignee: null })
    }
  }

  shipmentForm() {
    const { shipment, bikers } = this.state
    const { loggedInManager, ajaxProcessing } = this.props

    if (shipment === null || shipment === undefined || shipment.length === 0) {
      return null
    }

    return (
      <form className="box" onSubmit={this.assignBiker}>
        <ShipmentDetailField
          faIcon={faPlaneDeparture}
          label="Origin"
          field={shipment.origin}
        />
        <ShipmentDetailField
          faIcon={faPlaneArrival}
          label="Destination"
          field={shipment.destination}
        />
        <ShipmentDetailField
          faIcon={faShippingFast}
          label="Status"
          field={shipment.status}
        />

        <ShipmentDetailField
          faIcon={faClock}
          label="Status Updated Time"
          field={toLocaleString(shipment.last_update)}
        />

        {loggedInManager && shipment.assignee !== null && (
          <ShipmentDetailField
            faIcon={faMotorcycle}
            label="Assignee"
            field={`${shipment.assignee.name} (${shipment.assignee.email})`}
          />
        )}

        {loggedInManager && shipment.assignee === null && (
          <>
            <ShipmentDetailField
              faIcon={faMotorcycle}
              label="Assignee"
              field={
                <Bikers bikers={bikers} onChange={this.updateBikerState} />
              }
            />
            <div className="field is-grouped">
              <div className="control">
                <button className="button is-link" disabled={ajaxProcessing}>
                  {TEXT_ASSIGN}
                </button>
              </div>
              <div className="control">
                <Link className="button is-light" to="/shipments">
                  {TEXT_CANCEL}
                </Link>
              </div>
            </div>
          </>
        )}
      </form>
    )
  }

  noAccessBlock() {
    return (
      <div className="notification is-danger no-access">
        Sorry, you do not have access to this shipment!
        <br />
        {API_CONTACT_SUPPORT}
      </div>
    )
  }

  render() {
    const { ajaxProcessing } = this.props
    const { noAccess } = this.state

    return (
      <>
        <Helmet>
          <title>{TITLE_SHIPMENT_DETAILS}</title>
        </Helmet>
        <h1 className="title">{TEXT_SHIPMENT_DETAILS}</h1>
        <div className="container">
          <div className="columns">
            <div className="column is-half is-offset-one-quarter">
              {!noAccess ? this.shipmentForm() : this.noAccessBlock()}
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
      getShipmentDetails,
      getBikers,
      assignBiker
    }
  )(ShipmentDetails)
)
