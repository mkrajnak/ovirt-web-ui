import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

const Templates = ({ templates, ref }) => {
  return (
    <div>
      <select ref={ref}>
        {templates.get('templates').toList().map(template =>
          <option value={template.get('id')} key={template.get('id')}>{template.get('name')}</option>)}
      </select>
    </div>
  )
}
Templates.propTypes = {
  templates: PropTypes.object.isRequired,
  ref: PropTypes.func.isRequired,
}

export default connect(
  (state) => ({
    templates: state.templates,
  })
)(Templates)
