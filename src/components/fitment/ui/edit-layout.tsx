import React, { Component } from 'react'
import './edit-layout.css'

export default class EditLayout extends Component {
  render() {
    return <div className='ryu-edit-layout'>{this.props.children}</div>
  }
}

EditLayout.Item = class extends Component {
  render() {
    const classPrefix = 'ryu-edit-layout'
    return (
      <div className={`${classPrefix}-item`}>
        <div>
          <div className={`${classPrefix}-item-title-prefix`}></div>
          <div className={`${classPrefix}-item-title`}>{this.props.title}</div>
          <div className={`${classPrefix}-clear`}></div>
        </div>
        <div className={`${classPrefix}-item-separator`}></div>
        <div>{this.props.children}</div>
      </div>
    )
  }
}
