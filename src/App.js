import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import './App.css'

import { VmsList, VmDetail, VmsPageHeader, Options } from 'ovirt-ui-components'
import AddVmDialog from './addVmDialog'
import AddVmButton from './addVmButton'

const App = ({ vms, visibility, addVmVisibility }) => {
  const selectedVmId = visibility.get('selectedVmDetail')
  const showOptions = visibility.get('showOptions')
  const addNewVm = addVmVisibility.get('showAddNewVm')

  let detailToRender = ''
  if (showOptions) {
    detailToRender = (<Options />)
  } else if (addNewVm && selectedVmId) {
    detailToRender = (<AddVmDialog />)
  } else if (selectedVmId) {
    const selectedVm = selectedVmId ? vms.getIn(['vms', selectedVmId]) : undefined
    detailToRender = (<VmDetail vm={selectedVm} />)
  }

  return (
    <div>
      <VmsPageHeader title='oVirt User Portal' />
      <hr />
      <AddVmButton name='Add New VM' />
      <div className='container-fluid navbar-top-offset'>
        <VmsList />
        {detailToRender}
      </div>
    </div>
  )
}
App.propTypes = {
  vms: PropTypes.object.isRequired,
  visibility: PropTypes.object.isRequired,
  addVmVisibility: PropTypes.object.isRequired,
}

export default connect(
  (state) => ({
    vms: state.vms,
    visibility: state.visibility,
    addVmVisibility: state.addVmVisibility,
  })
)(App)
