import Taro, { Component } from '@tarojs/taro'
import { AtForm, AtInput, AtTextarea, AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux';
import { View, Textarea } from '@tarojs/components';
import actions from '../../store/actions/index'

@connect((state) => ({
  currentTarget: state.target.currentTarget,
  appUserNum: state.userInfo.appUserNum
}), (dispatch) => ({
  pickTarget: params => dispatch(actions.pickTarget(params))
}))
class pickDaily extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pickMemo: '',
      loading: false
    }
    this.pickTarget = this.pickTarget.bind(this)
    this.loading = this.loading.bind(this)
  }

  pickTarget() {
    const {
      pickMemo
    } = this.state
    const {
      currentTarget,
      pickTarget,
      appUserNum
    } = this.props
    this.loading(true)
    pickTarget({
      appUserNum,
      pickMemo,
      targetNum: currentTarget.targetNum,
      resolved: res => {
        this.loading(false)
        Taro.navigateBack()
      },
      rejected: rej => {
        this.loading(false)
      }
    })
  }

  loading(status) {
    this.setState({
      loading: status
    })
  }

  render() {
    const {
      pickMemo,
      loading
    } = this.state
    return (
      <div className="bg-banner">
        <AtForm>
          <AtTextarea 
            placeholder="打卡内容" 
            value={pickMemo}
            onChange={e => this.setState({
              pickMemo: e
            })}
            type="secondary"
          />
          <AtButton
            onClick={this.pickTarget}
            loading={loading}
            type="secondary"
          >
            打卡
          </AtButton>
        </AtForm>
      </div>
    )
  }
}