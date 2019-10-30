import React, { Component, Suspense } from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import CommonModal from 'containers/common/CommonModal'

import Routes from 'routes'

import { APP_NAME } from 'constants/AppLanguage'

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{APP_NAME}</title>
        </Helmet>
        <Router>
          <Routes />
        </Router>
        <Suspense fallback={null}>
          <CommonModal />
        </Suspense>
      </React.Fragment>
    )
  }
}

export default App
