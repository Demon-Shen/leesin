import _ from 'lodash'
import { PICK_TARGET, GET_PICKED_RECORDS } from '../constant'
import createReducer from '../createReducer'

const initState = {
  pickedRecords: []
}

const actionHandle = {
 [PICK_TARGET]: (state, action) => {
    let payload = action.payload
    let pickedRecords = _.cloneDeep(state.pickedRecords)
    if (payload) {
      pickedRecords.unshift(payload) 
    }
    return {
      pickedRecords
    }
    
 },
 [GET_PICKED_RECORDS]: (state, action) => {
    let pickedRecords = []
    let payload = action.payload
    if (payload) {
      if (payload.pageNum === 0) {
        pickedRecords = payload.rows
      } else {
        pickedRecords = state.pickedRecords
        pickedRecords = pickedRecords.concat(payload.rows)
      }
    }
    return {
      pickedRecords
    }
  }
}

export default createReducer(initState, actionHandle)