import React from 'react'
import { connect } from 'react-redux'

import { closeModal } from 'actions'

class CommonModal extends React.Component {
  render() {
    const { closeModal, modal } = this.props

    const {
      showModal,
      modalTitle,
      modalBody,
      primaryBtnText,
      showSecondaryBtn,
      secondaryBtnText,
      btnSecondaryBtnOnClick
    } = modal
    if (showModal !== true) {
      return null
    }

    return (
      <div className="modal is-active">
        <div className="modal-background" onClick={closeModal} />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{modalTitle}</p>
            <button
              className="delete"
              aria-label="close"
              onClick={closeModal}
              title="Close"
            />
          </header>
          <section className="modal-card-body">
            <div className="content">{modalBody}</div>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-primary" onClick={closeModal}>
              {primaryBtnText}
            </button>
            {showSecondaryBtn ? (
              <button
                className="button is-secondary"
                onClick={btnSecondaryBtnOnClick}
              >
                {secondaryBtnText}
              </button>
            ) : null}
          </footer>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  modal: state.common.modal
})

export default connect(
  mapStateToProps,
  {
    closeModal
  }
)(CommonModal)
