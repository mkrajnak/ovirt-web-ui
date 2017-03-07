import Immutable from 'immutable'
import { actionReducer } from './utils'

const editTemplateReducer = actionReducer(Immutable.fromJS({ id: '', cluster: '', os: '', name: '', memory: '', cpu: '' }), {
  UPDATE_EDIT_TEMPLATE (state, { payload: { template } }) {
    return Immutable.fromJS(template)
  },
  UPDATE_EDIT_TEMPLATE_NAME (state, { payload: { name } }) {
    const imUpdates = Immutable.fromJS(name)
    return state.set('name', imUpdates)
  },
  UPDATE_EDIT_TEMPLATE_OS (state, { payload: { os } }) {
    const imUpdates = Immutable.fromJS(name)
    return state.set('os', imUpdates)
  },
  UPDATE_EDIT_TEMPLATE_DESCRIPTION (state, { payload: { description } }) {
    const imUpdates = Immutable.fromJS(description)
    return state.set('description', imUpdates)
  },
  UPDATE_EDIT_TEMPLATE_MEMORY (state, { payload: { memory } }) {
    const imUpdates = Immutable.fromJS(memory)
    return state.set('memory', imUpdates)
  },
  UPDATE_EDIT_TEMPLATE_CPU (state, { payload: { cpu } }) {
    const imUpdates = Immutable.fromJS(cpu)
    return state.set('cpu', imUpdates)
  },
})

export default editTemplateReducer
