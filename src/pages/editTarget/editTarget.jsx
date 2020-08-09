import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux';

@connect((state) => ({
  currentTarget: state.target.currentTarget
}), (dispatch) => ({

}))
class EditTarget extends Component {
  config = {
    navigationBarTitleText: '新增'
  }
  constructor(props) {
    super(props)
  }

  componentWillMount(props) {
    console.log(this.props)
    if (this.props.currentTarget) {
      Taro.setNavigationBarTitle({
        title: '编辑'
      })
    }
  }

  render() {
    return (
      <View>
        我的
      </View>
    )
  }
}

export default EditTarget