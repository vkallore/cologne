import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet'
import DateTimePicker from 'react-datetime-picker'

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
  assignBiker,
  updateShipment
} from 'actions/ShipmentActions'
import {
  TEXT_SHIPMENT_DETAILS,
  TITLE_SHIPMENT_DETAILS,
  TEXT_UPDATE
} from 'constants/AppLanguage'
import { TEXT_ASSIGN, TEXT_CANCEL } from 'constants/AppLanguage'
import { WAITING, DELIVERED } from 'constants/AppConstants'

import { toLocaleString } from 'helpers'
import { API_CONTACT_SUPPORT } from 'constants/AppMessage'

const Bikers = React.lazy(() => import('components/dashboard/Bikers'))
const Statuses = React.lazy(() => import('components/dashboard/Statuses'))

class ShipmentDetails extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      assignee: null,
      statusDate: new Date(),
      updatedStatus: null,
      noAccess: false
    }

    this.getShipmentData = this.getShipmentData.bind(this)
    this.onDateChange = this.onDateChange.bind(this)
    this.updateBikerState = this.updateBikerState.bind(this)
    this.updateStatusState = this.updateStatusState.bind(this)
    this.assignBiker = this.assignBiker.bind(this)
    this.submitUpdateShipment = this.submitUpdateShipment.bind(this)
  }

  getShipmentData = async () => {
    const { getShipmentDetails, getBikers, match } = this.props
    const { id: shipmentId } = match.params

    const shipmentDetails = await getShipmentDetails(shipmentId)

    if (shipmentDetails === null) {
      this.setState({ noAccess: true })
      return
    }

    if (shipmentDetails.status === WAITING) {
      await getBikers()
    }
  }

  componentDidMount() {
    this.getShipmentData()
  }

  /**
   * Update biker state
   * @param {*} e
   */
  updateBikerState(e) {
    const assigneeId = e.target.value
    this.setState({
      assignee: assigneeId
    })
  }

  /**
   * Update shipment status state
   * @param {*} e
   */
  updateStatusState(e) {
    const status = e.target.value
    this.setState({
      updatedStatus: status
    })
  }

  /**
   * Manager submit
   */
  async assignBiker(e) {
    e.preventDefault()

    const { assignBiker, ajaxProcessing, shipment } = this.props

    if (ajaxProcessing) {
      return
    }

    const { assignee } = this.state
    const { id } = shipment

    const updatedShipment = await assignBiker({ id, assignee })

    if (updatedShipment !== false) {
      this.setState({ assignee: null })
    }
  }

  /**
   * Biker submit
   */
  async submitUpdateShipment(e) {
    e.preventDefault()

    const { updateShipment, ajaxProcessing, shipment } = this.props

    if (ajaxProcessing) {
      return
    }

    const { statusDate, updatedStatus } = this.state
    const { id } = shipment

    const updatedShipment = await updateShipment({
      id,
      date: statusDate,
      status: updatedStatus
    })

    if (updatedShipment !== false) {
      this.setState({
        assignee: null,
        statusDate: new Date(),
        updatedStatus: null
      })
    }
  }

  /**
   * Show shipment update form
   */
  shipmentForm() {
    const { shipment, bikers, loggedInManager } = this.props

    if (shipment === null || shipment === undefined || shipment.length === 0) {
      return null
    }

    return (
      <form
        className="box"
        onSubmit={
          loggedInManager ? this.assignBiker : this.submitUpdateShipment
        }
      >
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
          field={toLocaleString(shipment.status_update_time)}
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
            {this.formButtons()}
          </>
        )}

        {this.updateBox()}
      </form>
    )
  }

  /**
   * Biker's update box
   */
  updateBox() {
    const { statusDate, updatedStatus } = this.state
    const { shipment, loggedInManager } = this.props

    /* We do not need this for manager & delivered shipments */
    if (loggedInManager || shipment.status === DELIVERED) {
      return null
    }

    return (
      <>
        <div className="box">
          <h3 className="subtitle">Update Status &amp; Time</h3>
          <ShipmentDetailField
            faIcon={faShippingFast}
            label="Status"
            className="is-fullwidth"
            field={
              <Statuses
                onChange={this.updateStatusState}
                value={updatedStatus}
              />
            }
          />
          <ShipmentDetailField
            faIcon={faClock}
            label="Time"
            field={
              <DateTimePicker
                onChange={this.onDateChange}
                value={statusDate}
                maxDate={new Date()}
              />
            }
          />
        </div>
        {this.formButtons()}
      </>
    )
  }

  /**
   * Form footer buttons
   */
  formButtons() {
    const { loggedInManager, ajaxProcessing } = this.props

    return (
      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className="button is-link"
            disabled={ajaxProcessing}
          >
            {loggedInManager ? TEXT_ASSIGN : TEXT_UPDATE}
          </button>
        </div>
        <div className="control">
          <Link className="button is-light" to="/shipments">
            {TEXT_CANCEL}
          </Link>
        </div>
      </div>
    )
  }

  /**
   * Handle date change
   * @param {*} date
   */
  onDateChange(date) {
    this.setState({ statusDate: date })
  }

  /**
   * User has no access to the shipment
   */
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
  ajaxProcessing: state.common.ajaxProcessing,
  shipment: state.shipment.shipmentDetails,
  bikers: state.shipment.bikers
})

export default withRouter(
  connect(
    mapStateToProps,
    {
      getShipmentDetails,
      getBikers,
      assignBiker,
      updateShipment
    }
  )(ShipmentDetails)
)
