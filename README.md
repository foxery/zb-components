# zb-components

## TextPopconfirm

使用了 antd 的 Popconfirm，点击文字出现确认框

```js
import { TextPopconfirm } from 'zb-components'
;<TextPopconfirm onConfirm={this.onConfirm} title='确定删除吗？' text='删除' placement='top' />
```

## image-preview

v1.1.10

图片预览高阶组件

```js
import { ImagePreview } from 'zb-components'

@ImagePreview
class a extends Component {
  render() {
    return <img src={src} onClick={() => this.props.showModal(src)} />
  }
}
```

## upload

v1.1.12

上传图片组件, 受控组件，接收
value: 图片列表
onChange: 事件
limit: 限制图片上传大小 默认 3 （MB）
maximum： 图片数量限制 默认 5
env: 'test' | 'production' 环境 默认 production
style

```js
import { UploadImage } from 'zb-components'

class a extends Component {
  render() {
    return <UploadImage value={[]} limit={2} maximum={5} env='test' />
  }
}
```

## 装修组件

```js
import { H5Fitment } from 'zb-components'
import { debounceAt } from 'zb-fjs' // 防抖

class a extends Component {
  toolbarConfig = () => {
    return [
      {
        type: 'default',
        key: 0,
        children: '提交',
        onClick: debounceAt(
          1000,
          true
        )(value => {
          if (!value.title) {
            message.error('请设置封面，输入页面标题！')
            return
          }
          let content = JSON.stringify(value)
        })
      }
    ]
  }
  render() {
    return (
      <div style={{ width: '100%', height: '699px' }}>
        <H5Fitment toolbarConfig={this.toolbarConfig()} title={title} dataSource={JSON.parse(content || '[]')} />
      </div>
    )
  }
}
```
