import React from 'react'
import { TEXT_LOGIN } from 'constants/AppLanguage'
import TopNavBar from 'components/common/TopNavBar'
import { Link } from 'react-router-dom'

const SiteNavItems = () => (
  <TopNavBar>
    <div className="navbar-end">
      <span className="navbar-item">
        <Link className="button is-primary" to="/login" title={TEXT_LOGIN}>
          {TEXT_LOGIN}
        </Link>
      </span>
    </div>
  </TopNavBar>
)

export default SiteNavItems
