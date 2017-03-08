import Immutable from 'immutable'
import { actionReducer } from './utils'

const vmDialogReducer = actionReducer(Immutable.fromJS({ type: {}, vmId: {}, cluster: {}, template: {}, os: {}, name: {}, memory: {}, cpu: {} }), {
  UPDATE_CLUSTER (state, { payload: { cluster } }) {
    const imUpdates = Immutable.fromJS(cluster)
    return state.set('cluster', imUpdates)
  },
  UPDATE_TEMPLATE (state, { payload: { template } }) {
    const imUpdates = Immutable.fromJS(template)
    return state.set('template', imUpdates)
  },
  UPDATE_OPERATING_SYSTEM (state, { payload: { os } }) {
    const imUpdates = Immutable.fromJS(os)
    return state.set('os', imUpdates)
  },
  UPDATE_VM_NAME (state, { payload: { name } }) {
    const imUpdates = Immutable.fromJS(name)
    return state.set('name', imUpdates)
  },
  UPDATE_VM_MEMORY (state, { payload: { memory } }) {
    const imUpdates = Immutable.fromJS(memory)
    return state.set('memory', imUpdates)
  },
  UPDATE_VM_CPU (state, { payload: { cpu } }) {
    const imUpdates = Immutable.fromJS(cpu)
    return state.set('cpu', imUpdates)
  },
  UPDATE_DIALOG_TYPE (state, { payload: { dialogType } }) {
    const imUpdates = Immutable.fromJS(dialogType)
    return state.set('type', imUpdates)
  },
  UPDATE_VM_ID (state, { payload: { vmId } }) {
    const imUpdates = Immutable.fromJS(vmId)
    return state.set('vmId', imUpdates)
  },
})

export default vmDialogReducer
