import Immutable from 'immutable'

function updateCluster ({ state, payload: { cluster } }) {
  const imUpdates = Immutable.fromJS(cluster)
  return state.set('cluster', imUpdates)
}

function filterTemplates ({ state, payload: { cluster, templates } }) {
  const updates = templates.filter(template =>
      (template.get('cluster') === cluster.id || template.get('cluster') === '0'))
  const imUpdates = Immutable.fromJS(updates)
  return state.set('templates', imUpdates)
}

function addNewVmReducer (state, action) {
  state = state || Immutable.fromJS({ cluster: {}, templates: { } })

  switch (action.type) {
    case 'UPDATE_CLUSTER':
      return updateCluster({ state, payload: action.payload })
    case 'FILTER_TEMPLATES':
      return filterTemplates({ state, payload: action.payload })
    default:
      return state
  }
}

export default addNewVmReducer
