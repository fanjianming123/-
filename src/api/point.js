import request from '@/utils/request'

/**
 * 获取区域列表
 * @param {Object} params
 * @returns
 */
export function getAreaListApi(params) {
  return request({
    url: '/api/vm-service/region/search',
    params
  })
}

/**
 * 添加区域
 * @param {*} data
 * @returns
 */
export function addAreaListApi(data) {
  return request({
    url: '/api/vm-service/region',
    method: 'POST',
    data
  })
}

/**
 * 编辑区域
 * @param {*} data
 * @returns
 */
export function getAreaDetailApi(id) {
  return request({
    url: '/api/vm-service/region/' + id
  })
}
