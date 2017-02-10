import Immutable from 'immutable'

function dialogVisibility (state, action) {
  state = state || Immutable.fromJS({ showVmDialog: false, showVmDetail: false })

  switch (action.type) {
    case 'OPEN_VM_DIALOG':
      return state.set('showVmDialog', true)
    case 'CLOSE_VM_DIALOG':
      return state.set('showVmDialog', false)
    case 'OPEN_VM_DETAIL':
      return state.set('showVmDetail', true)
    case 'CLOSE_VM_DETAIL':
      return state.set('closeVmDetail', false)
    default:
      return state
  }
}

export default dialogVisibility
