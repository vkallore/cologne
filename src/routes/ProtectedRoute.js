import React, { Suspense } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import PublicLayout from 'layouts/PublicLayout'
import ProtectedLayout from 'layouts/ProtectedLayout'
import { ContentLoader } from 'components/common/Loaders'

const Login = React.lazy(() => import('containers/auth/Login'))

const ProtectedRoute = ({
  component: Component,
  lazyLoad = true,
  ...props
}) => {
  const { loggedIn } = props
  if (loggedIn) {
    return (
      <ProtectedLayout>
        <Suspense fallback={<ContentLoader />}>
          {!lazyLoad ? (
            <Route {...props} component={Component} />
          ) : (
            <Route {...props} render={() => <Component />} />
          )}
        </Suspense>
      </ProtectedLayout>
    )
  } else {
    return (
      <PublicLayout>
        <Suspense fallback={<ContentLoader />}>
          <Route {...props} render={() => <Login />} />
        </Suspense>
      </PublicLayout>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.common.loggedIn
})

export default withRouter(connect(mapStateToProps)(ProtectedRoute))
