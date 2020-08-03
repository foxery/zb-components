import React, { Component } from 'react'
import { Tabs } from 'antd'
import WechatHeader from './ui/wechat-header'
import AddPluginArea from './ui/add-plugin-area'
import TemplateGroup from './ui/template-group'
import Toolbar from './ui/toolbar'
import uuid from './ui/uuid'
import AllPlugin from './plugins'
import operations from './utils/operations'
import ArrayUtils from './utils/array-utils'
import PageEditor from './ui/page-editor'

import 'antd/es/tabs/style/css'
import './index.css'

const TabPane = Tabs.TabPane

interface PluginItem {
  pluginId: string
  props: any
  key: string
}

interface Iprops {
  title?: string
  onChange?: () => void
  toolbarConfig: any
  dataSource?: any[]
}

interface IState {
  dataSource: PluginItem[]
  selectKey: string
  activeKey: string
  title: string
  pageError: any
  background: string
}

export default class Fitment extends Component<Iprops, IState> {
  constructor(props: Iprops) {
    super(props)
    this.state = {
      dataSource: [],
      selectKey: '',
      activeKey: '2',
      title: '',
      pageError: null,
      background: ''
    }
    document.getElementsByTagName('html')[0].style.fontSize = '37.5px'
    if (Array.isArray(AllPlugin)) {
      AllPlugin.forEach(group => {
        group.plugins.forEach(plugin => {
          if (plugin.type) {
            plugin.type = operations(plugin.type)
          }
        })
      })
    }
  }

  componentDidMount() {
    const { title, dataSource } = this.props
    let list: any[] = []
    dataSource.map(v => {
      list.push(this.onAddPlugin(v.pluginId, v.key, v.props))
    })
    this.setState({ title, dataSource: list })
  }

  // 添加插件  拖拽回调
  onAddPlugin = (pluginId: string, key?: string, props?: any) => {
    if (pluginId) {
      const dataSource = Array.from(this.state.dataSource)
      const pluginInstance = this.createPluginInstance(pluginId, key, props)
      if (key) return pluginInstance
      if (!key && pluginInstance) {
        dataSource.push(pluginInstance)
        this.setState({
          dataSource: dataSource,
          selectKey: pluginInstance.key,
          activeKey: '1'
        })
      }
    }
  }

  // 创建插件
  createPluginInstance = (pluginId: string, key?: string, props?: any) => {
    const plugin = this.getPluginById(pluginId)
    if (plugin) {
      const newKey = key || uuid()
      return {
        pluginId: pluginId,
        key: newKey,
        props: this.addRyuProps(newKey, plugin, { key: newKey, ...props })
      }
    }
    return null
  }

  addRyuProps = (key, plugin, props) => {
    return Object.assign(
      {},
      {
        ryuSelected: false,
        ryuSelectBtn: plugin.selectBtn,
        ryuOnTop: () => {
          this.moveTop(key)
        },
        ryuOnBottom: () => {
          this.moveBottom(key)
        },
        ryuOnUp: () => {
          this.moveUp(key)
        },
        ryuOnDown: () => {
          this.moveDown(key)
        },
        ryuOnDelete: () => {
          this.delete(key)
        },
        ryuOnSelect: () => {
          this.select(key)
        },
        //ryuOnInsertPlugin: (pluginId) => { this.onInserPlugin(pluginId, key); },
        ryuOnInsertPluginBefore: pluginId => {
          this.onInsertPluginBefore(pluginId, key)
        },
        ryuOnInsertPluginAfter: pluginId => {
          this.onInsertPluginAfter(pluginId, key)
        },
        //ryuOnMovePlugin: (fromKey) => { this.onMovePlugin(fromKey, key); },
        ryuOnMovePluginBefore: fromKey => {
          this.onMovePluginBefore(fromKey, key)
        },
        ryuOnMovePluginAfter: fromKey => {
          this.onMovePluginAfter(fromKey, key)
        },
        ryuMode: 'edit',
        ryuDeletable: plugin.deletable,
        ryuKey: key
      },
      props
    )
  }

  // 已拖拽插件
  get plugins() {
    return this.state.dataSource.map(data => {
      const plugin = this.getPluginById(data.pluginId)
      const props = Object.assign({}, data.props, { ryuSelected: this.state.selectKey == data.key })
      if (plugin && plugin.type) {
        return React.createElement(plugin.type, props)
      }
      return null
    })
  }

  // 通过插件id获取插件
  getPluginById = id => {
    const allPlugins = AllPlugin.reduce((total, currentValue) => {
      total.push(...(currentValue.plugins || []))
      return total
    }, [])
    for (let i = 0; i < allPlugins.length; i++) {
      if (allPlugins[i].id == id) {
        return allPlugins[i]
      }
    }
  }

  getPluginByKey = key => {
    const { dataSource } = this.state
    const index = ArrayUtils.findIndex(dataSource, item => {
      return item.key == key
    })
    if (index != -1) {
      return this.getPluginById(dataSource[index].pluginId)
    }
  }

  getPropsByKey = key => {
    const { dataSource } = this.state
    const index = ArrayUtils.findIndex(dataSource, item => {
      return item.key == key
    })
    if (index != -1) {
      return dataSource[index].props
    }
  }

  changeProps = (newProps, fn) => {
    const { ryu, ryu_onChange, ...pureNewProps } = newProps
    const props = this.getPropsByKey(this.state.selectKey)
    if (props) {
      Object.assign(props, pureNewProps)
      this.setState({ dataSource: this.state.dataSource }, fn)
    }
  }

  getValueFromState = () => {
    const { title, background, dataSource } = this.state
    return {
      title,
      background,
      dataSource: Array.from(dataSource, data => {
        return Object.assign({}, data)
      }).map(data => {
        data.props = this.removeRyuProps(data.props)
        return data
      })
    }
  }

  addGetValue = (items: any[]) => {
    return items.map(item => {
      item.getValue = () => {
        return this.getValueFromState()
      }
      return item
    })
  }

  removeRyuProps = (props: any) => {
    const newProps: any = {}
    Object.keys(props).forEach(key => {
      if (!key.startsWith('ryu')) {
        newProps[key] = props[key]
      }
    })
    return newProps
  }

  render() {
    const { dataSource, selectKey, title, background } = this.state
    const { toolbarConfig = [] } = this.props
    const newToolbarConfig = this.addGetValue(toolbarConfig)
    const plugin = this.getPluginByKey(selectKey)
    let props = this.getPropsByKey(this.state.selectKey) || {}
    props = Object.assign({}, props, { ryu: this.changeProps })
    const hideToolbar = toolbarConfig.length === 0
    console.log(dataSource)
    console.log(this.props)
    return (
      <div className='ryu-editor'>
        {hideToolbar ? null : (
          <div className={`ryu-editor-toolbar`}>
            <Toolbar toolbarConfig={newToolbarConfig}></Toolbar>
          </div>
        )}
        <div className='ryu-editor-plugin-template' style={{ top: hideToolbar ? 0 : 50 }}>
          {AllPlugin.map(item => {
            return (
              <TemplateGroup
                currentPluginId={plugin ? plugin.id : -1}
                key={item.group}
                group={item.group}
                plugins={item.plugins}
              ></TemplateGroup>
            )
          })}
        </div>
        <div className='ryu-editor-plugin-list' style={{ top: hideToolbar ? 0 : 50 }}>
          <div className='ryu-editor-plugin-list-container' style={{ height: '100%' }}>
            <WechatHeader title={title} />
            <div style={{ height: 'calc(100% - 57px)', backgroundColor: background }}>
              {this.plugins}
              {dataSource.length > 0 ? null : (
                <AddPluginArea onAddPlugin={this.onAddPlugin} onMoveBottom={this.moveBottom}></AddPluginArea>
              )}
            </div>
          </div>
        </div>
        <div className='ryu-editor-plugin-editor' style={{ top: hideToolbar ? 0 : 50 }}>
          <Tabs
            activeKey={this.state.activeKey}
            onChange={key => {
              this.setState({ activeKey: key })
            }}
            size='small'
            style={{ marginTop: 16 }}
          >
            <TabPane tab='编辑组件' key='1'>
              {plugin && plugin.editType ? React.createElement(plugin.editType, props) : <div></div>}
            </TabPane>
            <TabPane tab='设置封面' key='2'>
              <PageEditor
                title={title}
                onTitleChange={this.onTitleChange}
                background={background}
                onBackgroundChange={this.onBackgroundChange}
              ></PageEditor>
            </TabPane>
          </Tabs>
        </div>
      </div>
    )
  }

  onTitleChange = (value: string) => {
    value = value || ''
    this.setState({
      title: value
    })
  }

  onBackgroundChange = (value: any) => {
    this.setState({
      background: value
    })
  }

  onInsertPluginBefore = (pluginId: string, key: string) => {
    let dataSource = Array.from(this.state.dataSource)
    const pluginInstance = this.createPluginInstance(pluginId)
    dataSource = ArrayUtils.insertBefore(dataSource, this.predicate(key), pluginInstance)
    this.setState({
      dataSource: dataSource,
      selectKey: pluginInstance.key,
      activeKey: '1'
    })
  }

  onInsertPluginAfter = (pluginId: string, key: string) => {
    let dataSource = Array.from(this.state.dataSource)
    const pluginInstance = this.createPluginInstance(pluginId)
    dataSource = ArrayUtils.insertAfter(dataSource, this.predicate(key), pluginInstance)
    this.setState({
      dataSource: dataSource,
      selectKey: pluginInstance.key,
      activeKey: '1'
    })
  }

  onMovePlugin = (from: any, to: any) => {
    let dataSource = Array.from(this.state.dataSource)
    ArrayUtils.move(dataSource, this.predicate(from), this.predicate(to))
    this.setState({
      dataSource: dataSource,
      selectKey: from,
      activeKey: '1'
    })
  }

  onMovePluginBefore = (from: any, to: any) => {
    let dataSource = Array.from(this.state.dataSource)
    dataSource = ArrayUtils.moveBefore(dataSource, this.predicate(from), this.predicate(to))
    this.setState({
      dataSource: dataSource,
      selectKey: from,
      activeKey: '1'
    })
  }

  onMovePluginAfter = (from: any, to: any) => {
    let dataSource = Array.from(this.state.dataSource)
    dataSource = ArrayUtils.moveAfter(dataSource, this.predicate(from), this.predicate(to))
    this.setState({
      dataSource: dataSource,
      selectKey: from,
      activeKey: '1'
    })
  }

  predicate = (key: string) => {
    return (data: any) => {
      return data.key == key
    }
  }

  moveAction = (action: any, key: string) => {
    const dataSource = action(this.state.dataSource, this.predicate(key))
    this.setState({ dataSource: dataSource })
  }

  moveUp = (key: string) => {
    this.moveAction(ArrayUtils.moveUp, key)
  }

  moveDown = (key: string) => {
    this.moveAction(ArrayUtils.moveDown, key)
  }

  moveTop = (key: string) => {
    this.moveAction(ArrayUtils.moveTop, key)
  }

  moveBottom = (key: string) => {
    this.moveAction(ArrayUtils.moveBottom, key)
  }

  select = (key: string) => {
    const index = ArrayUtils.findIndex(this.state.dataSource, this.predicate(key))
    if (index != -1) {
      this.setState({ selectKey: key, activeKey: '1' })
    }
  }

  delete = (key: string) => {
    const dataSource = ArrayUtils.remove(this.state.dataSource, this.predicate(key))
    if (this.state.selectKey == key) {
      this.setState({ dataSource: dataSource, activeKey: '2' })
    } else {
      this.setState({ dataSource: dataSource })
    }
  }
}
