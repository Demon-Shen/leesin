import { post, get, deleteRequest } from '../utils/request'

export const findPickedRecords = (params) => {
  return post('/target/pickedRecord/find', params)
}

export const pickTarget = (params) => {
  return post('/target/pick', params)
}