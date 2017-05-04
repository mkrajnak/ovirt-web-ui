import { fromJS } from 'immutable'
import { actionReducer } from './utils'

const vmDialogReducer = actionReducer(fromJS({
  type: '',
  vmId: '',
  cluster: {},
  template: {},
  os: {},
  name: '',
  description: '',
  comment: '',
  memory: '',
  guaranteedMemory: '',
  maxMemory: '',
  memoryBallon: '',
  cpu: {},
  errorMessage: '',
}), {
  UPDATE_CLUSTER (state, { payload: { cluster } }) {
    return state.set('cluster', fromJS(cluster))
  },
  UPDATE_TEMPLATE (state, { payload: { template } }) {
    return state.set('template', fromJS(template))
  },
  UPDATE_OPERATING_SYSTEM (state, { payload: { os } }) {
    return state.set('os', fromJS(os))
  },
  UPDATE_VM_NAME (state, { payload: { name } }) {
    return state.set('name', fromJS(name))
  },
  UPDATE_VM_DESCRIPTION (state, { payload: { description } }) {
    return state.set('description', fromJS(description))
  },
  UPDATE_VM_COMMENT (state, { payload: { comment } }) {
    return state.set('comment', fromJS(comment))
  },
  UPDATE_VM_MEMORY (state, { payload: { memory } }) {
    return state.set('memory', fromJS(memory))
  },
  UPDATE_VM_MEMORY_MAX (state, { payload: { value } }) {
    return state.set('memoryMax', fromJS(value))
  },
  UPDATE_VM_MEMORY_GUARANTEED (state, { payload: { value } }) {
    return state.set('memoryGuaranteed', fromJS(value))
  },
  UPDATE_VM_MEMORY_BALLOON (state, { payload: { value } }) {
    return state.set('memoryBallon', fromJS(value))
  },
  UPDATE_VM_CPU (state, { payload: { cpu } }) {
    return state.set('cpu', fromJS(cpu))
  },
  UPDATE_DIALOG_TYPE (state, { payload: { dialogType } }) {
    return state.set('type', fromJS(dialogType))
  },
  UPDATE_VM_ID (state, { payload: { vmId } }) {
    return state.set('vmId', fromJS(vmId))
  },
  UPDATE_VM_DIALOG_ERROR_MESSAGE (state, { payload: { message } }) {
    return state.set('errorMessage', fromJS(message))
  },
})

export default vmDialogReducer
