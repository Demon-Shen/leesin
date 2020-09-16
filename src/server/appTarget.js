import { post, get, deleteRequest, upload } from '../utils/request'

export const getTargetListServer = (params) => {
  return get('/target/list', params)
}

export const addTargetServer = (params) => {
  return post('/target/add', params)
}

export const updateTargetServer = (params) => {
  return post('/target/update', params)
}

export const deleteTargetServer = (params) => {
  return deleteRequest('/target/delete', params)
}
