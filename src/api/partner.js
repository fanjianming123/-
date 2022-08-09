import request from '@/utils/request'

/**
 * 搜索合作商
 * @param {*} params
 * @returns
 */
export function getPartnerSearchApi(params) {
  return request({
    url: '/api/user-service/partner/search',
    params
  })
}

/**
 *添加合作商
 * @param {*} body
 * @returns
 */
export function addPartnerListApi(body) {
  return request({
    url: '/api/user-service/partner',
    method: 'POST',
    body
  })
}
