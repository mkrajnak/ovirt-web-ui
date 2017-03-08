import Immutable from 'immutable'
import { actionReducer } from './utils'

const clusters = actionReducer(Immutable.fromJS({ clusters: {}, loadInProgress: true }), {
  ADD_CLUSTERS (state, { payload: { clusters } }) {
    const updates = {}
    clusters.forEach(cluster => {
      updates[cluster.id] = cluster
    })
    const imUpdates = Immutable.fromJS(updates)
    return state.mergeIn(['clusters'], imUpdates)
  },
})

export default clusters
