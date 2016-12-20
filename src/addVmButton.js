import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { toggleAddNewVm } from './actions'

const AddVmButton = ({ name, toggleDialog }) => {
  return (
    <div>
      <button onClick={toggleDialog}>{name}</button>
    </div>
  )
}

AddVmButton.propTypes = {
  name: PropTypes.string.isRequired,
  toggleDialog: PropTypes.func.isRequired,
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    toggleDialog: () =>
      dispatch(toggleAddNewVm()),
  })
)(AddVmButton)
