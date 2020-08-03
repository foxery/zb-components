import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Row, Col } from 'antd'
import 'antd/es/row/style/css'
import 'antd/es/col/style/css'

import './template-group.css'

class Template extends Component {
  constructor(props) {
    super(props)
    this.state = {
      icon: this.props.icon,
      hover: false
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ icon: nextProps.icon })
  }

  render() {
    return (
      <div
        className={'ryu-template-item'}
        style={{
          background: this.state.hover || this.props.selected ? '#f6f6f6' : 'white',
          borderRadius: 4,
          paddingTop: 16,
          paddingBottom: 16,
          width: 76,
          height: 100
        }}
        onMouseOver={this.onMouseOver}
        onMouseLeave={this.onMouseLeave}
        onDragEnd={this.onDragEnd}
        draggable={true}
        onDragStart={this.onDragStart}
      >
        <img src={this.state.icon} width={25} height={25} draggable={false}></img>
        <div style={{ marginTop: 16, color: '#7C7C7C', fontSize: 12 }}>{this.props.name}</div>
      </div>
    )
  }

  onMouseOver = () => {
    this.setState({ icon: this.props.selectIcon, hover: true })
  }
  
  onMouseLeave = () => {
    this.setState({ icon: this.props.icon, hover: false })
  }
  
  onDragStart = event => {
    event.dataTransfer.setData('pluginId', this.props.pluginId)
  }
  
  onDragEnd = () => {
    this.setState({ icon: this.props.icon, hover: false })
  }
}

export default class TemplateGroup extends Component {
  static propTypes = {
    group: PropTypes.string,
    plugins: PropTypes.array
  }

  static defaultProps = {
    group: '',
    plugins: []
  }

  render() {
    const plugins = this.props.plugins.filter(item => {
      return item.display !== false
    })

    const items = plugins.reduce((total, currentValue, currentIndex) => {
      if (total[currentIndex % 2]) {
        total[currentIndex % 2].push(currentValue)
      } else {
        total[currentIndex % 2] = [currentValue]
      }
      return total
    }, {})

    const templates = templateItems => {
      return templateItems.map(item => {
        return (
          <Template
            key={item.id}
            pluginId={item.id}
            selected={this.props.currentPluginId == item.id}
            icon={this.props.currentPluginId == item.id ? item.selectIcon : item.icon}
            selectIcon={item.selectIcon}
            name={item.name}
          ></Template>
        )
      })
    }
    return (
      <Row className={`ryu-template ${plugins.length == 0 && 'ryu-template-hidden'}`}>
        <Col span={24} className={'ryu-template-group'}>
          {this.props.group}
        </Col>
        <Col span={24} style={{ paddingLeft: 30, paddingRight: 30 }}>
          <Row>
            <Col span={12}>{templates(items[0] || [])}</Col>
            <Col span={12}>{templates(items[1] || [])}</Col>
          </Row>
        </Col>
      </Row>
    )
  }
}
