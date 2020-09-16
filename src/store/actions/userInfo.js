import { LOGIN, SAVE_WX_INFO } from '../constant'
import createAction from '../createAction'
import server from '../../server/index'

export const getUserInfo = createAction(LOGIN, async (params) => {
  return await server.login(params)
}, arg => arg)

export const saveWxInfo = createAction(SAVE_WX_INFO, async (params) => {
  return await server.saveWxInfo(params)
}, arg => arg)