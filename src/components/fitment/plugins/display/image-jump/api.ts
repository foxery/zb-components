import { get } from '../../../../../api'

export function getCouponDetail(couponGoodsIds: string) {
  const url = `/jf-api/coupon/list`
  if (Array.isArray(couponGoodsIds)) {
    couponGoodsIds = couponGoodsIds.join(',')
  }
  return get(url, { couponGoodsIds, size: 100 })
}

export function getType(data: any) {
  return get(`/jf-api/goods`, data)
}

export function checkUser() {
  return get(`/zbdx-api/member/isInternalUser`)
}
