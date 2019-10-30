import React from 'react'

import ErrorBoundary from 'components/common/ErrorBoundary'
import SiteNavItems from 'components/common/SiteNavItems'
import Footer from 'components/common/Footer'

const PublicLayout = ({ children }) => {
  return (
    <>
      <section>
        <SiteNavItems />
      </section>
      <div className="columns">
        <div className="column">
          <div className="section">
            <div className="container">
              <ErrorBoundary>{children}</ErrorBoundary>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default PublicLayout
