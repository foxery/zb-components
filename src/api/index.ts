import axios from 'axios'
import qs from 'qs'

export function get(url, data?) {
  url = replacUrl(url)
  return axios.get(url, { params: data })
}

export function getBase64(url) {
  url = replacUrl(url)
  return axios.get(url, {
    responseType: 'arraybuffer',
    withCredentials: true
  })
}

export function post(url, data, isFormData) {
  url = replacUrl(url)
  return axios.post(url, isFormData ? data : qs.stringify(data, { arrayFormat: 'repeat' }))
}

export function put(url, data, isRawData) {
  url = replacUrl(url)
  return axios.put(url, isRawData ? data : qs.stringify(data, { arrayFormat: 'repeat' }))
}

export function apiDelete(url, data) {
  url = replacUrl(url)
  return axios.delete(url, { data: qs.stringify(data, { arrayFormat: 'repeat' }) })
}

function replacUrl(url) {
  if (process.env.REACT_APP_ENV === 'test') {
    url = url.replace('/jf-api', 'https://zbdx.jzjtong.com/jf-api')
    url = url.replace('/zbdx-api', 'https://zbdx.jzjtong.com/zbdx-api')
    url = url.replace('/o2o-api', 'https://zbdx.jzjtong.com/o2o-api')
    url = url.replace('/koiActivity', 'https://zbdx.jzjtong.com/zbdx-api/koiActivity')
    url = url.replace('/couponActivity', 'https://zbdx.jzjtong.com/zbdx-api')
  } else if (process.env.NODE_ENV === 'production') {
    url = url.replace('/jf-api', 'https://jf-api.zbszkj.com')
    url = url.replace('/zbdx-api', 'https://zbdx-api.zbszkj.com')
    url = url.replace('/o2o-api', 'https://o2o-api.zbszkj.com')
    url = url.replace('/koiActivity', 'https://zbdx-api.zbszkj.com/koiActivity')
    url = url.replace('/couponActivity', 'https://zbdx-api.zbszkj.com')
  }
  return url
}
