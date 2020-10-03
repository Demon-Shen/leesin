import { LOGIN, SAVE_WX_INFO } from '../constant'

import createReducer from '../createReducer'

const initState = {
  appUserNum: null,
  appUserName: null,
  appUserGender: null,
  appUserAvatarUrl: null,
  openId: null,
  appUserWxAccredit: false
}

const actionHandle = {
  [LOGIN]: (state, action) => {
    let payload = action.payload
    if (payload && payload.appUserName) {
      payload.appUserName = decodeURI(payload.appUserName)
    }
    return {
      ...action.payload
    }
  },
  [SAVE_WX_INFO]: (state, action) => {
    let payload = action.payload
    if (payload && payload.appUserName) {
      payload.appUserName = decodeURI(payload.appUserName)
    }
    return {
      ...payload
    }
  },
}

export default createReducer(initState, actionHandle)