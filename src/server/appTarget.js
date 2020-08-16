import { post, get, deleteRequest } from '../utils/request'

export const getTargetListServer = (param) => {
  return get('/target/list', param)
}

export const addTargetServer = (param) => {
  return post('/target/add', param)
}

export const updateTargetServer = (param) => {
  return post('/target/update', param)
}

export const deleteTargetServer = (param) => {
  return deleteRequest('/target/delete', param)
}
