import React from 'react'

import ErrorBoundary from 'components/common/ErrorBoundary'
import SiteNavItems from 'components/common/SiteNavItems'
import Footer from 'components/common/Footer'

const PublicLayout = ({ children }) => {
  return (
    <>
      <section className="hero is-fullheight">
        <div className="hero-head">
          <SiteNavItems />
          <div className="hero-body">
            <div className="container has-text-centered">
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

export default PublicLayout
