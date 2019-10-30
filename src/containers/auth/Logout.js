import React from 'react'
import { connect } from 'react-redux'
import { Redirect, withRouter } from 'react-router-dom'

import { logout } from 'actions/AuthActions'

class Logout extends React.Component {
  componentDidMount() {
    this.props.dispatch(logout())
  }
  render() {
    return <Redirect to="/" />
  }
}

export default withRouter(connect()(Logout))
