import React from 'react'
import { TEXT_SHIPMENT, TEXT_LOGOUT } from 'constants/AppLanguage'
import TopNavBar from 'components/common/TopNavBar'

const Link = require('react-router-dom').Link

const DashboardNavItems = () => (
  <TopNavBar>
    <div className="navbar-end">
      <Link className="navbar-item" to="/shipments" title={TEXT_SHIPMENT}>
        {TEXT_SHIPMENT}
      </Link>
      <Link className="navbar-item" to="/logout" title={TEXT_LOGOUT}>
        {TEXT_LOGOUT}
      </Link>
    </div>
  </TopNavBar>
)

export default DashboardNavItems
