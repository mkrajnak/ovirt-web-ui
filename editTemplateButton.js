import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { openEditTemplate } from './actions'

const editTemplateButton = ({ name, toggleEditTemplate }) => {
  return (
    <div>
      <button
        width='100%'
        type='button'
        className='btn btn-primary'
        onClick={toggleEditTemplate}>
        <span className='pfincon pficon-edit' />
        {name}
      </button>
    </div>
  )
}

editTemplateButton.propTypes = {
  name: PropTypes.string.isRequired,
  toggleEditTemplate: PropTypes.func.isRequired,
}

export default connect(
  (state) => ({}),
  (dispatch) => ({
    toggleEditTemplate: () =>
      dispatch(openEditTemplate()),
  })
)(editTemplateButton)
