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

export function addNewVm ({ vm }) {
  return {
    type: 'ADD_NEW_VM',
    payload: {
      vm,
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

export function toggleAddNewVm () {
  return {
    type: 'TOGGLE_ADD_NEW_VM',
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

export function filterTemplates (cluster, templates) {
  return {
    type: 'FILTER_TEMPLATES',
    payload: {
      cluster,
      templates,
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
