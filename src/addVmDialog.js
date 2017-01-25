import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'

// import Templates from './templateList'
// import Clusters from './clusterList'
import DetailContainer from './DetailContainer'
import { addNewVm } from './actions'

class AddVmDialog extends React.Component {
  constructor (props) {
    super(props)
    this.createNewVm = this.createNewVm.bind(this)
  }

  componentDidMount () {
    $(this.template).selectpicker()
    $(this.cluster).selectpicker()
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
                  {this.props.templates.get('templates').toList().map(template => {
                    if (template.get('cluster') === this.props.filter_cluster.get('cluster').get('cluster').get('id') || template.get('cluster') === '0') {
                      return <option value={template.get('name')} key={template.get('id')}>{template.get('name')}</option>
                    }
                  }
                  )}

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
                <button className='btn btn-default' type='submit' onClick={this.createNewVm}>Close</button>
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
  templates: PropTypes.object.isRequired,
  clusters: PropTypes.object.isRequired,
  filter_cluster: PropTypes.object.isRequired,
  addVm: PropTypes.func.isRequired,
}

export default connect(
  (state) => ({
    clusters: state.clusters,
    templates: state.templates,
    filter_cluster: state.addVm,
  }),
  (dispatch) => ({
    addVm: (vm) =>
      dispatch(addNewVm(vm)),
  })
)(AddVmDialog)
