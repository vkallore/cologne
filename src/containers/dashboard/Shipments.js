import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import ShipmentActionButton from 'components/dashboard/ShipmentActionButton'
import { SvgLoader } from 'components/common/Loaders'

import { getShipments } from 'actions/ShipmentActions'
import {
  TEXT_SHIPMENT,
  TITLE_SHIPMENT,
  TEXT_ASSIGN,
  TEXT_UPDATE
} from 'constants/AppLanguage'
import { toLocaleString } from 'helpers'
import { DELIVERED, ALL_STATUS_AND_COLORS } from 'constants/AppConstants'

const commonHeaderCols = ['#', 'Origin', 'Destination', 'Status', 'Time']
const managerHeaderCols = [...commonHeaderCols, 'Assignee']
const bikerHeaderCols = [...commonHeaderCols, 'Action']

class Shipments extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      shipments: [],
      shipmentHeaderCols: []
    }

    this.getData = this.getData.bind(this)
  }

  getData = async () => {
    const { getShipments } = this.props

    const shipmentDetails = await getShipments()
    const newState = { ...this.state, shipments: shipmentDetails }
    this.setState(newState)
  }

  componentDidMount() {
    this.getData()
  }

  headerCols() {
    const { loggedInManager } = this.props
    const headerCols = loggedInManager ? managerHeaderCols : bikerHeaderCols

    return headerCols.map((col, key) => {
      return <th key={key}>{col}</th>
    })
  }

  shipmentTableData() {
    const { loggedInManager } = this.props

    const { shipments } = this.state

    return shipments.map((shipment, index) => {
      const shipmentStatus = shipment.status
      const statusTagClass = shipmentStatus
        ? ALL_STATUS_AND_COLORS[shipmentStatus].className
        : ''

      return (
        <tr key={shipment.id}>
          <td>{++index}</td>
          <td>{shipment.origin}</td>
          <td>{shipment.destination}</td>
          <td>
            <span className={`tag ${statusTagClass}`}>{shipment.status}</span>
          </td>
          <td>{toLocaleString(shipment.status_update_time)}</td>
          {loggedInManager ? (
            <td>
              {shipment.assignee !== null ? (
                shipment.assignee.name
              ) : (
                <ShipmentActionButton id={shipment.id} text={TEXT_ASSIGN} />
              )}
            </td>
          ) : (
            <td>
              {shipment.status !== DELIVERED ? (
                <ShipmentActionButton id={shipment.id} text={TEXT_UPDATE} />
              ) : null}
            </td>
          )}
        </tr>
      )
    })
  }

  render() {
    const { ajaxProcessing } = this.props

    return (
      <>
        <Helmet>
          <title>{TITLE_SHIPMENT}</title>
        </Helmet>
        <h1 className="title">{TEXT_SHIPMENT}</h1>
        <div className="container">
          <div className="columns">
            <div className="column">
              <div className="table-container">
                <table className="table is-fullwidth is-bordered is-hoverable">
                  <thead>
                    <tr>{this.headerCols()}</tr>
                  </thead>
                  <tbody>{this.shipmentTableData()}</tbody>
                </table>
              </div>
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
      getShipments
    }
  )(Shipments)
)
