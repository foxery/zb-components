import React, { Component, Fragment } from 'react'
import './index.css'

const selImage = 'https://static.zbszkj.com/images/fitment/plugin_image_s.jpeg'

interface Iprops {
  urlList: any[]
  type: number // 1-优惠券 2-h5 3-小程序
  arrType: number // 1-单列 2-双列 3-三列
}

export default class ImagePlugin extends Component<Iprops> {
  onImgClick = (item: any) => {
    console.log('click！', item)
  }

  render() {
    const { urlList = [], arrType = 1 } = this.props
    console.log('img-plugin-props', this.props)
    return (
      <Fragment>
        {urlList.length > 0 ? (
          <div style={{ width: '100%' }}>
            {urlList.map(url => (
              <div onClick={() => this.onImgClick(url)} style={{ width: 100 / arrType + '%', display: 'inline-block' }}>
                <img style={{ width: '100%', height: 'auto' }} src={url} />
              </div>
            ))}
          </div>
        ) : (
          <div className='img-plugin-default'>
            <img src={selImage} />
            <div>请添加图片</div>
          </div>
        )}
      </Fragment>
    )
  }
}
