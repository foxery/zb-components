import React, { PureComponent, Fragment } from 'react'
import { Modal } from 'antd'
import 'antd/es/modal/style/css'

const ImagePreview = (TargetComponnet: any) => {
  return class extends PureComponent {
    state = {
      visible: false,
      url: ''
    }

    componentDidMount() {}

    showModal = (url: string) => {
      this.setState({ visible: true, url })
    }

    closeModal = () => {
      this.setState({ visible: false })
    }

    render() {
      const { visible, url } = this.state
      return (
        <Fragment>
          <TargetComponnet previewVisible={visible} showPreview={this.showModal} {...this.props} />
          <Modal visible={visible} onCancel={this.closeModal} footer={null}>
            <img src={url} alt={'图片查看'} style={{ width: '100%' }} />
          </Modal>
        </Fragment>
      )
    }
  }
}
export default ImagePreview
