import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import AssignButton from 'components/dashboard/AssignButton'
import { SvgLoader } from 'components/common/Loaders'

import { getShipments } from 'actions/ShipmentActions'
import { TEXT_SHIPMENT, TITLE_SHIPMENT } from 'constants/AppLanguage'
import { toLocaleString } from 'helpers'

const bikerHeaderCols = ['#', 'Origin', 'Destination', 'Status', 'Time']
const managerHeaderCols = [...bikerHeaderCols, 'Assignee']

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
      return (
        <tr key={shipment.id}>
          <td>{++index}</td>
          <td>{shipment.origin}</td>
          <td>{shipment.destination}</td>
          <td>{shipment.status}</td>
          <td>{toLocaleString(shipment.last_update)}</td>
          {loggedInManager ? (
            <td>
              {shipment.assignee !== null ? (
                shipment.assignee.name
              ) : (
                <AssignButton id={shipment.id} />
              )}
            </td>
          ) : null}
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
                <table className="table is-fullwidth">
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
