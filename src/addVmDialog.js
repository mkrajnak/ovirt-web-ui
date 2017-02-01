import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'

import LabeledSelect from './labeledSelect'
import LabeledTextField from './labeledTextField'
import DetailContainer from './DetailContainer'
import { addNewVm, updateCluster, updateTemplate, updateOperatingSystem, closeDetail } from './actions'

class AddVmDialog extends React.Component {
  constructor (props) {
    super(props)
    this.createNewVm = this.createNewVm.bind(this)
    this.changeCluster = this.changeCluster.bind(this)
    this.changeTemplate = this.changeTemplate.bind(this)
    this.changeOperatingSystem = this.changeOperatingSystem.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
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

  createNewVm (e) {
    e.preventDefault()
    let vm = {
      'vm': {
        'name': this.name.value,
        'template': { 'name': this.template.value },
        'cluster': { 'name': this.cluster.value },
      },
    }
    this.props.addVm(vm)
  }

  closeDialog (e) {
    e.preventDefault()
    this.props.closeDialog()
  }

  changeCluster () {
    let cluster = this.props.clusters.get('clusters').toList().find(cluster =>
      cluster.get('name') === this.cluster.value)
    this.props.changeCluster(cluster)
  }

  changeTemplate () {
    let template = this.props.templates.get('templates').toList().find(template =>
      template.get('name') === this.template.value)
    this.props.changeTemplate(template)

    let os = this.props.operatingSystems.get('operatingSystems').toList().find(os =>
      os.get('name') === template.get('os'))
    this.props.changeOperatingSystem(os)
  }

  changeOperatingSystem () {
    let os = this.props.operatingSystems.get('operatingSystems').toList().find(os =>
      os.get('name') === this.os.value)
    this.props.changeOperatingSystem(os)
  }

  render () {
    return (
      <DetailContainer>
        <h1>Create a new vm</h1>
        <hr />
        <form className='form-horizontal'>
          <LabeledSelect
            label='Cluster'
            val={(input) => { this.cluster = input }}
            onChange={this.changeCluster}
            value={this.props.cluster.get('name')}
            data={this.props.clusters.get('clusters')} />

          <LabeledSelect label='Template' val={(input) => { this.template = input }} onChange={this.changeTemplate}
            value={this.props.template.get('name')}
            data={this.props.templates.get('templates').toList().filter(template => (
                template.get('cluster') === this.props.cluster.get('id') || template.get('cluster') === '0'))} />

          <LabeledSelect label='Operating System' val={(input) => { this.os = input }} onChange={this.changeOperatingSystem}
            value={this.props.os.get('name')} data={this.props.operatingSystems.get('operatingSystems')}
            renderer={(item) => item.get('description')} />

          <LabeledTextField val={(input) => { this.memory = input }} id='vmMemory' label='Memory' placeholder='VM Memory'
            key={this.props.template.get('memory')} defaultValue={this.props.template.get('memory')} />

          <LabeledTextField val={(input) => { this.cpus = input }} id='vmCpu' label='CPU' placeholder='CPUs'
            key={this.props.template.get('cpu')} defaultValue={this.props.template.get('cpu')} />

          <LabeledTextField val={(input) => { this.name = input }} id='vmName' label='Name' placeholder='VM Name' />
          <div className='form-group'>
            <div className='col-sm-offset-2 col-sm-10'>
              <button className='btn btn-default' type='submit' onClick={this.closeDialog}>Close</button>
              <button className='btn btn-primary' type='submit' onClick={this.createNewVm}>Submit</button>
            </div>
          </div>
        </form>
      </DetailContainer>
    )
  }
}

AddVmDialog.propTypes = {
  clusters: PropTypes.object.isRequired,
  cluster: PropTypes.object.isRequired,
  templates: PropTypes.object.isRequired,
  template: PropTypes.object.isRequired,
  operatingSystems: PropTypes.object.isRequired,
  os: PropTypes.object.isRequired,
  addVm: PropTypes.func.isRequired,
  changeCluster: PropTypes.func.isRequired,
  changeTemplate: PropTypes.func.isRequired,
  changeOperatingSystem: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired,
}

export default connect(
  (state) => ({
    clusters: state.clusters,
    templates: state.templates,
    operatingSystems: state.operatingSystems,
    cluster: state.addVm.get('cluster'),
    template: state.addVm.get('template'),
    os: state.addVm.get('os'),
  }),
  (dispatch) => ({
    addVm: (vm) =>
      dispatch(addNewVm(vm)),
    changeCluster: (cluster) =>
      dispatch(updateCluster(cluster)),
    changeOperatingSystem: (os) =>
      dispatch(updateOperatingSystem(os)),
    changeTemplate: (template) =>
      dispatch(updateTemplate(template)),
    closeDialog: () =>
      dispatch(closeDetail()),
  })
)(AddVmDialog)
