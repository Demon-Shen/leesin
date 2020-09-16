import { ADD_TARGET, UPDATE_TARGET, CHOOSE_CURRENT_TARGET, DELETE_TARGET, GET_TARGET_LIST } from '../constant'
import { deleteTargetServer, addTargetServer, updateTargetServer, getTargetListServer } from '../../server/appTarget'
import createAction from '../createAction'

export const updateTarget = createAction(UPDATE_TARGET, async (params) => {
  return await updateTargetServer(params)
}, (arg) => arg)

export const chooseCurrentTarget = createAction(CHOOSE_CURRENT_TARGET, async (params) => {
  return params
})

export const addTarget = createAction(ADD_TARGET, async (params) => {
  return await addTargetServer(params)
}, (arg) => arg)

export const deleteTarget = createAction(DELETE_TARGET, async (params) => {
  return await deleteTargetServer(params)
}, (arg) => arg)

export const getTargetList = createAction(GET_TARGET_LIST, async (params) => {
  return await getTargetListServer(params)
}, (arg) => arg)
