import React, { Component } from 'react'
import common from '../../../common'

interface Iprops {
  height: number
  background: string
}

export default class ImagePlugin extends Component<Iprops> {
  static defaultProps = {
    height: 8,
    background: '#f6f6f6'
  }
  render() {
    return <div style={{ height: common.calcStyle(this.props.height), background: this.props.background }}></div>
  }
}
