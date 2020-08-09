import { post, get } from '../utils/request'

export const getTargetList = (param) => {
  return get('/target/list', param)
}