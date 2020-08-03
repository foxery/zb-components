import React, { Component } from 'react'
import { Radio } from 'antd'
import { SketchPicker } from 'react-color'
import { EditLayout } from '../../../ui/index'

import 'antd/es/radio/style/css'

const RadioGroup = Radio.Group

interface Iprops {
  ryu: (props: any) => void
  color: string
  type: number
}

export default class EditSeparatorPlugin extends Component<Iprops> {
  static defaultProps = {
    type: 0,
    color: '#f6f6f6'
  }

  render() {
    const { type = 0, color = '#f6f6f6' } = this.props
    return (
      <EditLayout>
        <EditLayout.Item title='组件说明'>用于分隔组件</EditLayout.Item>
        <EditLayout.Item title='分隔线类型'>
          <RadioGroup onChange={this.onTypeChange} value={type}>
            <Radio value={0}>虚线</Radio>
            <Radio value={1}>实线</Radio>
          </RadioGroup>
        </EditLayout.Item>
        <EditLayout.Item title='背景颜色设置'>
          <div style={{ padding: '0.16rem' }}>
            <SketchPicker color={color} onChange={this.onColorChange}></SketchPicker>
          </div>
        </EditLayout.Item>
      </EditLayout>
    )
  }

  onTypeChange = (event: any) => {
    const type = parseInt(event.target.value)
    const props = Object.assign({}, this.props, { type: type })
    this.props.ryu(props)
  }

  onColorChange = (value: any) => {
    const props = Object.assign({}, this.props, { color: value.hex })
    this.props.ryu(props)
  }
}
