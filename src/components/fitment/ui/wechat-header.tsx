import React, { Component } from 'react'
import Image from './image'

interface Iprops {
  title?: string
}

const style = {
  container: {
    marginTop: 16,
    height: 57,
    position: 'relative'
  },
  title: {
    position: 'absolute',
    left: 60,
    right: 60,
    top: 20,
    height: 36,
    lineHeight: '36px',
    textAlign: 'center',
    verticalAlign: 'middle',
    background: '#1b1b1f',
    color: '#c6c6c6',
    fontSize: 16,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
}

export default class WechatHeader extends Component<Iprops> {
  render() {
    const { title } = this.props
    return (
      <div style={style.container}>
        <Image src='https://img.dianjia.io/vpc/1/spu/wechat-nav1502353797710.png' width='100%' height={57} />

        <div style={style.title}>{title && title.length > 0 ? title : '添加标题文本'}</div>
      </div>
    )
  }
}
