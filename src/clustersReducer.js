import Immutable from 'immutable'

function addNewclusters ({ state, payload: { clusters } }) {
  const updates = {}
  clusters.forEach(cluster => {
    updates[cluster.id] = cluster
  })
  const imUpdates = Immutable.fromJS(updates)
  return state.mergeIn(['clusters'], imUpdates)
}

function clusters (state, action) {
  state = state || Immutable.fromJS({ clusters: {}, loadInProgress: true })

  switch (action.type) {
    case 'ADD_CLUSTERS':
      return addNewclusters({ state, payload: action.payload })
    default:
      return state
  }
}

export default clusters
