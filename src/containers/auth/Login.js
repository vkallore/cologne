import React from 'react'
import { connect } from 'react-redux'
import { withRouter, Redirect } from 'react-router-dom'
import { Helmet } from 'react-helmet'

import { login } from 'actions/AuthActions'

import LoginForm from 'components/auth/LoginForm'

import { FORM_LOGIN } from 'constants/AppForms'
import { TITLE_LOGIN, TEXT_LOGIN } from 'constants/AppLanguage'

import { getLoginRedirect } from 'helpers'

// const AlertBox = React.lazy(() => import('components/common/AlertBox'))

class Login extends React.Component {
  handleSubmit = async formFields => {
    const { login } = this.props

    await login({
      email: formFields.email,
      password: formFields.password
    })
  }

  render() {
    const { loggedIn, loggedInAdmin } = this.props
    if (loggedIn) {
      return <Redirect to={getLoginRedirect(loggedIn, loggedInAdmin)} />
    }
    const { ajaxProcessing, formFields } = this.props
    return (
      <React.Fragment>
        <Helmet>
          <title>{TITLE_LOGIN}</title>
        </Helmet>
        <h1 className="title">{TEXT_LOGIN}</h1>
        <div className="columns is-centered">
          <div className="column is-half">
            <LoginForm
              handleSubmit={this.handleSubmit}
              ajaxProcessing={ajaxProcessing}
              formFields={formFields}
              formModel={FORM_LOGIN}
            />
          </div>
        </div>
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  loggedIn: state.common.loggedIn,
  loggedInAdmin: state.common.loggedInAdmin,
  ajaxProcessing: state.common.ajaxProcessing,
  formFields: state.forms.login,
  apiResponse: state.common.apiResponse,
  apiResponseType: state.common.apiResponseType,
  allowMessageClear: state.common.allowMessageClear
})

export default withRouter(
  connect(
    mapStateToProps,
    { login }
  )(Login)
)
