import { ADD_TARGET, UPDATE_TARGET, CHOOSE_CURRENT_TARGET, DELETE_TARGET } from '../constant'
import { deleteTargetServer, addTargetServer, updateTargetServer } from '../../server/appTarget'
import createAction from '../createAction'

export const updateTarget = createAction(UPDATE_TARGET, async (params) => {
  return await updateTargetServer(params)
}, ({resolved, rejected}) => ({
  resolved,
  rejected
}))

export const chooseCurrentTarget = createAction(CHOOSE_CURRENT_TARGET, async (params) => {
  return params
}, ({resolved, rejected}) => ({
  resolved,
  rejected
}))

export const addTarget = createAction(ADD_TARGET, async (params) => {
  return await addTargetServer(params)
}, ({resolved, rejected}) => ({
  resolved,
  rejected
}))

export const deleteTarget = createAction(DELETE_TARGET, async (params) => {
  return await deleteTargetServer(params)
},  ({resolved, rejected}) => ({
  resolved,
  rejected
}))