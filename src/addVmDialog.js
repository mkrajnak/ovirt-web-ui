import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'

// import SelectPicker from './selectPicker'
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
          <div className='form-group'>
            <label className='col-sm-2 control-label'>Clusters</label>
            <div className='col-sm-10'>
              <select className='selectpicker' ref={(input) => { this.cluster = input }}
                onChange={this.changeCluster}>
                {this.props.clusters.get('clusters').toList().map(cluster =>
                  <option value={cluster.get('name')} key={cluster.get('id')}>{cluster.get('name')}</option>)}
              </select>
            </div>
          </div>
          <div className='form-group'>
            <label className='col-sm-2 control-label'>Templates</label>
            <div className='col-sm-10'>
              <select className='selectpicker' ref={(input) => { this.template = input }} onChange={this.changeTemplate}>
                {this.props.templates.get('templates').toList().map(template =>
                    (template.get('cluster') === this.props.cluster.get('id') || template.get('cluster') === '0')
                    ? <option value={template.get('name')} key={template.get('id')}>{template.get('name')}</option>
                    : false)}
              </select>
            </div>
          </div>
          <div className='form-group'>
            <label className='col-sm-2 control-label'>Operating System</label>
            <div className='col-sm-10'>
              <select className='selectpicker' ref={(input) => { this.os = input }} onChange={this.changeOperatingSystem}
                value={this.props.template.get('os')} >
                {this.props.operatingSystems.get('operatingSystems').toList().map(os =>
                  <option value={os.get('name')} key={os.get('id')}>{os.get('description')}</option>)}
              </select>
            </div>
          </div>
          <div className='form-group'>
            <label className='col-sm-2 control-label' htmlFor='vmMemory' >Memory</label>
            <div className='col-sm-10'>
              <input type='text' id='vmMemory' className='form-control' ref={(input) => { this.memory = input }}
                placeholder='VM Memory' key={this.props.template.get('memory')} defaultValue={this.props.template.get('memory')} />
            </div>
          </div>
          <div className='form-group'>
            <label className='col-sm-2 control-label' htmlFor='vmCpu' >CPUs</label>
            <div className='col-sm-10'>
              <input type='text' id='vmCpu' className='form-control' ref={(input) => { this.cpus = input }}
                placeholder='CPU' key={this.props.template.get('cpu')} defaultValue={this.props.template.get('cpu')} />
            </div>
          </div>
          <div className='form-group'>
            <label className='col-sm-2 control-label' htmlFor='vmName' >Name</label>
            <div className='col-sm-10'>
              <input type='text' id='vmName' className='form-control' ref={(input) => { this.name = input }}
                placeholder='VM Name' required />
            </div>
          </div>
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
