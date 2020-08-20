import { PICK_TARGET, GET_PICKED_RECORDS } from '../constant'
import server from '../../server/index'
import createAction from '../createAction'

export const pickTarget = createAction(PICK_TARGET, async(params) =>{
  return await server.pickTarget(params)
}, (arg) => arg)

export const getPickedRecords = createAction(GET_PICKED_RECORDS, async(params) =>{
  let res = await server.findPickedRecords(params)
  return {
    ...res,
    pageNum: params.pageNum
  }
}, (arg) => arg)