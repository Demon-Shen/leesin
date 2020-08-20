import _ from 'lodash'
import { ADD_TARGET, UPDATE_TARGET, CHOOSE_CURRENT_TARGET, GET_TARGET_LIST, DELETE_TARGET } from '../constant'
import createReducer from '../createReducer'
import { addTarget } from '../../server/appTarget'

const initState = {
  currentTarget: null,
  targetList: []
}

const actionHandle = {
  [CHOOSE_CURRENT_TARGET]: (state, action) => {
    return {
      currentTarget: action.payload
    }
  },
  [GET_TARGET_LIST]: (state, action) => {
    return {
      targetList: action.payload || []
    }
  },
  [ADD_TARGET]: (state, action) => {
    const newTarget = action.payload || {}
    let targetList = _.cloneDeep(state.targetList)
    targetList.unshift(newTarget)
    return {
      targetList
    }
  },
  [UPDATE_TARGET]: (state, action) => {
    const newTarget = action.payload || {}
    let targetList = state.targetList.map(ele => {
      if (ele.targetNum === newTarget.targetNum) {
        return newTarget
      } else {
        return ele
      }
    })
    return {
      targetList,
      currentTarget: newTarget
    }
  },
  [DELETE_TARGET]: (state, action) => {
    const deletedTarget = action.payload || {}
    let targetList = state.targetList.filter(ele => {
      return ele.targetNum !== deletedTarget.targetNum
    })
    return {
      targetList
    }
  }

}

export default createReducer(initState, actionHandle)