import React from 'react'
import { TEXT_LOGIN } from 'constants/AppLanguage'
import TopNavBar from 'components/common/TopNavBar'
import { Link } from 'react-router-dom'

const SiteNavItems = () => (
  <TopNavBar>
    <div className="navbar-end">
      <div className="navbar-item">
        <div className="buttons">
          <Link
            className="navbar-item button is-light"
            to="/login"
            title={TEXT_LOGIN}
          >
            {TEXT_LOGIN}
          </Link>
        </div>
      </div>
    </div>
  </TopNavBar>
)

export default SiteNavItems
