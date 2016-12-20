import Immutable from 'immutable'

function AddVmVisibility (state, action) {
  state = state || Immutable.fromJS({ showAddNewVm: false })

  switch (action.type) {
    case 'TOGGLE_ADD_NEW_VM':
      return state.set('showAddNewVm', !state.get('showAddNewVm'))
    default:
      return state
  }
}

export default AddVmVisibility
