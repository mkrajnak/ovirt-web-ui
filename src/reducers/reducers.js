import { combineReducers } from 'redux'

import {
  ConfigReducer as config,
  UserMessages as userMessages,
  VmsReducer as vms,
  IconsReducer as icons,
  VisibilityReducer as visibility,
} from 'ovirt-ui-components'

import templates from './templates'
import clusters from './clusters'
import operatingSystems from './operatingSystems'
import dialogVisibility from './dialogVisibility'
import vmDialog from './vmDialog'
import editTemplate from './editTemplate'

function router (redirectUrl = '/', action) {
  switch (action.type) {
    case 'SET_REDIRECT_URL':
      return action.payload.redirectUrl
    default:
      return redirectUrl
  }
}

export default combineReducers({
  config,
  vms,
  userMessages,
  icons,
  visibility,
  router,
  templates,
  clusters,
  dialogVisibility,
  vmDialog,
  operatingSystems,
  editTemplate,
})
