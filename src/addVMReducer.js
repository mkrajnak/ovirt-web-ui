import Immutable from 'immutable'

function updateCluster ({ state, payload: { cluster } }) {
  const updates = {}
  updates['cluster'] = cluster
  const imUpdates = Immutable.fromJS(updates)
  return state.mergeIn(['cluster'], imUpdates)
}

function addNewVmReducer (state, action) {
  state = state || Immutable.fromJS({ cluster: {} })

  switch (action.type) {
    case 'UPDATE_CLUSTER':
      return updateCluster({ state, payload: action.payload })
    default:
      return state
  }
}

export default addNewVmReducer
