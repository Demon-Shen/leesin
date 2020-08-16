import { LOGIN } from '../constant'

import createReducer from '../createReducer'

const initState = {
  appUserNum: null,
  
}

const actionHandle = {
  [LOGIN]: (state, action) => {
    return {
      ...action.payload
    }
  }
}

export default createReducer(initState, actionHandle)