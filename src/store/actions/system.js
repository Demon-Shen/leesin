import { UP_LOAD_FILE, GET_OSS_CONFIG } from '../constant'
import { uploadFileServer, getOssConfigServer } from '../../server/system'
import createAction from '../createAction'

export const uploadFile = createAction(UP_LOAD_FILE, async (params) => {
  return await uploadFileServer(params)
}, (arg) => arg)

export const getOssConfig = createAction(GET_OSS_CONFIG, async (params) => {
  return await getOssConfigServer(params)
}, (arg) => arg)