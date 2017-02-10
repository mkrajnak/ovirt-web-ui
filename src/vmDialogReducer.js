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

function updateVmName ({ state, payload: { name } }) {
  const imUpdates = Immutable.fromJS(name)
  return state.set('name', imUpdates)
}

function updateVmMemory ({ state, payload: { memory } }) {
  const imUpdates = Immutable.fromJS(memory)
  return state.set('memory', imUpdates)
}

function updateVmCpu ({ state, payload: { cpu } }) {
  const imUpdates = Immutable.fromJS(cpu)
  return state.set('cpu', imUpdates)
}

function updateDialogType ({ state, payload: { dialogType } }) {
  const imUpdates = Immutable.fromJS(dialogType)
  return state.set('type', imUpdates)
}

function updateVmId ({ state, payload: { vmId } }) {
  const imUpdates = Immutable.fromJS(vmId)
  return state.set('vmId', imUpdates)
}

function vmDialogReducer (state, action) {
  state = state || Immutable.fromJS({ type: {}, vmId: {}, cluster: {}, template: {}, os: {}, name: {}, memory: {}, cpu: {} })

  switch (action.type) {
    case 'UPDATE_CLUSTER':
      return updateCluster({ state, payload: action.payload })
    case 'UPDATE_TEMPLATE':
      return updateTemplate({ state, payload: action.payload })
    case 'UPDATE_OPERATING_SYSTEM':
      return updateOperatingSystem({ state, payload: action.payload })
    case 'UPDATE_VM_NAME':
      return updateVmName({ state, payload: action.payload })
    case 'UPDATE_VM_MEMORY':
      return updateVmMemory({ state, payload: action.payload })
    case 'UPDATE_VM_CPU':
      return updateVmCpu({ state, payload: action.payload })
    case 'UPDATE_DIALOG_TYPE':
      return updateDialogType({ state, payload: action.payload })
    case 'UPDATE_VM_ID':
      return updateVmId({ state, payload: action.payload })
    default:
      return state
  }
}

export default vmDialogReducer
