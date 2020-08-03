import React, { Component } from 'react'
import { Radio } from 'antd'
import Upload from '../../../../upload/upload'
import { EditLayout } from '../../../ui/index'
import 'antd/es/radio/style/css'
import 'antd/es/select/style/css'

interface Iprops {
  ryu: (props: any) => void
  arrType: number // 列数  1、2、3
  urlList: any[]
}

interface IState {
  fileList: any[]
}

export default class EditBlankPlugin extends Component<Iprops, IState> {
  state = {
    fileList: []
  }

  componentDidMount() {
    this.setImage()
  }

  setImage = () => {
    const { urlList = [] } = this.props
    this.setState({
      fileList: urlList.map((url: string) => {
        return {
          uid: url,
          name: url,
          status: 'done',
          url: url,
          urlName: url
        }
      })
    })
  }

  onArrChange = (e: any) => {
    const props = Object.assign({}, this.props, { arrType: e.target.value })
    this.props.ryu(props)
  }

  onChangeImg = (fileList: any) => {
    this.setState({ fileList })
    if (fileList[0].status === 'done') {
      this.props.ryu({ ...this.props, urlList: fileList.map(item => item.urlName) })
    }
  }

  render() {
    const { arrType = 1 } = this.props
    const { fileList } = this.state
    return (
      <EditLayout>
        <EditLayout.Item title='排版方式'>
          <Radio.Group value={arrType} onChange={this.onArrChange}>
            <Radio.Button value={1}>单列</Radio.Button>
            <Radio.Button value={2}>双列</Radio.Button>
            <Radio.Button value={3}>三列</Radio.Button>
          </Radio.Group>
        </EditLayout.Item>
        <EditLayout.Item title='图片列表'>
          <Upload value={fileList} onChange={this.onChangeImg} env={process ? process.env.REACT_APP_ENV : 'test'} />
        </EditLayout.Item>
      </EditLayout>
    )
  }
}
