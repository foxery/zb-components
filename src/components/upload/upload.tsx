import React from 'react'
import axios from 'axios'
import { Upload, Icon, message, Modal } from 'antd'
import 'antd/es/upload/style/css'
import 'antd/es/icon/style/css'
import 'antd/es/message/style/css'
import 'antd/es/modal/style/css'
import './index.css'

const OSSAUTH_URL_TEST = 'https://zbdx.jzjtong.com/file'
const OSSAUTH_URL = 'https://file.zbszkj.com'
const UPLOAD_URL_TEST = 'https://zbszkj-dev.oss-cn-hangzhou.aliyuncs.com'
const UPLOAD_URL = 'https://zbdx.oss-cn-hangzhou.aliyuncs.com'

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

interface Props {
  limit?: number
  onChange?: (value: any[]) => void
  value?: any[]
  maximum?: number
  style?: any
  env?: 'test' | 'production'
  data?: any[]
}

type State = {
  extra: {
    OSSAccessKeyId: any
    signature: any
    key: any
    policy: any
  }
  previewVisible: boolean
  previewImage: string
}

export default class UploadImage extends React.Component<Props, State> {
  state = {
    extra: {
      OSSAccessKeyId: '',
      signature: '',
      key: '',
      policy: ''
    },
    previewVisible: false,
    previewImage: ''
  }

  beforeUpload = (file: File | any): any => {
    const {
      limit = 3,
      env = 'production',
      data = {
        dir: 'mall/image'
      }
    } = this.props
    const isLt2M = file.size / 1024 / 1024 < limit
    if (!isLt2M) {
      message.error(`图片上传不能超过${limit}MB!`)
      return
    }
    let filename = file.name
    let index = filename.lastIndexOf('.')
    let suffix = filename.substr(index + 1)
    return new Promise(resolve => {
      const postOssAuth = `${env === 'test' ? OSSAUTH_URL_TEST : OSSAUTH_URL}/v1/ossAuth`
      axios.post(postOssAuth, data).then((res: any) => {
        const { ossAccessKeyId, signature, key, filePrefix, policy } = res
        console.log(res)
        this.setState({
          extra: {
            OSSAccessKeyId: ossAccessKeyId,
            signature,
            key: `${key}/${filePrefix}.${suffix}`,
            policy
          }
        })
        file['urlName'] = `${env === 'test' ? UPLOAD_URL_TEST : UPLOAD_URL}/${key}/${filePrefix}.${suffix}`
        resolve()
      })
    })
  }

  handleChange = (data: { fileList: any }) => {
    const { onChange } = this.props
    const limitSize = 1024 * 1024 * 3
    const list = data.fileList.filter((file: any) => {
      return !file.size || file.size < limitSize
    })
    onChange && onChange(list)
  }

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj)
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    })
  }

  render() {
    const { previewVisible, previewImage, extra } = this.state
    const { maximum = 5, style, value = [], env = 'production' } = this.props
    const uploadButton = (
      <div style={{ display: 'inline-block' }}>
        <Icon type='plus' />
        <div className='ant-upload-text'>上传图片</div>
      </div>
    )

    return (
      <div className='clearfix' style={{ display: 'inline-block', ...style }}>
        <Upload
          action={env === 'test' ? UPLOAD_URL_TEST : UPLOAD_URL}
          accept='image/jpeg,image/png,image/gif'
          listType='picture-card'
          fileList={value}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          data={extra}
          headers={{ 'Access-Control-Allow-Origin': '*' }}
          beforeUpload={this.beforeUpload}
        >
          {value.length >= maximum ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt='example' style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}
