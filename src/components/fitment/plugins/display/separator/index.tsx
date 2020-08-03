import React, { Component } from 'react'

interface Iprops {
  type: number
  background: string
  color: string
}

export default class SeparatorPlugin extends Component<Iprops> {
  render() {
    const { type = 0, color = '#f6f6f6', background } = this.props
    return (
      <div
        style={{
          height: '0rem',
          background: background,
          border: `0.02rem ${+type === 1 ? 'solid' : 'dashed'} ${color}`
        }}
      ></div>
    )
  }
}
