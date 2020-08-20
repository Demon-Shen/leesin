import { combineReducers } from 'redux'

import target from './target'
import userInfo from './userInfo'
import pickedRecords from './pickedRecords'

export default combineReducers({
  target,
  userInfo,
  pickedRecords
})