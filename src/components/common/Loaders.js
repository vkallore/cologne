import React from 'react'

export const SvgLoader = props => {
  const { width, height, strokeColor, strokeWidth } = props
  return (
    <svg
      width={width || 30}
      height={height || 30}
      viewBox="0 0 38 38"
      xmlns="http://www.w3.org/2000/svg"
      stroke={strokeColor || 'green'}
    >
      <g fill="none" fillRule="evenodd">
        <g transform="translate(1 1)" strokeWidth={strokeWidth || 1}>
          <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
          <path
            d="M36 18c0-9.94-8.06-18-18-18"
            transform="rotate(219.16 18 18)"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 18 18"
              to="360 18 18"
              dur="1s"
              repeatCount="indefinite"
            />
          </path>
        </g>
      </g>
    </svg>
  )
}

export const SimpleLoader = () => <span className="loader" />

export const ContentLoader = () => {
  return (
    <div className="columns is-centered">
      <div className="column is-narrow">
        <div className="section">
          <SvgLoader width={100} height={100} />
        </div>
      </div>
    </div>
  )
}
