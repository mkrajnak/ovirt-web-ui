import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import './App.css'

import { VmsList, VmDetail, VmsPageHeader, Options } from 'ovirt-ui-components'
import VmDialog from './vmDialog'
import AddVmButton from './addVmButton'

const App = ({ vms, visibility, dialogVisibility }) => {
  const selectedVmId = visibility.get('selectedVmDetail')
  const showOptions = visibility.get('showOptions')
  const showVmDialog = dialogVisibility.get('showVmDialog')
  const showVmDetail = dialogVisibility.get('showVmDetail')

  let detailToRender = ''
  if (showOptions) {
    detailToRender = (<Options />)
  } else if (showVmDialog) {
    detailToRender = (<VmDialog />)
  } else if (showVmDetail && selectedVmId) {
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
  dialogVisibility: PropTypes.object.isRequired,
}

export default connect(
  (state) => ({
    vms: state.vms,
    visibility: state.visibility,
    dialogVisibility: state.dialogVisibility,
  })
)(App)
