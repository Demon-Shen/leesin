import { combineReducers } from 'redux'

import target from './target'
import userInfo from './userInfo'

export default combineReducers({
  target,
  userInfo
})