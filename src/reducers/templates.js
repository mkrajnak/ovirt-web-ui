import Immutable from 'immutable'
import { actionReducer } from './utils'

const templates = actionReducer(Immutable.fromJS({ templates: {}, loadInProgress: true }), {
  ADD_TEMPLATES (state, { payload: { templates } }) {
    const updates = {}
    templates.forEach(template => {
      updates[template.id] = template
    })
    const imUpdates = Immutable.fromJS(updates)
    return state.mergeIn(['templates'], imUpdates)
  },
})

export default templates
