import { ADD_TARGET, UPDATE_TARGET, CHOOSE_CURRENT_TARGET } from '../constant'
import createAction from '../createAction'

export const addTarget = createAction(ADD_TARGET, (params) => {
  return params
})

export const updateTarget = createAction(UPDATE_TARGET, (params) => {
  return params
})

export const chooseCurrentTarget = createAction(CHOOSE_CURRENT_TARGET, (params) => {
  return params
})