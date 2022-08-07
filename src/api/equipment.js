import request from '@/utils/request'

/**
 * 获取工单状态列表
 * @returns promise
 */
export const getVmSearchAPI = (params) =>
  request({
    method: 'GET',
    url: '/api/vm-service/vm/search',
    params
  })
/**
 * 获取设备搜索列表
 * @param {Object} params
 * @returns promise
 */
export const getVmTypeAPI = (params) =>
  request({
    method: 'GET',
    url: '/api/vm-service/vmType/search',
    params
  })

/**
 * 删除设备类型
 * @param {String} id 要删除的类型id
 * @returns promise
 */
export const delVmTypeAPI = (id) =>
  request({
    method: 'DELETE',
    url: '/api/vm-service/vmType/' + id
  })
