import Taro, { Component } from '@tarojs/taro'
import { ScrollView, View, Image } from '@tarojs/components'
import { AtButton, AtActivityIndicator, AtList, AtListItem } from 'taro-ui'
import moment from 'moment'

import { connect } from '@tarojs/redux';
import actions from '../../store/actions/index'
import avatar from '../../asset/img/avatar.png'

import './index.scss'

@connect((state) => ({
  currentTarget: state.target.currentTarget,
  targetList: state.target.targetList,
  appUserNum: state.userInfo.appUserNum,
  appUserAvatarUrl: state.userInfo.appUserAvatarUrl,
  appUserName: state.userInfo.appUserName,
  appUserWxAccredit: state.userInfo.appUserWxAccredit
}), (dispatch) => ({
  getUserInfo: (params) => dispatch(actions.getUserInfo(params)),
  getTargetList: (params) => dispatch(actions.getTargetList(params)),
  chooseCurrentTarget: (params) => dispatch(actions.chooseCurrentTarget(params)),
  signIn: params => dispatch(actions.signIn(params)),
  saveWxInfo: params => dispatch(actions.saveWxInfo(params))
}))
class Index extends Component {

  constructor(props) {
    super(props)

    this.state = {
      loading: false,

    }
    
    this.goToAddTarget = this.goToAddTarget.bind(this)
    this.goToTargetDetail = this.goToTargetDetail.bind(this)
    this.loading = this.loading.bind(this)
    this.signIn = this.signIn.bind(this)
  }

  componentWillMount () {
    const { getUserInfo, getTargetList } = this.props
    Taro.login({
      success: async (res) => {
        if (res.errMsg === 'login:ok') {
          this.loading(true)
          getUserInfo({
            jsCode: res.code,
            resolved: res => {
              // 查询用户名下的目标，并展示
              getTargetList({
                appUserNum: res.appUserNum,
                resolved: (res) => {
                  this.loading(false)
                },
                rejected: (rej) => {
                  this.loading(false)
                }
              })
            },
            rejected: rej => {
              this.loading(false)
            }
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

  componentWillReceiveProps(props) {

  }

  config = {
    navigationBarTitleText: '葱匆'
  }

  loading(status) {
    this.setState({
      loading: status
    })
  }

  goToAddTarget() {
    const { chooseCurrentTarget } = this.props
    chooseCurrentTarget(null)
    Taro.navigateTo({
      url: '/pages/editTarget/editTarget'
    })
  }

  goToTargetDetail(target) {
    const { chooseCurrentTarget } = this.props
    chooseCurrentTarget(target)
    Taro.navigateTo({
      url: '/pages/pickedRecords/pickedRecords'
    })
  }

  signIn() {
    const { saveWxInfo, appUserNum } = this.props
    Taro.getUserInfo({
      withCredentials: true,
      success: e => {
        if (e.errMsg === 'getUserInfo:ok') {
          const {
            avatarUrl,
            nickName,
            gender
          } = e.userInfo
          this.loading(true)
          saveWxInfo({
            appUserName: encodeURI(nickName),
            appUserGender: gender,
            appUserAvatarUrl: avatarUrl,
            appUserNum,
            resolved: res => {
              this.loading(false)
            },
            rejected: rej => {
              this.loading(false)
            }
          })
          
        }
      },
      fail: rej => {
        Taro.showToast('需要授权获取个人信息')
      }
    })
  }
  renderTargetList() {
    const {
      targetList
    } = this.props
    
    return (
      <View>
        {
          targetList.map((target, ind) => {
            return (
              <View 
                className="p-2 pt-3 target-item"
                key={target.targetNum}
                onClick={() => {
                  this.goToTargetDetail(target)
                }}
              >
                <View>
                  { target.targetName }
                </View>
                
                {
                  target.lastPickTime ? 
                    <View>
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
                    </View> : ''
                }
              </View>
            )
          })
        }
      </View>
    )
  }

  render () {
    const {
      loading
    } = this.state
    const {
      appUserNum,
      appUserAvatarUrl,
      appUserName,
      appUserWxAccredit
    } = this.props

    return (
      <View className="bg-banner">
        <View className="head">
          <View>
            <View className="d-flex p-3">
              <Image src={appUserAvatarUrl || avatar} className="avatar"/>
              <View className="ml-3">
                {
                  appUserWxAccredit ? 
                    <View className="">{appUserName}</View>
                    : <AtButton 
                        openType="getUserInfo"
                        type="primary"
                        onGetUserInfo={this.signIn}
                        size="small"
                      >
                        授权登陆
                      </AtButton>
                }
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
        </View>
        <ScrollView className="target-list" scrollY>
          {
            this.renderTargetList()
          }
        </ScrollView>
        <AtActivityIndicator 
          isOpened={loading} 
          mode="center" 
        />
      </View>
    )
  }
}

export default Index