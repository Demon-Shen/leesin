import Taro, { Component } from '@tarojs/taro'
import { AtForm, AtInput, AtTextarea, AtButton } from 'taro-ui'
import { connect } from '@tarojs/redux';
import { View } from '@tarojs/components';
import moment from 'moment'
import actions from '../../store/actions/index'

const pageSize = 10

@connect((state) => ({
  currentTarget: state.target.currentTarget,
  pickedRecords: state.pickedRecords.pickedRecords,
  appUserNum: state.userInfo.appUserNum
}), (dispatch) => ({
  getPickedRecords: (params) => dispatch(actions.getPickedRecords(params)),
}))
export default class PickedList extends Component{
  config = {
    navigationBarTitleText: '打卡记录'
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      pageNum: 0
    }
    this.goToPickTarget = this.goToPickTarget.bind(this)
    this.goToEditTarget = this.goToEditTarget.bind(this)
    this.loading = this.loading.bind(this)
  }
  componentWillMount() {
    const { pageNum } = this.state

    const {
      getPickedRecords,
      appUserNum,
      currentTarget
    } = this.props
    this.loading(true)
    let params = {
      appUserNums: [appUserNum],
      targetNums: [currentTarget.targetNum],
      pageSize,
      pageNum,
      sortField: 'pick_time desc',
      resolved: (res) => {
        this.loading(false)
      },
      rejected: (rej) => {
        this.loading(false)
      }
    }
    getPickedRecords(params)
  }

  goToPickTarget () {
    Taro.navigateTo({
      url: '/pages/pickDaily/pickDaily'
    })
  }
  
  loading(status) {
    this.setState({
      loading: status
    })
  }

  goToEditTarget() {
    Taro.navigateTo({
      url: '/pages/editTarget/editTarget'
    })
  }

  _renderPickedRecordList() {
    const { pickedRecords } = this.props
    return (
      <View>
        {
          pickedRecords.map(ele => (
            <View 
              key={ele.pickFid}
              className="d-flex justify-content-between p-2 border-00"
            >
              <View>
                {
                  ele.pickMemo
                }
              </View>
              <View>
                {
                  moment(ele.pickTime).format('MM-DD')
                }
              </View>
            </View>
          ))
        }
      </View>
    )
  }

  render() {
    const { loading } = this.state
    const { currentTarget } = this.props

    return (
      <View>
        <View>
          {
            currentTarget.targetContent
          }
        </View>
        <AtActivityIndicator 
          isOpened={loading} 
          mode="center" 
        />
        {
          this._renderPickedRecordList()
        }
        <AtButton 
          onClick={this.goToPickTarget}
        >
          打卡
        </AtButton>
        <AtButton
          onClick={this.goToEditTarget}
        >
          编辑
        </AtButton>
      </View>
    )
  }
}