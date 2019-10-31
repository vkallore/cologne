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
      <section className="hero is-fullheight">
        <div className="hero-head">
          <DashboardNavItems />

          <div className="hero-body">
            <div className="container">
              <div className="columns">
                <div className="column">
                  <div className="section">
                    <div className="container">
                      <ErrorBoundary>{children}</ErrorBoundary>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-foot">
          <Footer />
        </div>
      </section>
    </>
  )
}

export default ProtectedLayout
