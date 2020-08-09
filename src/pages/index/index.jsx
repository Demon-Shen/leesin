import Taro, { Component } from '@tarojs/taro'
import { ScrollView, View } from '@tarojs/components'
import { AtButton } from 'taro-ui'
import moment from 'moment'

// import connect from '../../utils/connection'
import avatar from '../../asset/img/avatar.png'
import server from '../../server/index'

import { connect } from '@tarojs/redux';
import * as targetAction from '../../store/actions/target'

import './index.scss'

@connect(() => ({
  
}), (dispatch) => ({
  chooseCurrentTarget (params) {
    dispatch(targetAction.chooseCurrentTarget(params))
  }
}))
class Index extends Component {

  constructor(props) {
    super(props)

    this.state = {
      targetList: []
    }

    console.log(this)
    
    this.goToAddTarget = this.goToAddTarget.bind(this)
    this.goToEditTarget = this.goToEditTarget.bind(this)
  }

  componentWillMount () {
    Taro.login({
      success: async (res) => {
        if (res.errMsg === 'login:ok') {
          const userInfo = await server.login({
            jsCode: res.code
          })
          
          // 查询用户名下的目标，并展示
          const targetList = await server.getTargetList({
            appUserNum: userInfo.appUserNum
          })
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

  goToAddTarget() {
    const { chooseCurrentTarget } = this.props
    chooseCurrentTarget(null)
    Taro.navigateTo({
      url: '/pages/editTarget/editTarget'
    })
  }

  goToEditTarget(target) {
    const { chooseCurrentTarget } = this.props

    console.log(target)
    chooseCurrentTarget(target)
    Taro.navigateTo({
      url: '/pages/editTarget/editTarget'
    })
  }

  _renderTargetList() {
    const {
      targetList
    } = this.state

    return (
      <View>
        {
          targetList.map((target, ind) => {
            return (
                <View 
                  key={target.targetNum}
                  onClick={() => {
                    this.goToEditTarget(target)
                  }}
                >
                  <View>
                    { target.targetName }
                  </View>
                  <View>
                    打卡次数：{
                      target.targetPickCount
                    }
                  </View>
                  <View>
                    上次打卡时间：{
                      moment(new Date(target.lastPickTime)).format('YYYY-MM-DD hh:mm')
                    }
                  </View>
                </View>
            )
          })
        }
      </View>
    )
  }

  render () {
    const {
      targetList
    } = this.state
    return (
      <View>
        <View>
          <View className="d-flex p-3">
            <Image src={avatar} className="avatar"/>
            <View className="ml-3">
              <View className="">用户名</View>
            </View>
          </View>
          <View>
            <AtButton 
              type="secondary" 
              className="add-target"
              onClick={this.goToAddTarget}
            >
              添加任务
            </AtButton>
          </View>
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

export default Index