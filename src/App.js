import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import style from './App.css'

import VmsPageHeader from './components/VmsPageHeader'

import VmsList from './components/VmsList'
import VmDetail from './components/VmDetail'
import Options from './components/Options'

import AddVmButton from './AddVmButton'
import EditTemplateButton from './editTemplateButton'
import VmDialog from './AddVmDialog'
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
      <div className={'container-fluid ' + style['navbar-top-offset']}>
        <hr />
        <AddVmButton name='Add New Virtual Machine' />
        <EditTemplateButton name='Edit Template' />
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
