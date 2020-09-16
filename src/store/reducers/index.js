import { combineReducers } from 'redux'

import target from './target'
import userInfo from './userInfo'
import pickedRecords from './pickedRecords'
import system from './system'

export default combineReducers({
  target,
  userInfo,
  pickedRecords,
  system
})