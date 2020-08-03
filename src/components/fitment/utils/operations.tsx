import React, { Component } from 'react'
import OperationButton from '../ui/operation-button'
import { Icon, Tooltip } from 'antd'
import GlobalState from './global-state'

const style: any = {
  selectMask: {
    border: '2px dashed #4990E2',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    position: 'absolute',
    cursor: 'pointer',
    zIndex: 19
  },
  selectMask0: {
    border: '2px solid white',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    position: 'absolute',
    cursor: 'pointer',
    zIndex: 19
  },
  selectArea: {
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    position: 'absolute',
    background: 'transparent',
    cursor: 'pointer',
    zIndex: 20
  },
  container: {
    position: 'relative'
  },
  selectBtn: {
    position: 'absolute',
    fontSize: 18,
    color: '#4990E2',
    width: 20,
    height: 20,
    right: -20,
    top: 0,
    zIndex: 2,
    cursor: 'pointer'
  },
  operations: {
    position: 'absolute',
    width: 152,
    left: 0,
    top: -30,
    height: 30,
    zIndex: 20
  },
  operation: {
    marginRight: 8
  },
  insertArea: {
    height: 65,
    lineHeight: '65px',
    verticalAlign: 'middle',
    textAlign: 'center',
    border: '2px dashed #4990E2',
    background: 'white',
    color: '#4990E2'
  },
  insertUpArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '50%'
  },
  insertDownArea: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%'
  }
}

/**
 * 给目标组件添加操作按钮和选中框
 */
class Operations extends Component<any> {
  state = {
    dragoverUp: false,
    dragoverDown: false,
    hover: false
  }
  container: any = null
  dragDom: any = null
  render() {
    const {
      ryuSelected,
      ryuSelectBtn,
      ryuOnTop,
      ryuOnBottom,
      ryuOnUp,
      ryuOnDown,
      ryuOnDelete,
      ryuOnSelect,
      ryuDeletable,
      ryuOnInsertPlugin,
      target,
      ...props
    } = this.props

    return (
      <div
        style={style.container}
        ref={a => (this.container = a)}
        draggable={true}
        onMouseOver={this.onMouseOver}
        onMouseLeave={this.onMouseLeave}
        onDragStart={this.onDragStart}
        onDragEnd={this.onDragEnd}
        // onDragEnter={this.onDragEnter}
        onDragLeave={this.onDragLeave}
        onDragOver={this.onDragOver}
        onDrop={this.onDrop}
      >
        {this.state.dragoverUp ? <div style={style.insertArea}>释放添加到此</div> : null}
        <div ref={a => (this.dragDom = a)} style={{ width: '100%', overflow: 'hidden' }}>
          {React.createElement(target, props)}
        </div>
        {this.state.dragoverDown ? <div style={style.insertArea}>释放添加到此</div> : null}
        <div style={style.selectArea} onClick={ryuOnSelect}></div>
        {this.state.hover || ryuSelected ? (
          <div style={style.operations}>
            <OperationButton type='top' style={style.operation} onClick={ryuOnTop}></OperationButton>
            <OperationButton type='up' style={style.operation} onClick={ryuOnUp}></OperationButton>
            <OperationButton type='down' style={style.operation} onClick={ryuOnDown}></OperationButton>
            <OperationButton type='bottom' style={style.operation} onClick={ryuOnBottom}></OperationButton>
            {ryuDeletable !== false ? <OperationButton type='delete' onClick={ryuOnDelete}></OperationButton> : null}
          </div>
        ) : null}
        {this.state.dragoverUp || this.state.dragoverDown || this.state.hover || ryuSelected ? (
          <div style={style.selectMask0}></div>
        ) : null}
        {this.state.dragoverUp || this.state.dragoverDown || this.state.hover || ryuSelected ? (
          <div style={style.selectMask}></div>
        ) : null}
        {ryuSelectBtn ? (
          <div onClick={ryuOnSelect} style={style.selectBtn}>
            <Tooltip placement='bottom' title='点击选择小组件'>
              <Icon type='tag-o' />
            </Tooltip>
          </div>
        ) : null}
      </div>
    )
  }

  onMouseOver = () => {
    this.setState({ hover: true })
  }

  onMouseLeave = () => {
    this.setState({ hover: false })
  }

  onDragStart = (event: React.DragEvent) => {
    GlobalState.currentMovedPlugin = this
    const img = new Image()
    img.src = 'https://img.dianjia.io/vpc/1/spu/opacity001505213080746.png'
    event.dataTransfer.setDragImage(img, 10, 10)
    event.dataTransfer.setData('key', this.props.ryuKey)
    this.startMouseTracking()
  }

  startMouseTracking = () => {
    GlobalState.mouseTrackingDom = document.createElement('div')
    GlobalState.mouseTrackingDom.style.position = 'fixed'
    GlobalState.mouseTrackingDom.style.top = '0px'
    GlobalState.mouseTrackingDom.style.left = '0px'
    GlobalState.mouseTrackingDom.style.background = '#f6f6f6'
    GlobalState.mouseTrackingDom.style.width = this.container.clientWidth + 'px'
    GlobalState.mouseTrackingDom.style.height = this.container.clientHeight + 'px'
    GlobalState.mouseTrackingDom.style.transform = `translate(${-this.container.clientWidth / 2}px, ${-this.container
      .clientHeight / 2}px)  scale(0.3333,0.3333)`
    GlobalState.mouseTrackingDom.appendChild(this.dragDom.cloneNode(true))
    document.body.appendChild(GlobalState.mouseTrackingDom)
  }

  // onDragEnter = (event) => {
  //     if (GlobalState.currentMovedPlugin != this) {
  //         this.setState({ dragover: true });
  //     }

  //     if (GlobalState.mouseTrackingDom) {
  //         GlobalState.mouseTrackingDom.style.display = 'block';
  //     }
  // }

  onDragOver = (event: React.DragEvent) => {
    event.preventDefault()
    if (GlobalState.mouseTrackingDom) {
      GlobalState.mouseTrackingDom.style.top = event.pageY + 'px'
      GlobalState.mouseTrackingDom.style.left = event.pageX + 'px'
    }

    if (GlobalState.currentMovedPlugin != this) {
      const rect = this.dragDom.getBoundingClientRect()
      const top = rect.top
      const height = rect.height

      if (top + height / 2 > event.pageY) {
        if (!this.state.dragoverUp) this.setState({ dragoverUp: true, dragoverDown: false })
      } else {
        if (!this.state.dragoverDown) this.setState({ dragoverUp: false, dragoverDown: true })
      }
    }

    if (GlobalState.mouseTrackingDom) {
      GlobalState.mouseTrackingDom.style.display = 'block'
    }
  }

  onDragLeave = () => {
    if (GlobalState.currentMovedPlugin != this) {
      this.setState({ dragoverUp: false, dragoverDown: false })
    }

    if (GlobalState.mouseTrackingDom) {
      GlobalState.mouseTrackingDom.style.display = 'none'
    }
  }

  onDrop = (event: React.DragEvent) => {
    if (GlobalState.currentMovedPlugin != this) {
      this.setState({ dragoverUp: false, dragoverDown: false })
      const pluginId = event.dataTransfer.getData('pluginId')
      if (pluginId) {
        if (this.state.dragoverUp) {
          this.props.ryuOnInsertPluginBefore(pluginId)
        } else if (this.state.dragoverDown) {
          this.props.ryuOnInsertPluginAfter(pluginId)
        }
        //this.props.ryuOnInsertPlugin(pluginId);
      }

      const key = event.dataTransfer.getData('key')
      if (key) {
        if (this.state.dragoverUp) {
          this.props.ryuOnMovePluginBefore(key)
        } else if (this.state.dragoverDown) {
          this.props.ryuOnMovePluginAfter(key)
        }
        //this.props.ryuOnMovePlugin(key);
      }
    }

    this.onDragEnd()
  }

  onDragEnd = () => {
    GlobalState.isMovePlugin = null
    GlobalState.currentMovedPlugin = null
    if (GlobalState.mouseTrackingDom) {
      document.body.removeChild(GlobalState.mouseTrackingDom)
      GlobalState.mouseTrackingDom = null
    }
  }
}

export default function(target: any) {
  return class extends Component {
    render() {
      return <Operations target={target} {...this.props}></Operations>
    }
  }
}
