import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

class LabeledSelect extends React.Component {
  render () {
    return (
      <div className='form-group'>
        <label className='col-sm-2 control-label'>{this.props.label}</label>
        <div className='col-sm-10'>
          <select className='selectpicker'
            ref={(input) => { this.props.val(input) }}
            onChange={this.props.onChange}
            value={this.props.value} >
            {this.props.data.toList().map(node => (
              this.props.renderDescription
              ? <option value={node.get('name')} key={node.get('id')}>{node.get('description')}</option>
              : <option value={node.get('name')} key={node.get('id')}>{node.get('name')}</option>
              )
            )}
          </select>
        </div>
      </div>

    )
  }
}

LabeledSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  val: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  renderDescription: PropTypes.bool,
}

LabeledSelect.defaultProps = {
  renderDescription: false,
}

export default connect()(LabeledSelect)
