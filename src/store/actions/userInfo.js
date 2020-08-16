import { LOGIN } from '../constant'
import createAction from '../createAction'
import server from '../../server/index'

export const getUserInfo = createAction(LOGIN, async (params) => {
  return await server.login(params)
}, ({resolved, rejected}) => ({
  resolved,
  rejected
}))
