import request from '@/utils/request'

export const getUpersonnelApi = (params) => {
  return request({
    url: '/api/user-service/user/search',
    params
  })
}
