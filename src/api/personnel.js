import request from '@/utils/request'

/**
 * 搜索合作商
 * @param {*} params 
 * @returns 
 */
export const getUpersonnelApi = (params) => {
  return request({
    url: '/api/user-service/user/search',
    params
  })
}
