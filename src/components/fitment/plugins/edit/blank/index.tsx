import React, { Component } from 'react'
import { InputNumber } from 'antd'
import { SketchPicker } from 'react-color'
import { EditLayout } from '../../../ui/index'
import 'antd/es/input-number/style/css'

interface Iprops {
  ryu: (props: any) => void
  height: number
  background: string
}

export default class EditBlankPlugin extends Component<Iprops> {
  static defaultProps = {
    height: 8,
    background: '#f6f6f6'
  }

  render() {
    const { height = 8, background = '#f6f6f6' } = this.props
    return (
      <EditLayout>
        <EditLayout.Item title='组件说明'>用于控制组件间间距</EditLayout.Item>
        <EditLayout.Item title='高度设置'>
          高度：
          <InputNumber onChange={this.onHeightChange} min={1} precision={1} max={750} value={height}></InputNumber>
        </EditLayout.Item>
        <EditLayout.Item title='背景颜色设置'>
          <div style={{ padding: '0.16rem' }}>
            <SketchPicker color={background} onChange={this.onBackgroundChange}></SketchPicker>
          </div>
        </EditLayout.Item>
      </EditLayout>
    )
  }

  onHeightChange = (value: number) => {
    const props = Object.assign({}, this.props, { height: value })
    this.props.ryu(props)
  }

  onBackgroundChange = (value: any) => {
    const props = Object.assign({}, this.props, { background: value.hex })
    this.props.ryu(props)
  }
}
