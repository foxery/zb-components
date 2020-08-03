import React, { Component } from 'react'
import PropTypes from 'prop-types'

interface Iprops {
  onAddPlugin: (pluginId: any) => void
  onMoveBottom?: (key: any) => void
}

const style = {
  container: {
    border: '2px dashed #646464',
    height: 80,
    lineHeight: '80px',
    textAlign: 'center',
    verticalAlign: 'middle',
    fontSize: 16
  },
  dragoverStyle: {
    border: '2px dashed #4990E2',
    color: '#4990E2'
  }
}

export default class AddPluginArea extends Component<Iprops, any> {
  state = {
    dragover: false
  }

  render() {
    const newStyle = Object.assign({}, style.container)
    if (this.state.dragover) {
      Object.assign(newStyle, style.dragoverStyle)
    }
    return (
      <div
        style={newStyle}
        draggable={true}
        onDragEnter={this.onDragEnter}
        onDragOver={this.onDragOver}
        onDrop={this.onDrop}
        onDragLeave={this.onDragLeave}
      >
        鼠标拖拽模块添加到此
      </div>
    )
  }

  onDragEnter = () => {
    this.setState({ dragover: true })
  }

  onDragOver = event => {
    event.preventDefault()
    this.setState({ dragover: true })
  }

  // 拖拽结束回调，获取拖拽的插件id
  onDrop = event => {
    this.setState({ dragover: false })
    const pluginId = event.dataTransfer.getData('pluginId')
    if (pluginId) {
      this.props.onAddPlugin(pluginId)
    }

    // const key = event.dataTransfer.getData('key')
    // if (key) {
    //   this.props.onMoveBottom(key)
    // }
  }

  onDragLeave = () => {
    this.setState({ dragover: false })
  }
}
