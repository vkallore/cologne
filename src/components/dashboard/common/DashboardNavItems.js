import React from 'react'
import { connect } from 'react-redux'
import { TEXT_SHIPMENT, TEXT_LOGOUT } from 'constants/AppLanguage'
import TopNavBar from 'components/common/TopNavBar'
import { useToggleState } from 'helpers/HooksHelpers'

const Link = require('react-router-dom').Link

const DashboardNavItems = ({ userName }) => {
  const [accountMenuOpen, setAccountMenuOpen] = useToggleState('')

  const accountMenuClassName = accountMenuOpen ? 'is-active' : ''

  return (
    <TopNavBar>
      <div className="navbar-end">
        <Link className="navbar-item" to="/shipments" title={TEXT_SHIPMENT}>
          {TEXT_SHIPMENT}
        </Link>
        <div className={`navbar-item has-dropdown ${accountMenuClassName}`}>
          <a
            className="navbar-link"
            onClick={() => setAccountMenuOpen()}
            href="#"
          >
            {userName}
          </a>
          <div className="navbar-dropdown is-right">
            <Link className="navbar-item" to="/logout" title={TEXT_LOGOUT}>
              {TEXT_LOGOUT}
            </Link>
          </div>
        </div>
      </div>
    </TopNavBar>
  )
}

export default connect(state => ({
  userName: state.common.loggedUserName
}))(DashboardNavItems)
