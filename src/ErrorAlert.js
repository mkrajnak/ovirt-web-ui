import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const ErrorAlert = ({ message }) => {
  return message ? (
    <div className='alert alert-danger alert-dismissable'>
      <button type='button' className='close' data-dismiss='alert' aria-hidden='true'>
        <span className='pficon pficon-close' />
      </button>
      <span className='pficon pficon-error-circle-o' />
      <strong>{message}</strong>
    </div>
  ) : (<div />)
}
ErrorAlert.propTypes = {
  message: PropTypes.string,
}

export default connect()(ErrorAlert)
