import React from 'react'

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
            <div className="container">{children}</div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}

export default PublicLayout
