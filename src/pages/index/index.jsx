import Taro, { Component } from '@tarojs/taro'
import { ScrollView } from '@tarojs/components'

import './index.scss'
import avatar from '../../asset/img/avatar.png'

import server from '../../server/index'

export default class Index extends Component {

  constructor(props) {
    super(props)

    this.state = {
      targetList: []
    }
  }

  componentWillMount () {
    Taro.login({
      success: async (res) => {
        if (res.errMsg === 'login:ok') {
          console.log(res)
          // TODO调用后端登陆接口，获取用户信息

          const userInfo = await server.login({
            jsCode: res.code
          })
          
          console.log(userInfo)
          // 查询用户名下的目标，并展示
          const targetList = await server.getTargetList({
            appUserNum: userInfo.appUserNum
          })

          console.log(targetList)
          this.setState({
            targetList
          })
        } else {
          Taro.showToast('登陆失败' + res.errMsg)
        }
      },
      fail: (rej) => {
        Taro.showToast('登陆失败' + rej.errMsg)
      }
    })
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  config = {
    navigationBarTitleText: '葱匆'
  }

  _renderTargetList() {
    const {
      targetList
    } = this.state
    return (
      <div>
        {
          targetList.map((ele, ind) => {
            return (
                <div key={ind}>
                  { ele.targetName }
                </div>
            )
          })
        }
      </div>
    )
  }

  render () {
    const {
      targetList
    } = this.state
    return (
      <View className=''>
        <View>
          <Image src={avatar}/>
          <View>用户名</View>
        </View>
        <ScrollView>
          {
            this._renderTargetList()
          }
        </ScrollView>
      </View>
    )
  }
}
