import React, { Component } from 'react'
import ToolBarButton from './toolbar-button'
import './toolbar.css'

interface Iprops {
  toolbarConfig: any[]
}

export default class Toolbar extends Component<Iprops> {
  render() {
    const { toolbarConfig = [] } = this.props
    const toolbarButtons = (items, style) => {
      return items.map(item => {
        return <ToolBarButton {...item} style={style}></ToolBarButton>
      })
    }
    return (
      <div className={'ryu-toolbar'}>
        {toolbarButtons(toolbarConfig, { marginRight: 8 })}
      </div>
    )
  }
}
