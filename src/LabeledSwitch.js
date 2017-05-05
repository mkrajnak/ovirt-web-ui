import React, { PropTypes } from 'react'

// onChange method is working only via jQuery
// onChange method in thos component is only dummy, to supress warnings
const LabeledSwitch = ({
  id,
  label,
  setValue,
  getValue,
  value,
  disabled = false,
}) => (
  <div className='form-group'>
    <label className='col-sm-2 control-label' htmlFor={id} >
      {label}
    </label>
    <div className='col-sm-10'>
      <input
        className='bootstrap-switch'
        type='checkbox'
        id={id}
        ref={getValue}
        onChange={setValue}
        checked={value}
        disabled={disabled} />
    </div>
  </div>
)

LabeledSwitch.propTypes = {
  getValue: PropTypes.func.isRequired,
  setValue: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.bool,
  disabled: PropTypes.bool,
}

export default LabeledSwitch
