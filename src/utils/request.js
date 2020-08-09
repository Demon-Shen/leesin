import Taro from '@tarojs/taro'
import config from '../config/config'

const api = config.api

const checkResult = (data) => {
  if (data && data.code === 0) {
    return true
  } else {
    return false
  }
}

const request = (url, data, method = 'GET') => {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: api + url,
      data,
      method,
      success: (res) => {
        const data = res.data
        if (checkResult(data)) {
          resolve(data && data.data)
        } else {
          Taro.showToast({
            title: data && data.msg ? data.msg : '系统错误，请检查网络连接或联系客服',
            icon: "none"
          })
          reject(data && data.data)
        }
      },
      fail: (rej) => {
        reject(rej)
        Taro.showToast({
          title: '网络配置有误',
          icon: "none"
        })
      }
    })
  })
}

export const get = (url, data) => {
  return request(url, data, 'GET')
}

export const post = (url, data) => {
  return request(url, data, 'POST')
}

