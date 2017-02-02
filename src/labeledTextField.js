import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const LabeledTextField = ({ id, label, setValue, placeholder, val, defaultValue, key }) => (
  <div className='form-group'>
    <label className='col-sm-2 control-label' htmlFor={id} >
      {label}
    </label>
    <div className='col-sm-10'>
      <input type='text'
        className='form-control'
        id={id}
        placeholder={placeholder}
        ref={val}
        defaultValue={defaultValue}
        onBlur={setValue}
        key={key} />
    </div>
  </div>
)

LabeledTextField.propTypes = {
  val: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  key: PropTypes.string,
  defaultValue: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}

export default connect()(LabeledTextField)
