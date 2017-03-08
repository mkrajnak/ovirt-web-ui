import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'

import LabeledSelect from './labeledSelect'
import LabeledTextField from './labeledTextField'
import DetailContainer from './DetailContainer'
import {
  addNewVm,
  editVm,
  changeCluster,
  changeTemplate,
  updateOperatingSystem,
  closeDetail,
  updateVmName,
  updateVmMemory,
  updateVmCpu,
} from './actions'

class vmDialog extends React.Component {
  constructor (props) {
    super(props)
    this.createNewVm = this.createNewVm.bind(this)
    this.changeCluster = this.changeCluster.bind(this)
    this.changeTemplate = this.changeTemplate.bind(this)
    this.changeOperatingSystem = this.changeOperatingSystem.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    this.changeVmName = this.changeVmName.bind(this)
    this.changeVmMemory = this.changeVmMemory.bind(this)
    this.changeVmCpu = this.changeVmCpu.bind(this)
    this.getTemplate = this.getTemplate.bind(this)
    this.getOperatingSystem = this.getOperatingSystem.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }

  componentDidUpdate () {
    // without this template combobox its not rerendering
    $(this.template).selectpicker('refresh')
    $(this.cluster).selectpicker('refresh')
    $(this.os).selectpicker('refresh')
  }

  componentDidMount () {
    $(this.template).selectpicker()
    $(this.cluster).selectpicker()
    $(this.os).selectpicker()
  }

  submitHandler (e) {
    e.preventDefault()
    this.props.type === 'edit' ? this.editVm() : this.createNewVm()
  }

  editVm () {
    const vm = {
      'name': this.name.value,
      'template': { 'name': this.template.value },
      'cluster': { 'name': this.cluster.value },
      'memory': this.memory.value,
      'os': {
        'type': this.os.value,
      },
      'cpu': {
        'topology': {
          'cores': '1',
          'sockets': this.cpus.value,
          'threads': '1',
        },
      },
    }
    this.props.edit(vm, this.props.vmId)
  }

  createNewVm () {
    const vm = {
      'vm': {
        'name': this.name.value,
        'template': { 'name': this.template.value },
        'cluster': { 'name': this.cluster.value },
        'memory': this.memory.value,
        'os': { 'type': this.os.value },
        'cpu': {
          'topology': {
            'cores': '1',
            'sockets': this.cpus.value,
            'threads': '1',
          },
        },
      },
    }
    this.props.addVm(vm)
  }

  closeDialog (e) {
    e.preventDefault()
    this.props.closeDialog()
  }

  getTemplate (name) {
    return this.props.templates.get('templates').toList().find(template =>
      template.get('name') === name)
  }

  getOperatingSystem (name) {
    return this.props.operatingSystems.get('operatingSystems').toList().find(os =>
      os.get('name') === name)
  }

  changeCluster () {
    const cluster = this.props.clusters.get('clusters').toList().find(cluster =>
      cluster.get('name') === this.cluster.value)
    this.props.changeCluster(cluster)
  }

  changeTemplate () {
    const template = this.getTemplate(this.template.value)
    this.props.changeTemplate(template)
  }

  changeOperatingSystem () {
    const os = this.getOperatingSystem(this.os.value)
    this.props.changeOperatingSystem(os)
  }

  changeVmName () {
    this.props.changeVmName(this.name.value)
  }

  changeVmMemory () {
    this.props.changeVmMemory(this.memory.value)
  }

  changeVmCpu () {
    this.props.changeVmCpu(this.cpus.value)
  }

  render () {
    return (
      <DetailContainer>
        <h1>{this.props.type === 'edit' ? 'Edit VM' : 'Create new VM'}</h1>
        <hr />
        <form className='form-horizontal'>
          <LabeledSelect
            label='Cluster'
            getValue={(input) => { this.cluster = input }}
            onChange={this.changeCluster}
            value={this.props.cluster.get('name')}
            data={this.props.clusters.get('clusters').sort((a, b) =>
              a.get('name').localeCompare(b.get('name'))
            )} />

          <LabeledSelect
            label='Template'
            getValue={(input) => { this.template = input }}
            onChange={this.changeTemplate}
            value={this.props.template.get('name')}
            data={this.props.templates.get('templates').toList().filter(template => (
                template.get('cluster') === this.props.cluster.get('id') || template.get('cluster') === '0')
              ).sort((a, b) => a.get('name').localeCompare(b.get('name')))} />

          <LabeledSelect
            label='Operating System'
            getValue={(input) => { this.os = input }}
            onChange={this.changeOperatingSystem}
            value={this.props.os.get('name')}
            data={this.props.operatingSystems.get('operatingSystems').toList().sort((a, b) =>
              a.get('name').localeCompare(b.get('name'))
            )}
            renderer={(item) => item.get('description')} />

          <LabeledTextField
            selectClass='combobox form-control'
            getValue={(input) => { this.name = input }}
            id='vmName'
            label='Name'
            placeholder='VM Name'
            value={this.props.vmName}
            setValue={this.changeVmName} />

          <LabeledTextField
            getValue={(input) => { this.memory = input }}
            type='number'
            id='vmMemory'
            label='Memory (MiB)'
            placeholder='VM Memory'
            value={this.props.memory}
            setValue={this.changeVmMemory} />

          <LabeledTextField
            getValue={(input) => { this.cpus = input }}
            type='number'
            id='vmCpu'
            label='CPU'
            placeholder='CPUs'
            value={this.props.cpu}
            setValue={this.changeVmCpu} />

          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-10'>
              <button className='btn btn-default' type='submit' onClick={this.closeDialog}>Close</button>
              <button className='btn btn-primary' type='submit' onClick={this.submitHandler}>Submit</button>
            </div>
          </div>
        </form>
      </DetailContainer>
    )
  }
}

vmDialog.propTypes = {
  type: PropTypes.string,
  clusters: PropTypes.object.isRequired,
  cluster: PropTypes.object.isRequired,
  templates: PropTypes.object.isRequired,
  template: PropTypes.object.isRequired,
  operatingSystems: PropTypes.object.isRequired,
  os: PropTypes.object.isRequired,
  cpu: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  memory: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  vmName: PropTypes.string.isRequired,
  vmId: PropTypes.string.isRequired,
  changeCluster: PropTypes.func.isRequired,
  changeTemplate: PropTypes.func.isRequired,
  changeOperatingSystem: PropTypes.func.isRequired,
  changeVmName: PropTypes.func.isRequired,
  changeVmMemory: PropTypes.func.isRequired,
  changeVmCpu: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired,
  addVm: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
}

export default connect(
  (state) => ({
    clusters: state.clusters,
    templates: state.templates,
    operatingSystems: state.operatingSystems,
    type: state.vmDialog.get('type'),
    cluster: state.vmDialog.get('cluster'),
    template: state.vmDialog.get('template'),
    os: state.vmDialog.get('os'),
    memory: state.vmDialog.get('memory'),
    cpu: state.vmDialog.get('cpu'),
    heading: state.vmDialog.get('dialogName'),
    vmName: state.vmDialog.get('name'),
    vmId: state.vmDialog.get('vmId'),
  }),
  (dispatch) => ({
    addVm: (vm) =>
      dispatch(addNewVm(vm)),
    edit: (vm, vmId) =>
      dispatch(editVm(vm, vmId)),
    changeCluster: (cluster) =>
      dispatch(changeCluster(cluster)),
    changeOperatingSystem: (os) =>
      dispatch(updateOperatingSystem(os)),
    changeTemplate: (template) =>
      dispatch(changeTemplate(template)),
    changeVmName: (name) =>
      dispatch(updateVmName(name)),
    changeVmMemory: (memory) =>
      dispatch(updateVmMemory(memory)),
    changeVmCpu: (cpu) =>
      dispatch(updateVmCpu(cpu)),
    closeDialog: () =>
      dispatch(closeDetail()),
  })
)(vmDialog)
