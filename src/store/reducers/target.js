import { ADD_TARGET, UPDATE_TARGET, CHOOSE_CURRENT_TARGET } from '../constant'
import createReducer from '../createReducer'

const initState = {
  currentTarget: null
}

const actionHandle = {
  [CHOOSE_CURRENT_TARGET]: (state, action) => {
    return {
      currentTarget: action.payload
    }
  }
}

export default createReducer(initState, actionHandle)