import Taro, { Component } from '@tarojs/taro'
import { connect } from '@tarojs/redux';
import { Canvas } from '@tarojs/components';
import { AtButton } from 'taro-ui';

import banner from '../../asset/img/banner.png'

const POSTER = "POSTER"
const posterWidth = 550
const posterHeight = 850

@connect((state) => ({
  currentTarget: state.target.currentTarget,
  pickedRecords: state.pickedRecords.pickedRecords,
}), dispatch => ({

}))
export default class SharePoster extends Component {
  config = {
    navigationBarTitleText: '分享'
  }
  componentDidMount() {
    const { 
      currentTarget, 
      pickedRecords 
    } = this.props
    const ctx = Taro.createCanvasContext(POSTER, this)
    Taro.getImageInfo({
      src: '../../asset/img/banner.png',
      success: (res) => {
        if (res.errMsg === 'getImageInfo:ok') {
          console.log(res)
          ctx.drawImage('../../asset/img/banner.png', 0, 0, posterWidth, posterHeight)
          ctx.draw()
          ctx.fillText(currentTarget.targetName, 100, 100)
          ctx.fillText(`坚持打卡的第${pickedRecords.length}天`, 100, 120)
          ctx.draw(true)  
        }
      }
    })
  }

  savePoster() {
    Taro.canvasGetImageData({
      canvasId: POSTER,
      x: 0,
      y: 0,
      width: posterWidth,
      height: posterHeight,
      success: res => {
        console.log(res)
      }
    })
  }

  render() {
    return (
      <View>
        <View className="d-flex justify-content-center">
          <Canvas
            canvasId={POSTER}
            className="border-00"
            style={{
              width: `${posterWidth}rpx`,
              height: `${posterHeight}rpx`
            }}
          />
        </View>
        <AtButton
          className="m-3"
          type="secondary"
          onClick={this.savePoster}
        >
          保存图片
        </AtButton>
      </View>
    )
  }
}