import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'

export default class my extends Component {
  config = {
    navigationBarTitleText: '我的'
  }
  render() {
    return (
      <View>
        我的
      </View>
    )
  }
}