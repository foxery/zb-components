const list: string[] = [
  '/pages/mall/index',
  '/pages/person/index',
  '/pages/tabBar/coupon/index',
  '/pages/o2o/index',
  '/pages/BaihuoMall/index'
]

export const gotoMiniProgram = (url: string, type = 'navigateTo') => {
  if (url && url[0] !== '/') {
    url = '/' + url
  }
  if (window.my) {
    if (type === 'navigateBack') {
      window.my[type]({ delta: url })
    } else {
      window.my[type]({ url })
    }
  } else if (window.wx) {
    if (type === 'navigateBack') {
      window.wx.miniProgram[type]({ delta: url })
    } else {
      if (list.includes(url)) {
        window.wx.miniProgram['switchTab']({ url })
      } else {
        window.wx.miniProgram[type]({ url })
      }
    }
  }
}
