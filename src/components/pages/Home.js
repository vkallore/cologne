import React from 'react'
import { Helmet } from 'react-helmet'

import { APP_TITLE } from 'constants/AppLanguage'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShippingFast } from '@fortawesome/free-solid-svg-icons'

const Home = () => {
  return (
    <React.Fragment>
      <Helmet>
        <title>{APP_TITLE}</title>
      </Helmet>
      <h1 className="title">{APP_TITLE}</h1>
      <div className="columns">
        <div className="column">
          <FontAwesomeIcon
            icon={faShippingFast}
            size="10x"
            transform={{ rotate: -10 }}
          />
        </div>
      </div>
      <div className="columns">
        <div className="column">
          <h2 className="subtitle">The ever fast shipping company!</h2>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Home
