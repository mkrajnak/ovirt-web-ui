import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'

import LabeledSelect from './LabeledSelect'
import LabeledTextField from './LabeledTextField'
import DetailContainer from './DetailContainer'
import ErrorAlert from './ErrorAlert'
import Selectors from './selectors'
import {
  updateEditTemplateName,
  updateEditTemplateDescription,
  updateEditTemplateOS,
  updateEditTemplateMemory,
  updateEditTemplateCpu,
  changeEditTemplate,
  editTemplate,
  closeDetail,
} from './actions'

class TemplateDialog extends React.Component {
  constructor (props) {
    super(props)
    this.changeTemplate = this.changeTemplate.bind(this)
    this.changeOperatingSystem = this.changeOperatingSystem.bind(this)
    this.changeMemory = this.changeMemory.bind(this)
    this.changeCpu = this.changeCpu.bind(this)
    this.changeName = this.changeName.bind(this)
    this.changeDescription = this.changeDescription.bind(this)
    this.editTemplate = this.editTemplate.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
  }

  componentDidUpdate () {
    // without this template combobox its not rerendering
    $(this.templateOs).selectpicker('refresh')
  }

  componentDidMount () {
    $(this.template).selectpicker()
    $(this.templateOs).selectpicker()
  }

  changeName () {
    this.props.changeName(this.templateName.value)
  }

  changeTemplate () {
    this.props.changeTemplate(Selectors.getTemplateByName(this.template.value))
  }

  changeOperatingSystem () {
    this.props.changeOperatingSystem(this.templateOs.value)
  }

  changeDescription () {
    this.props.changeDescription(this.templateDescription.value)
  }

  changeMemory () {
    this.props.changeMemory(this.templateMemory.value)
  }

  changeCpu () {
    this.props.changeCpu(this.templateCpus.value)
  }

  closeDialog (e) {
    e.preventDefault()
    this.props.closeDialog()
  }

  editTemplate (e) {
    e.preventDefault()
    const template = {
      'name': this.templateName.value,
      'description': this.templateDescription.value,
      'memory': this.templateMemory.value,
      'cpu': {
        'topology': {
          'cores': '1',
          'sockets': this.templateCpus.value,
          'threads': '1',
        },
      },
      'os': {
        'type': this.templateOs.value,
      },
    }
    this.props.editTemplate(template, this.props.template.get('id'))
  }

  render () {
    return (
      <DetailContainer>
        <h1>Edit Template</h1>
        <hr />
        <ErrorAlert message={this.props.errorMessage} />
        <form className='form-horizontal'>
          <LabeledSelect
            label='Templates'
            getValue={(input) => { this.template = input }}
            onChange={this.changeTemplate}
            value={this.props.template.get('name')}
            data={this.props.templates.get('templates').toList()} />

          <LabeledTextField
            label='Name'
            getValue={(input) => { this.templateName = input }}
            id='templateName'
            placeholder='Template name'
            value={this.props.template.get('name')}
            setValue={this.changeName}
            disabled={this.props.template.get('version_number') !== '1'} />

          <LabeledTextField
            label='Description'
            getValue={(input) => { this.templateDescription = input }}
            id='templateDescription'
            placeholder='Template Description'
            value={this.props.template.get('description')}
            setValue={this.changeDescription} />

          <LabeledSelect
            label='Operating System'
            getValue={(input) => { this.templateOs = input }}
            onChange={this.changeOperatingSystem}
            value={this.props.template.get('os')}
            data={this.props.operatingSystems.get('operatingSystems')}
            renderer={(item) => item.get('description')} />

          <LabeledTextField
            getValue={(input) => { this.templateMemory = input }}
            type='number'
            id='templateMemory'
            label='Memory'
            placeholder='Template Memory'
            value={this.props.template.get('memory')}
            setValue={this.changeMemory}
            step={256} />

          <LabeledTextField
            getValue={(input) => { this.templateCpus = input }}
            type='number'
            id='templateCpu'
            label='CPU'
            placeholder='CPUs'
            value={this.props.template.get('cpu')}
            setValue={this.changeCpu} />

          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-10'>
              <button className='btn btn-default' type='submit' onClick={this.closeDialog}>Close</button>
              <button className='btn btn-primary' type='submit' onClick={this.editTemplate}>Submit</button>
            </div>
          </div>
        </form>
      </DetailContainer>
    )
  }
}

TemplateDialog.propTypes = {
  templates: PropTypes.object.isRequired,
  operatingSystems: PropTypes.object.isRequired,
  template: PropTypes.object.isRequired,
  changeTemplate: PropTypes.func.isRequired,
  changeName: PropTypes.func.isRequired,
  changeDescription: PropTypes.func.isRequired,
  changeCpu: PropTypes.func.isRequired,
  changeMemory: PropTypes.func.isRequired,
  changeOperatingSystem: PropTypes.func.isRequired,
  editTemplate: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
}

export default connect(
  (state) => ({
    templates: state.templates,
    operatingSystems: state.operatingSystems,
    template: state.editTemplate,
    errorMessage: state.editTemplate.get('errorMessage'),
  }),
  (dispatch) => ({
    changeName: (template) =>
      dispatch(updateEditTemplateName(template)),
    changeDescription: (description) =>
      dispatch(updateEditTemplateDescription(description)),
    changeTemplate: (template) =>
      dispatch(changeEditTemplate(template)),
    changeOperatingSystem: (template) =>
      dispatch(updateEditTemplateOS(template)),
    changeMemory: (template) =>
      dispatch(updateEditTemplateMemory(template)),
    changeCpu: (template) =>
      dispatch(updateEditTemplateCpu(template)),
    editTemplate: (template, templateId) =>
      dispatch(editTemplate(template, templateId)),
    closeDialog: () =>
      dispatch(closeDetail()),
  })
)(TemplateDialog)
