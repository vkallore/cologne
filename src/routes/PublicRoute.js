import React, { Suspense } from 'react'
import { Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import PublicLayout from 'layouts/PublicLayout'
import { ContentLoader } from 'components/common/Loaders'

import { clearMessage } from 'actions'

const PublicRoute = ({ component: Component, ...props }) => {
  console.log(Component)
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

const mapDispatchToProps = dispatch => ({
  clearMessage: () => {
    dispatch(clearMessage())
  }
})

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PublicRoute)
)
