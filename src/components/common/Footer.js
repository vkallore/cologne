import React from 'react'
import { APP_NAME } from 'constants/AppLanguage'

const Footer = () => (
  <footer className="footer is-boxed">
    <div className="container">
      <div className="content has-text-centered">
        <p>
          {APP_NAME} &copy; {new Date().getFullYear()}
        </p>
      </div>
    </div>
  </footer>
)

export default Footer
