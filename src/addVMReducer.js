import Immutable from 'immutable'

function updateCluster ({ state, payload: { cluster } }) {
  const imUpdates = Immutable.fromJS(cluster)
  return state.set('cluster', imUpdates)
}

function updateTemplate ({ state, payload: { template } }) {
  const imUpdates = Immutable.fromJS(template)
  return state.set('template', imUpdates)
}

function updateOperatingSystem ({ state, payload: { os } }) {
  const imUpdates = Immutable.fromJS(os)
  return state.set('os', imUpdates)
}

function addNewVmReducer (state, action) {
  state = state || Immutable.fromJS({ cluster: {}, template: {}, os: {} })

  switch (action.type) {
    case 'UPDATE_CLUSTER':
      return updateCluster({ state, payload: action.payload })
    case 'UPDATE_TEMPLATE':
      return updateTemplate({ state, payload: action.payload })
    case 'UPDATE_OPERATING_SYSTEM':
      return updateOperatingSystem({ state, payload: action.payload })
    default:
      return state
  }
}

export default addNewVmReducer
