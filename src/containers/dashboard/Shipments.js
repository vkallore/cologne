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
      shipmentHeaderCols: []
    }

    this.headerCols = []

    this.getData = this.getData.bind(this)
  }

  getData = async () => {
    const { getShipments } = this.props

    await getShipments()
  }

  componentDidMount() {
    this.getData()
  }

  drawHeaderCols() {
    const { loggedInManager } = this.props
    this.headerCols = loggedInManager ? managerHeaderCols : bikerHeaderCols

    return this.headerCols.map((col, key) => {
      return <th key={key}>{col}</th>
    })
  }

  shipmentTableData() {
    const { loggedInManager, ajaxProcessing, shipments } = this.props

    if (ajaxProcessing === true) {
      return null
    }

    if (shipments.length > 0) {
      return shipments.map((shipment, index) => {
        const shipmentStatus = shipment.status
        const statusTagClass = shipmentStatus
          ? ALL_STATUS_AND_COLORS[shipmentStatus].className
          : ''

        /* Column index to add label programatically */
        let columnIndex = 0

        return (
          <tr key={shipment.id}>
            <td data-label={this.headerCols[columnIndex++]}>{++index}</td>
            <td data-label={this.headerCols[columnIndex++]}>
              {shipment.origin}
            </td>
            <td data-label={this.headerCols[columnIndex++]}>
              {shipment.destination}
            </td>
            <td data-label={this.headerCols[columnIndex++]}>
              <span className={`tag ${statusTagClass}`}>{shipment.status}</span>
            </td>
            <td data-label={this.headerCols[columnIndex++]}>
              {toLocaleString(shipment.status_update_time)}
            </td>
            {loggedInManager ? (
              <td data-label={this.headerCols[columnIndex++]}>
                {shipment.assignee !== null ? (
                  shipment.assignee.name
                ) : (
                  <ShipmentActionButton id={shipment.id} text={TEXT_ASSIGN} />
                )}
              </td>
            ) : (
              <td data-label={this.headerCols[columnIndex++]}>
                {shipment.status !== DELIVERED ? (
                  <ShipmentActionButton id={shipment.id} text={TEXT_UPDATE} />
                ) : null}
              </td>
            )}
          </tr>
        )
      })
    } else {
      return (
        <tr>
          <td
            colSpan={
              loggedInManager
                ? managerHeaderCols.length
                : bikerHeaderCols.length
            }
          >
            <div className="notification is-danger has-text-centered">
              No shipment found
            </div>
          </td>
        </tr>
      )
    }
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
                <table className="table is-fullwidth is-bordered responsive">
                  <thead>
                    <tr>{this.drawHeaderCols()}</tr>
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
  ajaxProcessing: state.common.ajaxProcessing,
  shipments: state.shipment.shipments
})

export default withRouter(
  connect(
    mapStateToProps,
    {
      getShipments
    }
  )(Shipments)
)
