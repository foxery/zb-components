import React, { Component, Fragment } from 'react'
import { message } from 'antd'
import moment from 'moment'
import { getType, getCouponDetail, checkUser } from './api'
import { gotoMiniProgram } from '../../../../../utils/goto'
import './index.css'

const selImage = 'https://static.zbszkj.com/images/fitment/plugin_image_s.jpeg'

interface Iprops {
  urlList: any[]
  type: number // 1-优惠券 2-h5 3-小程序
  arrType: number // 1-单列 2-双列 3-三列
}

export default class ImagePlugin extends Component<Iprops> {
  limit = this.props.match ? this.props.match.params.limit : null

  onImgClick = (item: any) => {
    console.log('click！', item)
    const {
      type = 1,
      link = '',
      url = '',
      date = [moment().format('YYYY-MM-DD HH:mm:ss'), moment().format('YYYY-MM-DD HH:mm:ss')]
    } = item
    const [beginAt, endAt] = date
    if (date[0] && date[1]) {
      const now = new Date().getTime()
      const start = new Date(moment(beginAt).format()).getTime()
      const end = new Date(moment(endAt).format()).getTime()
      console.log(start, now, end)
      if (now < start) {
        message.warn('活动尚未开始，请耐心等待！')
      } else if (now > end) {
        message.warn('活动已结束，下次早点来哟~')
      } else {
        if (type === 1) {
          // 优惠券
          getType({ id: link }).then((types: any) => {
            if (types.type === 2) {
              // 券包
              this.dueToGoodsDetail(types, link, 2)
            } else {
              getCouponDetail(link).then((res: any) => {
                const couponDetail = res.records[0] || {}
                this.dueToGoodsDetail(couponDetail, link)
              })
            }
          })
        } else if (type === 2) {
          // \(^o^)/~h5链接
          if (/^game?:\/\//.test(link)) {
            let gameUrl = link.replace('game://', '')
            gotoMiniProgram(`/packageA/pages/webviewGame/webviewGame?url=${gameUrl}`)
          } else {
            gotoMiniProgram(`/packageA/pages/webviewWithToken/webviewWithToken?url=${link}`)
          }
        } else if (type === 3) {
          // 小程序链接
          if (/^game?:\/\//.test(link)) {
            let gameUrl = link.replace('game://', '')
            gotoMiniProgram(`/packageA/pages/webviewGame/webviewGame?url=${gameUrl}`)
          } else {
            gotoMiniProgram(link)
          }
        }
      }
    } else {
      message.warn('活动尚未开始，请耐心等待！')
    }
  }

  dueToGoodsDetail = (detail: any, couponId: string, type?: number) => {
    if (detail.stock == 0) {
      message.warn('已抢光！')
    } else if (detail.reachPurchaseLimit) {
      message.warn('已领取该优惠券！')
    } else {
      if (!this.limit) {
        checkUser().then(res => {
          if (!res) {
            this.toCoupon(couponId)
          } else {
            message.warn('已抢光！')
          }
        })
      } else {
        if (type) {
          // 跳转券包
          gotoMiniProgram(`/packageA/pages/integral/place-order/place-order?id=${couponId}&goodsNumber=1`)
        } else {
          this.toCoupon(couponId)
        }
      }
    }
  }

  toCoupon = (couponId: string) => {
    gotoMiniProgram('/packageA/pages/integral/reduction/index?id=' + couponId)
  }

  render() {
    const { urlList = [], arrType = 1 } = this.props
    console.log('img-plugin-props', this.props)
    return (
      <Fragment>
        {urlList.length > 0 ? (
          <div style={{ width: '100%', fontSize: 0 }}>
            {urlList.map(item => (
              <div
                onClick={() => this.onImgClick(item)}
                style={{ width: 100 / arrType + '%', display: 'inline-block' }}
              >
                <img style={{ width: '100%', height: 'auto' }} src={item.url} />
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
