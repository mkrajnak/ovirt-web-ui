import Immutable from 'immutable'

function updateTemplate ({ state, payload: { template } }) {
  return Immutable.fromJS(template)
}

function updateName ({ state, payload: { name } }) {
  const imUpdates = Immutable.fromJS(name)
  return state.set('name', imUpdates)
}

function updateDescription ({ state, payload: { description } }) {
  const imUpdates = Immutable.fromJS(description)
  return state.set('description', imUpdates)
}

function updateOperatingSystem ({ state, payload: { os } }) {
  const imUpdates = Immutable.fromJS(os)
  return state.set('os', imUpdates)
}

function updateMemory ({ state, payload: { memory } }) {
  const imUpdates = Immutable.fromJS(memory)
  return state.set('memory', imUpdates)
}

function updateCpu ({ state, payload: { cpu } }) {
  const imUpdates = Immutable.fromJS(cpu)
  return state.set('cpu', imUpdates)
}

function editTemplateReducer (state, action) {
  state = state || Immutable.fromJS({ id: '', cluster: '', os: '', name: '', memory: '', cpu: '' })

  switch (action.type) {
    case 'UPDATE_EDIT_TEMPLATE':
      return updateTemplate({ state, payload: action.payload })
    case 'UPDATE_EDIT_TEMPLATE_NAME':
      return updateName({ state, payload: action.payload })
    case 'UPDATE_EDIT_TEMPLATE_OS':
      return updateOperatingSystem({ state, payload: action.payload })
    case 'UPDATE_EDIT_TEMPLATE_DESCRIPTION':
      return updateDescription({ state, payload: action.payload })
    case 'UPDATE_EDIT_TEMPLATE_MEMORY':
      return updateMemory({ state, payload: action.payload })
    case 'UPDATE_EDIT_TEMPLATE_CPU':
      return updateCpu({ state, payload: action.payload })
    default:
      return state
  }
}

export default editTemplateReducer
