import { post, get } from '../utils/request'

export const login = (param) => {
  return post('/user/openid', param)
}