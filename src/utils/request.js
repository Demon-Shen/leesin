import Taro from '@tarojs/taro'
import config from '../config/config'

const api = config.api
const ossUrl = config.ossUrl

const checkResult = (data) => {
  console.log(data)
  console.log(data.code)
  if (data && data.code === 0) {
    return true
  } else {
    return false
  }
}

const request = (url, data, header, method = 'GET') => {
  return new Promise((resolve, reject) => {
    Taro.request({
      url: api + url,
      data,
      method,
      header,
      success: (res) => {
        const data = res.data
        if (checkResult(data)) {
          resolve(data && data.data)
        } else {
          Taro.showToast({
            title: data && data.message ? data.message : '系统错误，请检查网络连接或联系客服',
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

export const upload = (url, formData, header) => {
  return new Promise((resolve, reject) => {
    let option = {
      url: ossUrl + url,
      name: formData.fileName,
      filePath: formData.filePath,
      formData,
      success: (res) => { 
        try {
          const data = JSON.parse(res.data)
          if (checkResult(data)) {
            resolve(data && data.data)
          } else {
            Taro.showToast({
              title: data && data.message ? data.message : '系统错误，请检查网络连接或联系客服',
              icon: "none"
            })
            reject(data && data.data)
          }
        } catch(e) {
          Taro.showToast({/*  */
            title: '系统错误，请检查网络连接或联系客服',
            icon: "none"
          })
          reject()
        }
      },
      fail: (rej) => {
        reject(rej)
        Taro.showToast({
          title: '网络配置有误',
          icon: "none"
        })
      }
    }

    console.log(option)
    if (header) {
      option.header = header
    }
    Taro.uploadFile(option)
  })
} 

export const get = (url, data, header) => {
  return request(url, data, header, 'GET')
}

export const post = (url, data, header) => {
  return request(url, data, header, 'POST')
}

export const deleteRequest = (url, data, header) => {
  return request(url, data, header, 'DELETE')
}

