import React, { Suspense } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import PublicLayout from 'layouts/PublicLayout'
import { ContentLoader } from 'components/common/Loaders'

const PublicRoute = ({ component: Component, ...props }) => {
  return (
    <PublicLayout>
      <Suspense fallback={<ContentLoader />}>
        <Route {...props} render={() => <Component />} />
      </Suspense>
    </PublicLayout>
  )
}

const mapStateToProps = state => ({
  loggedIn: state.common.loggedIn
})

export default withRouter(connect(mapStateToProps)(PublicRoute))
