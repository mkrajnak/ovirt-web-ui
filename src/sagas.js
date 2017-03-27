import { call, put, fork } from 'redux-saga/effects'
import { takeEvery, takeLatest } from 'redux-saga'

// import { browserHistory } from 'react-router'

import {
  logDebug,
  hidePassword,
  fileDownload,
  getAllVms,
  loginSuccessful,
  loginFailed,
  failedExternalAction,
  loadInProgress,
  setVmDetailToShow,
  vmActionInProgress,
  setVmConsoles,
  updateVms,
} from 'ovirt-ui-components'

// import store from './store'
import {
  getSingleVm,
  getAllTemplates,
  getAllClusters,
  addClusters,
  addTemplates,
  updateCluster,
  changeCluster,
  updateTemplate,
  changeTemplate,
  updateOperatingSystem,
  updateVmMemory,
  updateVmCpu,
  updateVmName,
  updateDialogType,
  updateVmId,
  openVmDialog,
  closeVmDialog,
  openVmDetail,
  closeVmDetail,
  updateEditTemplate,
  closeDetail,
  updateVmDialogErrorMessage,
} from './actions'

import Api from './manageIQapi'
import Selectors from './selectors'
import AppConfiguration from './config'

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// TODO: following generators should be better part of the Api -- Revise

function* callExternalAction (methodName, method, action, canBeMissing = false) {
  try {
    logDebug(`External action ${methodName}() starts on ${JSON.stringify(hidePassword({ action }))}`)
    const result = yield call(method, action.payload)
    return result
  } catch (e) {
    if (!canBeMissing || e.status !== 404) {
      logDebug(`External action exception: ${JSON.stringify(e)}`)
      yield put(failedExternalAction({ exception: e, shortMessage: shortErrorMessage({ action }), action }))
    }
    return { error: e }
  }
}

// TODO: implement 'renew the token'
function* login (action) {
  yield put(loadInProgress({ value: true }))

  let token
  let result = {}
  if (action.payload.token) {
    token = action.payload.token
  } else { // recently not used since SSO
    result = yield callExternalAction('login', Api.login, action)
    if (result && result['access_token']) {
      token = result['access_token']
    }
  }

  if (token) {
    const username = action.payload.credentials.username
    // persistTokenToSessionStorage({ token, username })

    yield put(loginSuccessful({ token, username }))
    yield put(getAllClusters()) // no shallow
    yield put(getAllTemplates({ shallowFetch: false }))
  } else {
    yield put(loginFailed({
      errorCode: result['error_code'] ? result['error_code'] : 'no_access',
      message: result['error'] ? (result.error['statusText'] ? result.error['statusText'] : JSON.stringify(result['error'])) : 'Login Failed',
    }))
    yield put(yield put(loadInProgress({ value: false })))
  }
}

function* logout () {
  window.location.href = `${AppConfiguration.applicationURL}/sso/logout`
}

function* startProgress ({ vmId, name }) {
  yield put(vmActionInProgress({ vmId, name, started: true }))
}

function* stopProgress ({ vmId, name, result }) {
  if (result && result.status === 'complete') {
      // do not call 'end of in progress' if successful,
      // since UI will be updated by refresh
    yield delay(5 * 1000)
    yield fetchSingleVm(getSingleVm({ vmId }))
    yield delay(30 * 1000)
    yield fetchSingleVm(getSingleVm({ vmId }))
  }

  yield put(vmActionInProgress({ vmId, name, started: false }))
}

function* shutdownVm (action) {
  yield startProgress({ vmId: action.payload.vmId, name: 'shutdown' })
  const result = yield callExternalAction('shutdown', Api.shutdown, action)
  yield stopProgress({ vmId: action.payload.vmId, name: 'shutdown', result })
}

function* restartVm (action) {
  yield startProgress({ vmId: action.payload.vmId, name: 'restart' })
  const result = yield callExternalAction('restart', Api.restart, action)
  yield stopProgress({ vmId: action.payload.vmId, name: 'restart', result })
}

function* suspendVm (action) {
  yield startProgress({ vmId: action.payload.vmId, name: 'suspend' })
  const result = yield callExternalAction('suspend', Api.suspend, action)
  yield stopProgress({ vmId: action.payload.vmId, name: 'suspend', result })
}

function* startVm (action) {
  yield startProgress({ vmId: action.payload.vmId, name: 'start' })
  const result = yield callExternalAction('start', Api.start, action)
  // TODO: check status at refresh --> conditional refresh wait_for_launch
  yield stopProgress({ vmId: action.payload.vmId, name: 'start', result })
}

function* showAddNewVm (action) {
  yield put(setVmDetailToShow({ vmId: '0' }))
  yield put(updateDialogType('create'))
  const cluster = Selectors.getFirstCluster()
  yield put(changeCluster(cluster))
  yield put(updateVmId('0'))
  yield put(updateVmName(''))
  yield put(openVmDialog())
}

function* handleClusterChange (action) {
  yield put(updateCluster(action.payload.cluster))
  yield put(changeTemplate(Selectors.getTemplateById(79)))
}

function* handleTemplateChange (action) {
  const template = action.payload.template
  yield put(updateTemplate(template))
  yield put(updateVmMemory(undefined))
  yield put(updateVmCpu(undefined))
  yield put(updateOperatingSystem(undefined))
}

function* closeDialog () {
  yield put(updateVmDialogErrorMessage(''))
  yield put(closeVmDialog())
  yield put(closeVmDetail())
}

function* fetchConsoleVmMeta ({ vmId }) {
  const consoles = yield callExternalAction('consoles', Api.consoles, { action: 'INTERNAL_CONSOLES', payload: { vmId } })

  if (consoles && consoles['graphics_console']) { // && consoles['graphics_console'].length > 0) {
    return Api.consolesToInternal({ consoles })
  }
  return []
}

function* getConsoleVm (action) {
  let { vmId, consoleId } = action.payload

  if (!consoleId) {
    yield put(vmActionInProgress({ vmId, name: 'getConsole', started: true }))
    const consolesInternal = yield fetchConsoleVmMeta({ vmId }) // refresh metadata
    yield put(setVmConsoles({ vmId, consoles: consolesInternal }))
    yield put(vmActionInProgress({ vmId, name: 'getConsole', started: false }))

    // TODO: choose user default over just 'SPICE'
    if (consolesInternal && consolesInternal.length > 0) {
      let console = consolesInternal.find(c => c.protocol === 'spice') || consolesInternal[0]
      consoleId = console.id
    }
  }

  if (consoleId) {
    const data = yield callExternalAction('console', Api.console, { action: 'INTERNAL_CONSOLE', payload: { vmId, consoleId } })
    fileDownload({ data, fileName: 'console.vv', mimeType: 'application/x-virt-viewer' })
  }
}

function* selectVmDetail (action) {
  yield put(openVmDetail())
  yield put(setVmDetailToShow({ vmId: action.payload.vmId }))
}

function* schedulerPerMinute (action) {
  logDebug('Starting schedulerPerMinute() scheduler')

  // TODO: do we need to stop the loop? Consider takeLatest in the rootSaga 'restarts' the loop if needed
  while (true) {
    yield delay(60 * 1000) // 1 minute
    logDebug('schedulerPerMinute() event')

    // Actions to be executed no more than once per minute:
    // TODO: allow user to enable/disable the autorefresh
    yield put(getAllVms({ shallowFetch: true }))
  }
}

function* createNewVm (action) {
  yield put(updateVmDialogErrorMessage(''))
  const result = yield callExternalAction('addNewVm', Api.addNewVm, action)
  if (result.error) {
    let msg = (result.error.responseJSON && result.error.responseJSON.detail) || ''
    yield put(updateVmDialogErrorMessage(msg.replace(/^\[|\]$/mg, '')))
  } else {
    yield put(closeDetail())
    yield put(getAllVms({ shallowFetch: false }))
  }
}

function* fetchTemplate (url) {
  const template = yield callExternalAction('getTemplate', Api.getTemplate, { payload: { url } })
  if (template && template.vendor === 'redhat') {
    const templateInternal = Api.templateToInternal({ template })
    yield put(addTemplates({ templates: [ templateInternal ] }))
    if (templateInternal.id === 79) {
      yield put(updateTemplate(templateInternal))
    }
  }
}

function* fetchAllTemplates (action) {
  const templates = yield callExternalAction('getAllTemplates', Api.getAllTemplates, action)
  if (templates && templates.resources) {
    yield templates.resources.map(template => fork(fetchTemplate, template.href))
  }

  if (templates && templates['template']) {
    // update template in store for add vm dialog
    const activeTemplate = Selectors.getTemplateById('00000000-0000-0000-0000-000000000000')
    yield put(updateVmMemory(activeTemplate.memory))
    yield put(updateVmCpu(activeTemplate.cpu))
    yield put(updateVmName(''))
    // update template in store for edit template dialog
    yield put(updateEditTemplate(activeTemplate))
  }
}

function* fetchCluster (url) {
  const cluster = yield callExternalAction('getCluster', Api.getCluster, { payload: { url } })
  if (cluster) {
    const clusterInternal = Api.clusterToInternal({ cluster })
    yield put(addClusters({ clusters: [ clusterInternal ] }))
    if (clusterInternal.id && clusterInternal.id === 1) {
      yield put(updateCluster(clusterInternal))
    }
  }
}

function* fetchAllClusters (action) {
  const clusters = yield callExternalAction('getAllClusters', Api.getAllClusters, action)
  if (clusters && clusters.resources) {
    yield clusters.resources.map(cluster => fork(fetchCluster, cluster.href))
  }
}

function* fetchSingleVm (url) {
  const vm = yield callExternalAction('getVm', Api.getVm, { payload: { url } })
  if (vm && vm.vendor === 'redhat') {
    const vmInternal = Api.vmToInternal({ vm })
    yield put(updateVms({ vms: [ vmInternal ] }))
  }
}

function* fetchAllVms (action) {
  const allVms = yield callExternalAction('getAllVms', Api.getAllVms, action)
  if (allVms && allVms.resources) {
    yield allVms.resources.map(vm => fork(fetchSingleVm, vm.href))
  }
}

export function *rootSaga () {
  yield [
    takeEvery('LOGIN', login),
    // takeEvery('LOGIN_SUCCESSFUL', onLoginSuccessful),
    takeEvery('LOGOUT', logout),
    takeLatest('GET_ALL_VMS', fetchAllVms),
    takeLatest('ADD_NEW_VM', createNewVm),
    takeLatest('GET_ALL_CLUSTERS', fetchAllClusters),
    takeLatest('GET_ALL_TEMPLATES', fetchAllTemplates),

    takeEvery('SHUTDOWN_VM', shutdownVm),
    takeEvery('RESTART_VM', restartVm),
    takeEvery('START_VM', startVm),
    takeEvery('GET_CONSOLE_VM', getConsoleVm),
    takeEvery('SUSPEND_VM', suspendVm),
    takeEvery('SHOW_BLANK_DIALOG', showAddNewVm),
    takeEvery('CHANGE_CLUSTER', handleClusterChange),
    takeEvery('CHANGE_TEMPLATE', handleTemplateChange),
    takeEvery('CLOSE_DETAIL', closeDialog),

    takeEvery('SELECT_VM_DETAIL', selectVmDetail),

    takeLatest('SCHEDULER__1_MIN', schedulerPerMinute),
  ]
}

// TODO: translate
// TODO: move to ovirt-ui-actions
const shortMessages = {
  'START_VM': 'Failed to start the VM',
  'RESTART_VM': 'Failed to restart the VM',
  'SHUTDOWN_VM': 'Failed to shutdown the VM',
  'GET_CONSOLE_VM': 'Failed to get the VM console',
  'SUSPEND_VM': 'Failed to suspend the VM',
}

function shortErrorMessage ({ action }) {
  return shortMessages[action.type] ? shortMessages[action.type] : `${action.type} failed` // TODO: translate
}
