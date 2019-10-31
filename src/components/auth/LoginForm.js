import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLock,
  faEye,
  faEyeSlash,
  faUser
} from '@fortawesome/free-solid-svg-icons'

import Input from 'components/form-elements/Input'
import Button from 'components/form-elements/Button'
import { SvgLoader } from 'components/common/Loaders'

import { TEXT_LOGIN } from 'constants/AppLanguage'
import { FIELD_EMAIL, FIELD_PASSWORD } from 'constants/AppForms'

import { useToggleState } from 'helpers/HooksHelpers'

const LoginForm = props => {
  const [showPassword, setShowPassword] = useToggleState(false)

  const { formFields, handleSubmit, ajaxProcessing, formModel } = props

  const submitForm = event => {
    event.preventDefault()
    handleSubmit(formFields)
  }

  return (
    <form onSubmit={submitForm} className="has-text-left">
      <div className="field">
        <label>{FIELD_EMAIL}:</label>
        <p className="control has-icons-left">
          <Input
            type="text"
            name="email"
            placeholder={FIELD_EMAIL}
            formModel={formModel}
            required={true}
            autoFocus
          />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faUser} />
          </span>
        </p>
      </div>
      <div className="field">
        <label>{FIELD_PASSWORD}:</label>
        <p className="control has-icons-left has-icons-right">
          <Input
            type={!showPassword ? 'password' : 'text'}
            name="password"
            placeholder={FIELD_PASSWORD}
            formModel={formModel}
            required={true}
          />
          <span className="icon is-small is-left">
            <FontAwesomeIcon icon={faLock} />
          </span>
          <span
            className="icon is-small is-right is-clickable"
            onClick={setShowPassword}
          >
            <FontAwesomeIcon icon={!showPassword ? faEye : faEyeSlash} />
          </span>
        </p>
      </div>
      <div className="buttons is-centered">
        <Button
          text={TEXT_LOGIN}
          className="is-info"
          disabled={ajaxProcessing}
        />
      </div>
      <div className="ajaxloader">{ajaxProcessing && <SvgLoader />}</div>
    </form>
  )
}

export default LoginForm
