import React from 'react'
import { connect } from 'react-redux'

import { changeFormValue } from 'actions'

class Input extends React.Component {
  constructor(props) {
    super(props)

    this.onChange = this.onChange.bind(this)
    this.setInValidMessage = this.setInValidMessage.bind(this)
    this.clearInValidMessage = this.clearInValidMessage.bind(this)
  }

  onChange(event) {
    const { onChange, formModel } = this.props
    const { value, name } = event.target
    if (typeof onChange === 'function') {
      onChange(formModel, { [name]: value })
    }
  }

  setInValidMessage({ target }) {
    const { type, validity } = target
    let inValidMessage = ''
    if (validity.badInput) {
      switch (type) {
        case 'number':
          inValidMessage = 'Please enter a valid number.'
          break

        case 'email':
          inValidMessage = 'Please enter a valid email address.'
          break

        default:
          break
      }
    }
    if (validity.typeMismatch) {
      switch (type) {
        case 'email':
          inValidMessage = 'You have entered an invalid email address.'
          break

        default:
          break
      }
    }
    if (validity.rangeOverflow) {
      const { max } = target
      inValidMessage = `Maximum value should be ${max}.`
    }
    if (validity.rangeUnderflow) {
      const { min } = target
      inValidMessage = `Minimum value should be ${min}.`
    }
    if (validity.patternMismatch) {
      inValidMessage = 'Value entered is not in required format. Please match.'
    }
    if (validity.valueMissing) {
      inValidMessage = 'Please enter a value.'
    }
    target.setCustomValidity(inValidMessage)
    return true
  }

  clearInValidMessage({ target }) {
    target.setCustomValidity('')
  }

  render() {
    const {
      id,
      type = 'text',
      name = '',
      value,
      required = false,
      formModel,
      forms,
      min,
      max,
      pattern,
      autoFocus
    } = this.props
    let { className = '' } = this.props
    const inputValue =
      value === undefined
        ? forms[formModel] && forms[formModel][name]
          ? forms[formModel][name]
          : ''
        : value
    className = `input ${className}`

    return (
      <React.Fragment>
        <input
          type={type}
          name={name}
          id={id || name}
          value={inputValue}
          onChange={this.onChange}
          className={className}
          required={required}
          onInvalid={this.setInValidMessage}
          onInput={this.clearInValidMessage}
          // Conditional attributes
          autoFocus={autoFocus || false}
          {...(min ? { min: min } : null)}
          {...(max ? { max: max } : null)}
          {...(pattern ? { pattern: pattern } : null)}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  forms: state.forms
})

const mapDispatchToProps = dispatch => ({
  onChange: (formModel, values) => dispatch(changeFormValue(formModel, values))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Input)
