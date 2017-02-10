export function blankAddNewVm () {
  return {
    type: 'SHOW_BLANK_DIALOG',
    payload: {},
  }
}

export function updateDialogType (dialogType) {
  return {
    type: 'UPDATE_DIALOG_TYPE',
    payload: {
      dialogType,
    },
  }
}

export function updateVmId (vmId) {
  return {
    type: 'UPDATE_VM_ID',
    payload: {
      vmId,
    },
  }
}

export function updateVmName (name) {
  return {
    type: 'UPDATE_VM_NAME',
    payload: {
      name,
    },
  }
}

export function updateVmMemory (memory) {
  return {
    type: 'UPDATE_VM_MEMORY',
    payload: {
      memory,
    },
  }
}

export function updateVmCpu (cpu) {
  return {
    type: 'UPDATE_VM_CPU',
    payload: {
      cpu,
    },
  }
}

export function getAllOperatingSystems () {
  return {
    type: 'GET_ALL_OS',
    payload: {},
  }
}

export function addAllOS ({ os }) {
  return {
    type: 'ADD_ALL_OS',
    payload: {
      os,
    },
  }
}

export function updateOperatingSystem (os) {
  return {
    type: 'UPDATE_OPERATING_SYSTEM',
    payload: {
      os,
    },
  }
}

export function addNewVm ({ vm }) {
  return {
    type: 'ADD_NEW_VM',
    payload: {
      vm,
    },
  }
}

export function editVm (vm, vmId) {
  return {
    type: 'EDIT_VM',
    payload: {
      vm,
      vmId,
    },
  }
}

export function closeDetail () {
  return {
    type: 'CLOSE_DETAIL',
    payload: {
    },
  }
}

export function openVmDetail () {
  return {
    type: 'OPEN_VM_DETAIL',
    payload: {
    },
  }
}

export function closeVmDetail () {
  return {
    type: 'CLOSE_VM_DETAIL',
    payload: {
    },
  }
}

export function openVmDialog () {
  return {
    type: 'OPEN_VM_DIALOG',
    payload: {
    },
  }
}

export function closeVmDialog () {
  return {
    type: 'CLOSE_VM_DIALOG',
    payload: {
    },
  }
}

export function addClusters ({ clusters }) {
  return {
    type: 'ADD_CLUSTERS',
    payload: {
      clusters,
    },
  }
}

export function updateCluster (cluster) {
  return {
    type: 'UPDATE_CLUSTER',
    payload: {
      cluster,
    },
  }
}

export function getAllClusters () {
  return {
    type: 'GET_ALL_CLUSTERS',
    payload: {},
  }
}

export function addTemplates ({ templates }) {
  return {
    type: 'ADD_TEMPLATES',
    payload: {
      templates,
    },
  }
}

export function getAllTemplates ({ shallowFetch = false }) {
  return {
    type: 'GET_ALL_TEMPLATES',
    payload: {
      shallowFetch,
    },
  }
}

export function updateTemplate (template) {
  return {
    type: 'UPDATE_TEMPLATE',
    payload: {
      template,
    },
  }
}

export function persistState () {
  return {
    type: 'PERSIST_STATE',
    payload: {
    },
  }
}

export function getSingleVm ({ vmId }) {
  return {
    type: 'GET_VM',
    payload: {
      vmId,
    },
  }
}

export function schedulerOneMinute () {
  return {
    type: 'SCHEDULER__1_MIN',
    payload: {},
  }
}

export function setRedirectUrl (redirectUrl) {
  return {
    type: 'REDIRECT_URL',
    payload: {
      redirectUrl,
    },
  }
}
