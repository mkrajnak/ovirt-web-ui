import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

// import Templates from './templateList'
// import Clusters from './clusterList'
import DetailContainer from './DetailContainer'
import { addNewVm } from './actions'

class AddVmDialog extends React.Component {
  constructor (props) {
    super(props)
    this.createNewVm = this.createNewVm.bind(this)
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
          <form>
            <dl>
              <dt>Templates</dt>
              <dd>
                <select ref={(input) => { this.template = input }}>
                  {this.props.templates.get('templates').toList().map(template =>
                    <option value={template.get('name')} key={template.get('id')}>{template.get('name')}</option>)}
                </select>
              </dd>
              <dt>Clusters</dt>
              <dd>
                <select ref={(input) => { this.cluster = input }}>
                  {this.props.clusters.get('clusters').toList().map(cluster =>
                    <option value={cluster.get('name')} key={cluster.get('id')}>{cluster.get('name')}</option>)}
                </select>
              </dd>
              <dt>Name</dt>
              <dd>
                <input ref={(input) => { this.name = input }} type='text' placeholder='VM Name' required />
              </dd>
              <dd>
                <button type='submit' onClick={this.createNewVm}>Submit</button>
              </dd>
            </dl>
          </form>
        </DetailContainer>
      </div>
    )
  }
}

AddVmDialog.propTypes = {
  templates: PropTypes.object.isRequired,
  clusters: PropTypes.object.isRequired,
  addVm: PropTypes.func.isRequired,
}

export default connect(
  (state) => ({
    templates: state.templates,
    clusters: state.clusters,
  }),
  (dispatch) => ({
    addVm: (vm) =>
      dispatch(addNewVm(vm)),
  })
)(AddVmDialog)
