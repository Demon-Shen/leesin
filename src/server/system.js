import { post, get, deleteRequest, upload } from '../utils/request'

export const getOssConfigServer = (params) => {
  return get('/baseConfig/ossSign', params)
}

export const uploadFileServer = (params) => {
  return upload('', params)
}
