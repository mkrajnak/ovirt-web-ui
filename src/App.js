import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import './App.css'

import { VmsList, VmDetail, VmsPageHeader, Options } from 'ovirt-ui-components'

import AddVmButton from './addVmButton'
import EditTemplateButton from './editTemplateButton'
import VmDialog from './vmDialog'
import TemplateDialog from './templateDialog'

const App = ({ vms, visibility, dialogVisibility }) => {
  const selectedVmId = visibility.get('selectedVmDetail')
  const showOptions = visibility.get('showOptions')
  const showVmDialog = dialogVisibility.get('showVmDialog')
  const showVmDetail = dialogVisibility.get('showVmDetail')
  const showEditTemplate = dialogVisibility.get('showEditTemplate')

  let detailToRender = ''
  if (showOptions) {
    detailToRender = (<Options />)
  } else if (showVmDialog) {
    detailToRender = (<VmDialog />)
  } else if (showEditTemplate) {
    detailToRender = (<TemplateDialog />)
  } else if (showVmDetail && selectedVmId) {
    const selectedVm = selectedVmId ? vms.getIn(['vms', selectedVmId]) : undefined
    detailToRender = (<VmDetail vm={selectedVm} />)
  }

  return (
    <div>
      <VmsPageHeader title='oVirt User Portal' />
      <hr />
      <AddVmButton name='Add New Virtual Machine' />
      <EditTemplateButton name='Edit Template' />
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
