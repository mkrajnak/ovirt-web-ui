import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import $ from 'jquery'

import LabeledSelect from './LabeledSelect'
import LabeledTextField from './LabeledTextField'
import LabeledSwitch from './LabeledSwitch'
import DetailContainer from './components/DetailContainer'
import ErrorAlert from './ErrorAlert'
import Selectors from './selectors'
import {
  addNewVm,
  editVm,
  changeCluster,
  changeTemplate,
  updateOperatingSystem,
  closeDetail,
  updateVmName,
  updateVmDescription,
  updateVmComment,
  updateVmMemory,
  updateVmMemoryMax,
  updateVmMemoryGuaranteed,
  updateVmMemoryBalloon,
  updateVmDeleteProtection,
  updateVmStartInPausedMode,
  updateVmIOThreads,
  updateVmConsoleProtocol,
  updateVmCopyPaste,
  updateVmFileTransfer,
  updateVmSmartCard,
  updateVmFirstBootDevice,
  updateVmSecondBootDevice,
  updateVmHighAvailability,
  updateVmCpu,
  updateVmDialogErrorMessage,
} from './actions'

class vmDialog extends React.Component {
  constructor (props) {
    super(props)
    this.submitVm = this.submitVm.bind(this)
    this.changeCluster = this.changeCluster.bind(this)
    this.changeTemplate = this.changeTemplate.bind(this)
    this.changeOperatingSystem = this.changeOperatingSystem.bind(this)
    this.closeDialog = this.closeDialog.bind(this)
    this.changeVmName = this.changeVmName.bind(this)
    this.changeVmDescription = this.changeVmDescription.bind(this)
    this.changeVmComment = this.changeVmComment.bind(this)
    this.changeVmMemory = this.changeVmMemory.bind(this)
    this.changeVmMaxMemory = this.changeVmMaxMemory.bind(this)
    this.changeVmGuaranteedMemory = this.changeVmGuaranteedMemory.bind(this)
    this.changeVmCpu = this.changeVmCpu.bind(this)
    this.getMemory = this.getMemory.bind(this)
    this.getThreads = this.getThreads.bind(this)
    this.changeVmConsoleProtocol = this.changeVmConsoleProtocol.bind(this)
    this.changeVmFirstBootDevice = this.changeVmFirstBootDevice.bind(this)
    this.changeVmSecondBootDevice = this.changeVmSecondBootDevice.bind(this)
    this.clearErrorMessage = this.clearErrorMessage.bind(this)
    this.checkConsoleProtocol = this.checkConsoleProtocol.bind(this)
  }

  componentDidUpdate () {
    // without this template combobox its not rerendering
    $(this.cluster).combobox('refresh')
    $(this.template).combobox('refresh')
    $(this.os).combobox('refresh')
    $(this.memoryBallon).bootstrapSwitch()
    $(this.startInPausedMode).bootstrapSwitch()
    $(this.deleteProtection).bootstrapSwitch()
    $(this.memoryBallon).bootstrapSwitch()
    $(this.highAvailability).bootstrapSwitch()
    $(this.iothreads).bootstrapSwitch()
    $(this.smartcard).bootstrapSwitch()
    $(this.fileTransfer).bootstrapSwitch()
    $(this.copyPaste).bootstrapSwitch()
    $(this.graphicsProtocol).selectpicker('refresh')
    $(this.firstBootDevice).selectpicker('refresh')
    $(this.secondBootDevice).selectpicker('refresh')
    this.checkConsoleProtocol()
  }

  componentDidMount () {
    $(this.cluster).combobox()
    $("input[type='text'].combobox").on('change', () => $(this.changeCluster))
    $(this.template).combobox()
    $("input[type='text'].combobox").on('change', () => $(this.changeTemplate))
    $(this.os).combobox()
    $("input[type='text'].combobox").on('change', () => $(this.changeOperatingSystem))

    $(this.memoryBallon).bootstrapSwitch()
    $(this.memoryBallon).on('switchChange.bootstrapSwitch',
      (event, state) => $(this.props.changeVmMemoryBalloon(state)))

    $(this.startInPausedMode).bootstrapSwitch()
    $(this.startInPausedMode).on('switchChange.bootstrapSwitch',
      (event, state) => $(this.props.changeVmStartInPausedMode(state)))

    $(this.deleteProtection).bootstrapSwitch()
    $(this.deleteProtection).on('switchChange.bootstrapSwitch',
      (event, state) => $(this.props.changeVmDeleteProtection(state)))

    $(this.memoryBallon).bootstrapSwitch()
    $(this.memoryBallon).on('switchChange.bootstrapSwitch',
      (event, state) => $(this.props.changeVmMemoryBalloon(state)))

    $(this.highAvailability).bootstrapSwitch()
    $(this.highAvailability).on('switchChange.bootstrapSwitch',
      (event, state) => $(this.props.changeVmHighAvailability(state)))

    $(this.iothreads).bootstrapSwitch()
    $(this.iothreads).on('switchChange.bootstrapSwitch',
      (event, state) => $(this.props.changeVmIOThreads(state)))

    $(this.smartcard).bootstrapSwitch()
    $(this.smartcard).on('switchChange.bootstrapSwitch',
      (event, state) => $(this.props.changeVmSmartCard(state)))

    $(this.fileTransfer).bootstrapSwitch()
    $(this.fileTransfer).on('switchChange.bootstrapSwitch',
      (event, state) => $(this.props.changeVmFileTransfer(state)))

    $(this.copyPaste).bootstrapSwitch()
    $(this.copyPaste).on('switchChange.bootstrapSwitch',
      (event, state) => $(this.props.changeVmCopyPaste(state)))

    $(this.graphicsProtocol).selectpicker()
    $(this.firstBootDevice).selectpicker()
    $(this.secondBootDevice).selectpicker()
    this.checkConsoleProtocol()
  }

  checkConsoleProtocol () {
    if (this.props.consoleProtocol !== 'spice') {
      $(this.smartcard).bootstrapSwitch('disabled', true)
      $(this.fileTransfer).bootstrapSwitch('disabled', true)
      $(this.copyPaste).bootstrapSwitch('disabled', true)
    } else {
      $(this.smartcard).bootstrapSwitch('disabled', false)
      $(this.fileTransfer).bootstrapSwitch('disabled', false)
      $(this.copyPaste).bootstrapSwitch('disabled', false)
    }
  }

  getMemory (value) {
    return value === '' ? '' : parseInt(value) * 1048576
  }

  getThreads () {
    if (typeof this.props.iothreads === 'string' || this.props.iothreads instanceof String) {
      return this.props.iothreads
    } else if (typeof this.props.iothreads === 'boolean') {
      return this.props.iothreads ? 1 : 0
    }
  }

  submitVm (e) {
    e.preventDefault()

    const vm = {
      'name': this.name.value,
      'comment': this.comment.value,
      'description': this.description.value,
      'template': { 'name': this.template.value },
      'cluster': { 'name': this.cluster.value },
      'memory': this.getMemory(this.memory.value),
      'delete_protected': this.props.deleteProtection,
      'start_paused': this.props.startInPausedMode,
      'memory_policy': {
        'guaranteed': this.getMemory(this.guaranteedMemory.value),
        'max': this.getMemory(this.maxMemory.value),
        'ballooning': this.props.memoryBalloon,
      },
      'display': {
        'type': this.graphicsProtocol.value,
        'copy_paste_enabled': this.props.copyPaste,
        'file_transfer_enabled': this.props.fileTransfer,
        'smartcard_enabled': this.props.smartcard,
      },
      'os': {
        'type': this.os.value,
      },
      'high_availability': {
        'enabled': this.props.highAvailability,
      },
      'cpu': {
        'topology': {
          'cores': '1',
          'sockets': this.cpus.value,
          'threads': '1',
        },
      },
      'io': {
        'threads': this.getThreads(),
      },
    }

    if (this.props.type === 'edit') {
      this.props.edit(vm, this.props.vmId)
    } else {
      this.props.addVm(vm)
    }
  }

  closeDialog (e) {
    e.preventDefault()
    this.props.closeDialog()
  }

  changeCluster () {
    if (!Selectors.getClusterByName(this.cluster.value)) {
      this.props.setErrorMessage('Invalid Cluster selected')
    } else if (this.props.cluster.get('name') === this.cluster.value) {
      this.clearErrorMessage('Cluster')
    } else {
      this.props.changeCluster(Selectors.getClusterByName(this.cluster.value))
      this.clearErrorMessage('Cluster')
    }
  }

  changeTemplate () {
    if (!Selectors.getTemplateByName(this.template.value)) {
      this.props.setErrorMessage('Invalid Template selected')
    } else if (this.props.template.get('name') === this.template.value) {
      this.clearErrorMessage('Template')
    } else {
      this.props.changeTemplate(Selectors.getTemplateByName(this.template.value))
      this.clearErrorMessage('Template')
    }
  }

  changeOperatingSystem () {
    if (!Selectors.getOperatingSystemByName(this.os.value)) {
      this.props.setErrorMessage('Invalid Operating System selected')
    } else if (this.props.os.get('name') === this.os.value) {
      this.clearErrorMessage('Operating System')
    } else {
      this.props.changeOperatingSystem(Selectors.getOperatingSystemByName(this.os.value))
      this.clearErrorMessage('Operating System')
    }
  }

  changeVmName () {
    this.props.changeVmName(this.name.value)
  }

  changeVmDescription () {
    this.props.changeVmDescription(this.description.value)
  }

  changeVmComment () {
    this.props.changeVmComment(this.comment.value)
  }

  changeVmMemory () {
    this.props.changeVmMemory(this.memory.value)
  }

  changeVmMaxMemory () {
    this.props.changeVmMemoryMax(this.maxMemory.value)
  }

  changeVmGuaranteedMemory () {
    this.props.changeVmMemoryGuaranteed(this.guaranteedMemory.value)
  }

  changeVmCpu () {
    this.props.changeVmCpu(this.cpus.value)
  }

  changeVmConsoleProtocol () {
    this.props.changeVmConsoleProtocol(this.graphicsProtocol.value)
  }

  changeVmFirstBootDevice () {
    this.props.changeVmFirstBootDevice(this.firstBootDevice.value)
  }

  changeVmSecondBootDevice () {
    this.props.changeVmSecondBootDevice(this.secondBootDevice.value)
  }

  clearErrorMessage (entity) {
    if (this.props.errorMessage.includes(entity)) {
      this.props.setErrorMessage('')
    }
  }

  render () {
    return (
      <DetailContainer>
        <div className='panel panel-default'>
          <div className='panel-heading'>
            <h3 className='panel-title'>{this.props.type === 'edit' ? 'Edit Virtual Machine' : 'Create A New Virtual Machine'}</h3>
          </div>
          <div className='panel-body'>
            <ErrorAlert message={this.props.errorMessage} />
            <form className='form-horizontal' >
              <LabeledSelect
                id='clusterSelect'
                label='Cluster'
                selectClass='combobox form-control'
                getValue={(input) => { this.cluster = input }}
                onChange={this.changeCluster}
                value={this.props.cluster.get('name')}
                data={this.props.clusters.get('clusters').sort((a, b) =>
                  a.get('name').localeCompare(b.get('name'))
                )} />

              <LabeledSelect
                id='templateSelect'
                label='Template'
                selectClass='combobox form-control'
                getValue={(input) => { this.template = input }}
                onChange={this.changeTemplate}
                value={this.props.template.get('name')}
                data={this.props.templates.get('templates').toList().filter(template => (
                    template.get('cluster') === this.props.cluster.get('id') || template.get('cluster') === '0')
                  ).sort((a, b) => a.get('name').localeCompare(b.get('name')))} />

              <LabeledSelect
                id='operatingSystemSelect'
                label='Operating System'
                selectClass='combobox form-control'
                getValue={(input) => { this.os = input }}
                onChange={this.changeOperatingSystem}
                value={this.props.os.get('name')}
                data={this.props.operatingSystems.get('operatingSystems').toList().sort((a, b) =>
                  a.get('name').localeCompare(b.get('name'))
                )}
                renderer={(item) => item.get('description')} />

              <LabeledTextField
                selectClass='combobox form-control'
                getValue={(input) => { this.name = input }}
                id='vmName'
                label='Name'
                placeholder='VM Name'
                value={this.props.vmName}
                setValue={this.changeVmName} />

              <LabeledTextField
                selectClass='combobox form-control'
                getValue={(input) => { this.description = input }}
                id='vmDescription'
                label='Description'
                placeholder='Please enter a description for virtual machine'
                value={this.props.vmDescription}
                setValue={this.changeVmDescription} />

              <LabeledTextField
                selectClass='combobox form-control'
                getValue={(input) => { this.comment = input }}
                id='vmComment'
                label='Comment'
                placeholder='Please enter a comment for virtual machine'
                value={this.props.vmComment}
                setValue={this.changeVmComment} />

              <LabeledTextField
                getValue={(input) => { this.memory = input }}
                type='number'
                id='vmMemory'
                label='Memory (MB)'
                placeholder='VM Memory'
                value={this.props.memory}
                setValue={this.changeVmMemory}
                step={256} />

              <LabeledTextField
                getValue={(input) => { this.maxMemory = input }}
                type='number'
                id='vmMaxMemory'
                label='Max memory (MB)'
                placeholder='Maximum memory of VM'
                value={this.props.maxMemory}
                setValue={this.changeVmMaxMemory}
                step={256} />

              <LabeledTextField
                getValue={(input) => { this.guaranteedMemory = input }}
                type='number'
                id='vmGuaranteedMemory'
                label='Memory guaranteed (MB)'
                placeholder='Maximal memory guaranteed'
                value={this.props.guaranteedMemory}
                setValue={this.changeVmGuaranteedMemory}
                step={256} />

              <LabeledTextField
                getValue={(input) => { this.cpus = input }}
                type='number'
                id='vmCpu'
                label='CPU'
                placeholder='CPUs'
                value={this.props.cpu}
                setValue={this.changeVmCpu} />

              <LabeledSwitch
                getValue={(input) => { this.memoryBallon = input }}
                id='memoryBalloon'
                label='Memory balloon'
                value={this.props.memoryBalloon}
                setValue={this.props.changeVmMemoryBalloon} />

              <LabeledSwitch
                getValue={(input) => { this.deleteProtection = input }}
                id='deleteProtection'
                label='Delete Protection'
                value={this.props.deleteProtection}
                setValue={this.props.changeVmDeleteProtection} />

              <LabeledSwitch
                getValue={(input) => { this.startInPausedMode = input }}
                id='startInPausedMode'
                label='Start in paused mode'
                value={this.props.startInPausedMode}
                setValue={this.props.changeVmStartInPausedMode} />

              <LabeledSwitch
                getValue={(input) => { this.iothreads = input }}
                id='iothreads'
                label='IO Threads'
                value={parseInt(this.props.iothreads) > 0}
                setValue={this.props.changeVmIOThreads} />

              <LabeledSwitch
                getValue={(input) => { this.highAvailability = input }}
                id='highAvailability'
                label='High Availability'
                value={this.props.highAvailability}
                setValue={this.props.changeVmHighAvailability} />

              <LabeledSelect
                id='graphicsProtocol'
                label='Graphics Protocol'
                getValue={(input) => { this.graphicsProtocol = input }}
                onChange={this.changeVmConsoleProtocol}
                value={this.props.consoleProtocol}
                data={this.props.consoles}
                renderer={(item) => item.get('protocol')} />

              <LabeledSwitch
                getValue={(input) => { this.smartcard = input }}
                id='smartcard'
                label='Smartcard'
                value={this.props.smartcard}
                setValue={this.props.changeVmSmartCard} />

              <LabeledSwitch
                getValue={(input) => { this.fileTransfer = input }}
                id='fileTransfer'
                label='Spice file transfer'
                value={this.props.fileTransfer}
                setValue={this.props.changeVmFileTransfer} />

              <LabeledSwitch
                getValue={(input) => { this.copyPaste = input }}
                id='copyPaste'
                label='Spice Copy Paste'
                value={this.props.copyPaste}
                setValue={this.props.changeVmCopyPaste} />

              <LabeledSelect
                id='firstBootDevice'
                label='First device'
                getValue={(input) => { this.firstBootDevice = input }}
                onChange={this.changeVmFirstBootDevice}
                value={this.props.firstBootDevice}
                data={this.props.bootDevices}
                renderer={(item) => item.get('description')} />

              <LabeledSelect
                id='secondBootDevice'
                label='Second device'
                getValue={(input) => { this.secondBootDevice = input }}
                onChange={this.changeVmSecondBootDevice}
                value={this.props.secondBootDevice}
                data={this.props.bootDevices.toList().filter(device => (
                  device.get('name') !== this.props.firstBootDevice))}
                renderer={(item) => item.get('description')} />

              <div className='form-group'>
                <div className='col-sm-offset-2 col-sm-10' style={{ 'textAlign': 'right' }}>
                  <button className='btn btn-default' type='submit' onClick={this.props.closeDialog}>Close</button>
                  <button className='btn btn-primary' type='submit' onClick={this.submitVm}>Submit</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </DetailContainer>
    )
  }
}

vmDialog.propTypes = {
  type: PropTypes.string,
  clusters: PropTypes.object.isRequired,
  cluster: PropTypes.object.isRequired,
  templates: PropTypes.object.isRequired,
  template: PropTypes.object.isRequired,
  operatingSystems: PropTypes.object.isRequired,
  os: PropTypes.object.isRequired,
  cpu: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  memory: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  vmName: PropTypes.string.isRequired,
  vmDescription: PropTypes.string,
  memoryBalloon: PropTypes.bool,
  startInPausedMode: PropTypes.bool,
  deleteProtection: PropTypes.bool,
  consoles: PropTypes.object,
  consoleProtocol: PropTypes.string,
  smartcard: PropTypes.bool,
  fileTransfer: PropTypes.bool,
  copyPaste: PropTypes.bool,
  guaranteedMemory: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  maxMemory: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  iothreads: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  firstBootDevice: PropTypes.string,
  secondBootDevice: PropTypes.string,
  bootDevices: PropTypes.object,
  highAvailability: PropTypes.bool,
  vmComment: PropTypes.string,
  vmId: PropTypes.string.isRequired,
  changeCluster: PropTypes.func.isRequired,
  changeTemplate: PropTypes.func.isRequired,
  changeOperatingSystem: PropTypes.func.isRequired,
  changeVmName: PropTypes.func.isRequired,
  changeVmDescription: PropTypes.func.isRequired,
  changeVmComment: PropTypes.func.isRequired,
  changeVmMemory: PropTypes.func.isRequired,
  changeVmMemoryGuaranteed: PropTypes.func.isRequired,
  changeVmMemoryMax: PropTypes.func.isRequired,
  changeVmMemoryBalloon: PropTypes.func.isRequired,
  changeVmDeleteProtection: PropTypes.func.isRequired,
  changeVmStartInPausedMode: PropTypes.func.isRequired,
  changeVmHighAvailability: PropTypes.func.isRequired,
  changeVmIOThreads: PropTypes.func.isRequired,
  changeVmCpu: PropTypes.func.isRequired,
  changeVmConsoleProtocol: PropTypes.func.isRequired,
  changeVmFirstBootDevice: PropTypes.func.isRequired,
  changeVmSecondBootDevice: PropTypes.func.isRequired,
  changeVmSmartCard: PropTypes.func.isRequired,
  changeVmFileTransfer: PropTypes.func.isRequired,
  changeVmCopyPaste: PropTypes.func.isRequired,
  closeDialog: PropTypes.func.isRequired,
  setErrorMessage: PropTypes.func.isRequired,
  addVm: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
}

export default connect(
  (state) => ({
    clusters: state.clusters,
    templates: state.templates,
    operatingSystems: state.operatingSystems,
    type: state.vmDialog.get('type'),
    cluster: state.vmDialog.get('cluster'),
    template: state.vmDialog.get('template'),
    os: state.vmDialog.get('os'),
    memory: state.vmDialog.get('memory'),
    guaranteedMemory: state.vmDialog.get('memoryGuaranteed'),
    maxMemory: state.vmDialog.get('memoryMax'),
    memoryBalloon: state.vmDialog.get('memoryBallon'),
    startInPausedMode: state.vmDialog.get('startInPauseMode'),
    deleteProtection: state.vmDialog.get('deleteProtection'),
    highAvailability: state.vmDialog.get('highAvailability'),
    iothreads: state.vmDialog.get('iothreads'),
    cpu: state.vmDialog.get('cpu'),
    heading: state.vmDialog.get('dialogName'),
    vmName: state.vmDialog.get('name'),
    vmDescription: state.vmDialog.get('description'),
    vmComment: state.vmDialog.get('comment'),
    vmId: state.vmDialog.get('vmId'),
    consoles: state.vmDialog.get('consoles'),
    consoleProtocol: state.vmDialog.get('consoleProtocol'),
    smartcard: state.vmDialog.get('smartcard'),
    fileTransfer: state.vmDialog.get('fileTransfer'),
    copyPaste: state.vmDialog.get('copyPaste'),
    firstBootDevice: state.vmDialog.get('firstBootDevice'),
    secondBootDevice: state.vmDialog.get('secondBootDevice'),
    bootDevices: state.vmDialog.get('bootDevices'),
    errorMessage: state.vmDialog.get('errorMessage'),
  }),
  (dispatch) => ({
    addVm: (vm) =>
      dispatch(addNewVm({ vm })),
    edit: (vm, vmId) =>
      dispatch(editVm(vm, vmId)),
    changeCluster: (cluster) =>
      dispatch(changeCluster(cluster)),
    changeOperatingSystem: (os) =>
      dispatch(updateOperatingSystem(os)),
    changeTemplate: (template) =>
      dispatch(changeTemplate(template)),
    changeVmName: (name) =>
      dispatch(updateVmName(name)),
    changeVmDescription: (description) =>
      dispatch(updateVmDescription(description)),
    changeVmComment: (comment) =>
      dispatch(updateVmComment(comment)),
    changeVmMemory: (memory) =>
      dispatch(updateVmMemory(memory)),
    changeVmMemoryMax: (memory) =>
      dispatch(updateVmMemoryMax(memory)),
    changeVmMemoryGuaranteed: (memory) =>
      dispatch(updateVmMemoryGuaranteed(memory)),
    changeVmMemoryBalloon: (value) =>
      dispatch(updateVmMemoryBalloon(value)),
    changeVmDeleteProtection: (value) =>
      dispatch(updateVmDeleteProtection(value)),
    changeVmStartInPausedMode: (value) =>
      dispatch(updateVmStartInPausedMode(value)),
    changeVmHighAvailability: (value) =>
      dispatch(updateVmHighAvailability(value)),
    changeVmIOThreads: (value) =>
      dispatch(updateVmIOThreads(value)),
    changeVmCpu: (cpu) =>
      dispatch(updateVmCpu(cpu)),
    changeVmConsoleProtocol: (protocol) =>
      dispatch(updateVmConsoleProtocol(protocol)),
    changeVmSmartCard: (value) =>
      dispatch(updateVmSmartCard(value)),
    changeVmFileTransfer: (value) =>
      dispatch(updateVmFileTransfer(value)),
    changeVmCopyPaste: (value) =>
      dispatch(updateVmCopyPaste(value)),
    changeVmFirstBootDevice: (value) =>
      dispatch(updateVmFirstBootDevice(value)),
    changeVmSecondBootDevice: (value) =>
      dispatch(updateVmSecondBootDevice(value)),
    closeDialog: () =>
      dispatch(closeDetail()),
    setErrorMessage: (message) =>
      dispatch(updateVmDialogErrorMessage(message)),
  })
)(vmDialog)
