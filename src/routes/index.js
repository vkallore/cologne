import React, { Suspense } from 'react'
import { Switch, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import PublicRoute from 'routes/PublicRoute'
import ProtectedRoute from 'routes/ProtectedRoute'
import { ContentLoader } from 'components/common/Loaders'

const Home = React.lazy(() => import('components/pages/Home'))

const PageNotFound = React.lazy(() => import('components/pages/PageNotFound'))

const Login = React.lazy(() => import('containers/auth/Login'))

const Dashboard = React.lazy(() => import('containers/dashboard/Dashboard'))

const Logout = React.lazy(() => import('containers/auth/Logout'))

class Routes extends React.Component {
  render() {
    return (
      <Suspense fallback={<ContentLoader />}>
        <Switch>
          <PublicRoute exact={true} path="/" component={Home} />
          <PublicRoute path="/login" component={Login} />

          <ProtectedRoute path="/dashboard" component={Dashboard} />

          <ProtectedRoute path="/logout" component={Logout} />

          <PublicRoute path="*" component={PageNotFound} />
        </Switch>
      </Suspense>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.common.loggedIn
})

export default withRouter(connect(mapStateToProps)(Routes))
