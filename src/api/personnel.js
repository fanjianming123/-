import request from '@/utils/request'
/**
 * 人员搜索（列表）
 * @param {Object} params 人员信息数据 
 * @returns  promise
 */
export const getUpersonnelApi = (params) => {
  return request({
    url: '/api/user-service/user/search',
    params
  })
}
