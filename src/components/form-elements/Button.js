import React from 'react'

const Button = props => {
  let { className = '', text, disabled = false, isLoading = false } = props
  className = `button ${className} ` + (isLoading ? 'is-loading' : '')
  return (
    <button className={className} disabled={disabled}>
      {props.children ? props.children : text || 'Submit'}
    </button>
  )
}

export default Button
