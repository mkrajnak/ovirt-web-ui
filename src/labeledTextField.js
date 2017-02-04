import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const LabeledTextField = ({ id, label, setValue, placeholder, getValue, value }) => (
  <div className='form-group'>
    <label className='col-sm-2 control-label' htmlFor={id} >
      {label}
    </label>
    <div className='col-sm-10'>
      <input type='text'
        className='form-control'
        id={id}
        placeholder={placeholder}
        ref={getValue}
        onChange={setValue}
        value={value} />
    </div>
  </div>
)

LabeledTextField.propTypes = {
  getValue: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  key: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}

export default connect()(LabeledTextField)
