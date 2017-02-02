import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { toggleAddNewVm } from './actions'

const AddVmButton = ({ name, toggleDialog }) => {
  return (
    <div>
      <button
        width='100%'
        type='button'
        className='btn btn-primary'
        onClick={toggleDialog}>
        <span className='pfincon pficon pficon-add-circle-o' />
        {name}
      </button>
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
