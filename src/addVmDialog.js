import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'

// import Templates from './templateList'
// import Clusters from './clusterList'
import DetailContainer from './DetailContainer'
import { addNewVm, updateCluster, filterTemplates, closeDetail } from './actions'

class AddVmDialog extends React.Component {
  constructor (props) {
    super(props)
    this.createNewVm = this.createNewVm.bind(this)
    this.changeCluster = this.changeCluster.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
  }

  componentDidUpdate () {
    $(this.template).selectpicker('refresh')
  }

  componentDidMount () {
    $(this.template).selectpicker()
    $(this.cluster).selectpicker()
    this.changeCluster()
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
    let clusterId = ''
    this.props.clusters.get('clusters').toList().map(cluster =>
      cluster.get('name') === this.cluster.value ? clusterId = cluster.get('id') : false)
    let cluster = {
      'id': clusterId,
      'name': this.cluster.value,
    }
    this.props.changeCluster(cluster)
    this.props.updateTemplates(cluster, this.props.allTemplates.get('templates'))
  }

  log () {
    console.log('LLL')
    console.log(this.props.templates.get('templates').map(template =>
      <option value={template.get('name')} key={template.get('id')}>{template.get('name')}</option>))
  }

  render () {
    return (
      <div>
        <DetailContainer>
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
                <select className='selectpicker' ref={(input) => { this.template = input }}>
                  {this.props.templates.get('templates').toList().map(template =>
                    <option value={template.get('name')} key={template.get('id')}>{template.get('name')}</option>)}
                </select>
              </div>
            </div>
            <div className='form-group'>
              <label className='col-sm-2 control-label' htmlFor='vmName' >Name</label>
              <div className='col-sm-10'>
                <input type='text' id='vmName' className='form-control' ref={(input) => { this.name = input }} placeholder='VM Name' required />
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
      </div>
    )
  }
}

AddVmDialog.propTypes = {
  clusters: PropTypes.object.isRequired,
  templates: PropTypes.object.isRequired,
  allTemplates: PropTypes.object.isRequired,
  addVm: PropTypes.func.isRequired,
  changeCluster: PropTypes.func.isRequired,
  updateTemplates: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired,
}

export default connect(
  (state) => ({
    clusters: state.clusters,
    allTemplates: state.templates,
    templates: state.addVm,
  }),
  (dispatch) => ({
    addVm: (vm) =>
      dispatch(addNewVm(vm)),
    changeCluster: (cluster) =>
      dispatch(updateCluster(cluster)),
    updateTemplates: (cluster, templates) =>
      dispatch(filterTemplates(cluster, templates)),
    closeDialog: () =>
      dispatch(closeDetail()),
  })
)(AddVmDialog)
