import Immutable from 'immutable'

function addNewOperatingSystems ({ state, payload: { os } }) {
  const updates = {}
  os.forEach(os => {
    updates[os.id] = os
  })
  const imUpdates = Immutable.fromJS(updates)
  return state.mergeIn(['operatingSystems'], imUpdates)
}

function operatingSystems (state, action) {
  state = state || Immutable.fromJS({ operatingSystems: {}, loadInProgress: true })

  switch (action.type) {
    case 'ADD_ALL_OS':
      return addNewOperatingSystems({ state, payload: action.payload })
    default:
      return state
  }
}

export default operatingSystems
