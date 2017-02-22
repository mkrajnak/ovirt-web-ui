import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'

import LabeledSelect from './labeledSelect'
import LabeledTextField from './labeledTextField'
import DetailContainer from './DetailContainer'
import {
  updateEditTemplateId,
  updateEditTemplateName,
  updateEditTemplateDescription,
  updateEditTemplate,
  updateEditTemplateOs,
  updateEditTemplateMemory,
  updateEditTemplateCpu,
  closeDetail,
} from './actions'

class templateDialog extends React.Component {
  constructor (props) {
    super(props)
    this.changeTemplate = this.changeTemplate.bind(this)
    this.updateTemplateDeps = this.updateTemplateDeps.bind(this)
    this.changeOperatingSystem = this.changeOperatingSystem.bind(this)
    this.changeMemory = this.changeMemory.bind(this)
    this.changeCpu = this.changeCpu.bind(this)
    this.changeId = this.changeId.bind(this)
    this.changeName = this.changeName.bind(this)
    this.changeDescription = this.changeDescription.bind(this)
    this.editTemplate = this.editTemplate.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    // TODO use the selectors
    this.getTemplate = this.getTemplate.bind(this)
    this.getOperatingSystem = this.getOperatingSystem.bind(this)
  }

  componentDidUpdate () {
    // without this template combobox its not rerendering
    $(this.template).selectpicker('refresh')
    $(this.templateOs).selectpicker('refresh')
  }

  componentDidMount () {
    $(this.template).selectpicker()
    $(this.templateOs).selectpicker()
  }

  changeId () {
    this.props.changeId(this.templateId.value)
  }

  changeName () {
    this.props.changeName(this.tempalateName.value)
  }

  getOperatingSystem (name) {
    return this.props.operatingSystems.get('operatingSystems').toList().find(os =>
      os.get('name') === name)
  }

  updateTemplateDeps (template) {
    this.props.changeTemplate(template)

    const os = this.getOperatingSystem(template.get('os'))
    this.props.changeOperatingSystem(os)
    this.props.changeMemory(template.get('memory'))
    this.props.changeCpu(template.get('cpu'))
  }

  getTemplate (name) {
    return this.props.templates.get('templates').toList().find(template =>
      template.get('name') === name)
  }

  changeTemplate () {
    const template = this.getTemplate(this.template.value)
    this.updateTemplateDeps(template)
  }

  changeOperatingSystem () {
    const os = this.getOperatingSystem(this.os.value)
    this.props.changeOperatingSystem(os)
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
      'id': this.templateId.value,
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
      'os': this.templateOs.value,
    }
    // TODO
    console.log(template)
  }

  render () {
    return (
      <DetailContainer>
        <h1>Edit Template</h1>
        <hr />
        <form className='form-horizontal'>
          <LabeledSelect
            label='Templates'
            getValue={(input) => { this.template = input }}
            onChange={this.changeTemplate}
            value={this.props.template.get('name')}
            data={this.props.templates.get('templates').toList()} />

          <LabeledTextField
            label='Id'
            getValue={(input) => { this.templateId = input }}
            id='templateId'
            placeholder='Template id'
            value={this.props.template.get('id')}
            setValue={this.changeId} />

          <LabeledTextField
            label='Name'
            getValue={(input) => { this.templateName = input }}
            id='templateName'
            placeholder='Template name'
            value={this.props.template.get('name')}
            setValue={this.changeName} />

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
            setValue={this.changeMemory} />

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

templateDialog.propTypes = {
  templates: PropTypes.object.isRequired,
  operatingSystems: PropTypes.object.isRequired,
  template: PropTypes.object.isRequired,
  changeTemplate: PropTypes.func.isRequired,
  changeId: PropTypes.func.isRequired,
  changeName: PropTypes.func.isRequired,
  changeDescription: PropTypes.func.isRequired,
  changeCpu: PropTypes.func.isRequired,
  changeMemory: PropTypes.func.isRequired,
  changeOperatingSystem: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired,
}

export default connect(
  (state) => ({
    templates: state.templates,
    operatingSystems: state.operatingSystems,
    template: state.editTemplate.get('template'),
  }),
  (dispatch) => ({
    changeId: (template) =>
      dispatch(updateEditTemplateId(template)),
    changeName: (template) =>
      dispatch(updateEditTemplateName(template)),
    changeDescription: (description) =>
      dispatch(updateEditTemplateDescription(description)),
    changeTemplate: (template) =>
      dispatch(updateEditTemplate(template)),
    changeOperatingSystem: (template) =>
      dispatch(updateEditTemplateOs(template)),
    changeMemory: (template) =>
      dispatch(updateEditTemplateMemory(template)),
    changeCpu: (template) =>
      dispatch(updateEditTemplateCpu(template)),
    closeDialog: () =>
      dispatch(closeDetail()),
  })
)(templateDialog)
