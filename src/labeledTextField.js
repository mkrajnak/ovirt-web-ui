import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

class LabeledTextField extends React.Component {
  render () {
    return (
      <div className='form-group'>
        <label className='col-sm-2 control-label' htmlFor={this.props.id} >
          {this.props.label}
        </label>
        <div className='col-sm-10'>
          <input type='text'
            className='form-control'
            id={this.props.id}
            placeholder={this.props.placeholder}
            ref={(input) => { this.props.val(input) }}
            defaultValue={this.props.defaultValue}
            key={this.props.key} />
        </div>
      </div>
    )
  }
}

LabeledTextField.propTypes = {
  val: PropTypes.func.isRequired,
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
