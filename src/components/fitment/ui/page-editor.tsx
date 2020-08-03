import React, { Component } from 'react'
import { Input } from 'antd'
import { SketchPicker } from 'react-color'
import EditLayout from './edit-layout'
import 'antd/es/input/style/css'

interface Iprops {
  title: string
  background: string
  onTitleChange: (value: string) => void
  onBackgroundChange: (value: string) => void
}

export default class PageEditor extends Component<Iprops> {
  constructor(props: Iprops) {
    super(props)
  }

  onTitleChange = (event: any) => {
    const value = event.target.value
    this.props.onTitleChange(value)
  }

  onBackgroundChange = (value: any) => {
    this.props.onBackgroundChange(value.hex)
  }

  render() {
    const { title, background } = this.props
    return (
      <EditLayout>
        <EditLayout.Item title='页面标题'>
          <Input
            style={{ width: 200 }}
            placeholder='请输入页面标题'
            onChange={this.onTitleChange}
            value={title}
            maxLength={10}
          />
        </EditLayout.Item>
        <EditLayout.Item title='背景颜色设置'>
          <div style={{ padding: '0.16rem' }}>
            <SketchPicker color={background} onChange={this.onBackgroundChange}></SketchPicker>
          </div>
        </EditLayout.Item>
      </EditLayout>
    )
  }
}
