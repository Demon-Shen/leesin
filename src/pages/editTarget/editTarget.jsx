import Taro, { Component } from '@tarojs/taro'

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