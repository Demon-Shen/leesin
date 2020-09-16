import _ from 'lodash'
import { GET_OSS_CONFIG, UP_LOAD_FILE } from '../constant'
import createReducer from '../createReducer'
import { addTarget } from '../../server/appTarget'

const initState = {
  ossConfig: null
}

const actionHandle = {
  
  [GET_OSS_CONFIG]: (state, action) => {
    if (action.payload) {
      delete action.payload.callback
      return {
        ossConfig: action.payload
      }
    }
  },
}

export default createReducer(initState, actionHandle)