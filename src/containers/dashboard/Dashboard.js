import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { SvgLoader } from 'components/common/Loaders'

import { getShipments } from 'actions/ShipmentActions'
import { TEXT_DASHBOARD, TITLE_DASHBOARD } from '../../constants/AppLanguage'

const BikerHeaderRows = ['#', 'Origin', 'Destination', 'Status', 'Time']

const ManagerHeaderRows = [...BikerHeaderRows, 'Assignee']

class Dashboard extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      shipments: [],
      shipmentHeaderRows: []
    }

    this.getData = this.getData.bind(this)
  }

  getData = async () => {
    const { getShipments } = this.props

    const shipmentDetails = await getShipments()
    const newState = { ...this.state, shipments: shipmentDetails }
    console.log(newState)
    this.setState(newState)
  }

  componentDidMount() {
    this.getData()
  }

  render() {
    const { ajaxProcessing, loggedInManager } = this.props
    const { shipments } = this.state

    console.log(loggedInManager)

    return (
      <>
        <Helmet>
          <title>{TITLE_DASHBOARD}</title>
        </Helmet>
        <h1>{TEXT_DASHBOARD}</h1>
        <div className="container">
          <div className="columns">
            <div className="column is-half">
              <div className="table-container">
                <table className="table is-fullwidth">
                  <tbody>
                    <th></th>
                  </tbody>
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
getShipments()

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
  )(Dashboard)
)
