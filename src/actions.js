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

export function getAllClusters () {
  return {
    type: 'GET_ALL_CLUSTERS',
    payload: {},
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
