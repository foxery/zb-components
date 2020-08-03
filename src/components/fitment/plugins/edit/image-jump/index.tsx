import React, { Component } from 'react'
import { Radio, Select, Input, DatePicker } from 'antd'
import moment from 'moment'
import Upload from '../../../../upload/upload'
import { EditLayout } from '../../../ui/index'
import 'antd/es/radio/style/css'
import 'antd/es/select/style/css'
import 'antd/es/date-picker/style/css'
import './index.css'

const { Option } = Select
const { RangePicker } = DatePicker

interface Iprops {
  ryu: (props: any) => void
  arrType: number // 列数  1、2、3
  urlList: any[]
}

export default class EditBlankPlugin extends Component<Iprops> {
  state = {
    fileList: []
  }
  onArrChange = (e: any) => {
    const props = Object.assign({}, this.props, { arrType: e.target.value })
    this.props.ryu(props)
  }

  onChangeImg = (fileList: any) => {
    let urlList = this.props.urlList ? [...this.props.urlList] : []
    this.setState({ fileList })
    if (fileList[0].status === 'done') {
      urlList.push({ url: fileList[0].urlName })
      const props = Object.assign({}, this.props, { urlList })
      this.props.ryu(props)
      this.setState({ fileList: [] })
    }
  }

  onChangeSelect = (index: number, value: string) => {
    let urlList = [...this.props.urlList]
    urlList[index].type = value
    const props = Object.assign({}, this.props, { urlList })
    this.props.ryu(props)
  }

  onChangeInput = (index: number, value: string) => {
    let urlList = [...this.props.urlList]
    urlList[index].link = value
    const props = Object.assign({}, this.props, { urlList })
    this.props.ryu(props)
  }

  onChangeDate = (index: number, value: string) => {
    let urlList = [...this.props.urlList]
    urlList[index].date = value
    const props = Object.assign({}, this.props, { urlList })
    this.props.ryu(props)
  }

  onDelete = (index: number) => {
    let urlList = this.props.urlList ? [...this.props.urlList] : []
    urlList.splice(index, 1)
    const props = Object.assign({}, this.props, { urlList })
    this.props.ryu(props)
  }

  render() {
    const { arrType = 1, urlList = [] } = this.props
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
          {urlList.map((item, index) => {
            return (
              <div className='image-edit-item' key={'image-edit-item' + index}>
                <img src={item.url} />
                <div>
                  <div className='zc-item-item' style={{ marginBottom: 10 }}>
                    <span>类型</span>
                    <Select
                      style={{ width: 200 }}
                      value={item.type}
                      onChange={(v: any) => this.onChangeSelect(index, v)}
                      placeholder='请选择类型'
                    >
                      <Option value={1}>优惠券</Option>
                      <Option value={2}>h5</Option>
                      <Option value={3}>小程序</Option>
                    </Select>
                  </div>
                  <div className='zc-item-item' style={{ marginBottom: 10 }}>
                    <span>{item.type === 1 ? '优惠券id' : '跳转链接'}</span>
                    <Input
                      value={item.link}
                      style={{ width: 250 }}
                      placeholder={'请输入' + (item.type === 1 ? '优惠券id集合' : '链接')}
                      onChange={e => this.onChangeInput(index, e.target.value)}
                    />
                  </div>
                  <div className='zc-item-item'>
                    <span>活动时间</span>
                    <RangePicker
                      style={{ width: 375 }}
                      showTime={{ format: 'HH:mm:ss' }}
                      format='YYYY-MM-DD HH:mm:ss'
                      value={[
                        item.date
                          ? moment(item.date[0])
                          : moment(new Date(new Date(new Date().toLocaleDateString()).getTime())),
                        item.date
                          ? moment(item.date[1])
                          : moment(
                              new Date(new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1)
                            )
                      ]}
                      onChange={(v, date) => this.onChangeDate(index, date)}
                    />
                  </div>
                </div>
                <img
                  onClick={() => this.onDelete(index)}
                  src='https://static.zbszkj.com/images/common_delete_icon.png'
                  className='delete-icon'
                />
              </div>
            )
          })}
          <Upload onChange={this.onChangeImg} value={this.state.fileList} />
        </EditLayout.Item>
      </EditLayout>
    )
  }
}
