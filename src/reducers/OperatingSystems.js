import Immutable from 'immutable'
import { actionReducer } from './utils'

const operatingSystems = actionReducer(Immutable.fromJS({ operatingSystems: {}, loadInProgress: true }), {
  ADD_ALL_OS (state, { payload: { os } }) {
    const updates = {}
    os.forEach(os => {
      updates[os.id] = os
    })
    const imUpdates = Immutable.fromJS(updates)
    return state.mergeIn(['operatingSystems'], imUpdates)
  },
})

export default operatingSystems
