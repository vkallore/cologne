import React from 'react'
import { Helmet } from 'react-helmet'

import DashboardNavItems from 'components/dashboard/common/DashboardNavItems'
import ErrorBoundary from 'components/common/ErrorBoundary'
import Footer from 'components/common/Footer'

import { TITLE_SHIPMENT } from 'constants/AppLanguage'

const ProtectedLayout = ({ children }) => {
  return (
    <>
      <Helmet>
        <title>{TITLE_SHIPMENT}</title>
      </Helmet>

      <DashboardNavItems />

      <div className="container">
        <div className="columns">
          <div className="column">
            <div className="section">
              <ErrorBoundary>{children}</ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default ProtectedLayout
