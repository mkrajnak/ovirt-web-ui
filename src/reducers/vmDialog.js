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
  cpu: {},
  memoryBallon: '',
  startInPauseMode: '',
  deleteProtection: '',
  errorMessage: '',
  consoleProtocol: '',
  smartcard: '',
  fileTransfer: '',
  copyPaste: '',
  consoles: {},
  firstBootDevice: '',
  secondBootDevice: '',
  soundCard: '',
  virtualSCSI: '',
  bootDevices: {},
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
  UPDATE_VM_CONSOLES (state, { payload: { consoles } }) {
    return state.set('consoles', fromJS(consoles))
  },
  UPDATE_VM_BOOT_DEVICES (state, { payload: { devices } }) {
    return state.set('bootDevices', fromJS(devices))
  },
  UPDATE_VM_FIRST_BOOT_DEVICE (state, { payload: { value } }) {
    return state.set('firstBootDevice', fromJS(value))
  },
  UPDATE_VM_SECOND_BOOT_DEVICE (state, { payload: { value } }) {
    return state.set('secondBootDevice', fromJS(value))
  },
  UPDATE_VM_SOUND_CARD (state, { payload: { value } }) {
    return state.set('soundCard', fromJS(value))
  },
  UPDATE_VM_VIRTUAL_SCSI (state, { payload: { value } }) {
    return state.set('virtualSCSI', fromJS(value))
  },
  UPDATE_VM_SMART_CARD (state, { payload: { value } }) {
    return state.set('smartcard', fromJS(value))
  },
  UPDATE_VM_FILE_TRANSFER (state, { payload: { value } }) {
    return state.set('fileTransfer', fromJS(value))
  },
  UPDATE_VM_COPY_PASTE (state, { payload: { value } }) {
    return state.set('copyPaste', fromJS(value))
  },
  UPDATE_VM_CONSOLE_PROTOCOL (state, { payload: { protocol } }) {
    return state.set('consoleProtocol', fromJS(protocol))
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
  UPDATE_VM_START_IN_PAUSED_MODE (state, { payload: { value } }) {
    return state.set('startInPauseMode', fromJS(value))
  },
  UPDATE_VM_DELETE_PROTECTION (state, { payload: { value } }) {
    return state.set('deleteProtection', fromJS(value))
  },
  UPDATE_VM_HIGH_AVAILABILITY (state, { payload: { value } }) {
    return state.set('highAvailability', fromJS(value))
  },
  UPDATE_VM_IO_THREADS (state, { payload: { value } }) {
    return state.set('iothreads', fromJS(value))
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
