import TextPopconfirm from './components/TextPopconfirm'
import ImagePreview from './components/image-preview'
import UploadImage from './components/upload/upload'
import H5Fitment from './components/fitment'
import FitmentPluginList from './components/fitment/plugins'
import axios from 'axios'

// 添加响应拦截器
axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  return then(response)
})

function then(response: any) {
  console.log(response)
  try {
    let res = response.data
    if (res.code === 1 || res.status === '1') {
      return Promise.resolve(res.data ? res.data : res)
    }
    if (response.status === 204) {
      return Promise.resolve()
    }
  } catch (e) {
    // JSON 格式解析失败
  }
}

export { TextPopconfirm, ImagePreview, UploadImage, H5Fitment, FitmentPluginList }
