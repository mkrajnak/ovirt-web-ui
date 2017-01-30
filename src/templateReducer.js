import Immutable from 'immutable'

function addNewTemplates ({ state, payload: { templates } }) {
  const updates = {}
  templates.forEach(template => {
    updates[template.id] = template
  })
  const imUpdates = Immutable.fromJS(updates)
  return state.mergeIn(['templates'], imUpdates)
}

function templates (state, action) {
  state = state || Immutable.fromJS({ templates: {}, loadInProgress: true })

  switch (action.type) {
    case 'ADD_TEMPLATES':
      return addNewTemplates({ state, payload: action.payload })
    default:
      return state
  }
}

export default templates
