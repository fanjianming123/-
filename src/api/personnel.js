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
/**
 *
 *  获取工作量列表
 * @returns  promise
 */
export const GetWorkloadApi = (params) => {
  return request({
    url: '/api/user-service/user/searchUserWork',
    params
  })
}
/**
 *  获取用户基本信息
 * @param {Number} id  用户id
 * @returns  promise
 */
export const getuserMessageApi = (id) => {
  return request({
    url: '/api/user-service/user/' + id
  })
}
/**
 * 获取用户工作量(工单统计)
 * @param {Object} params 开始时间 结束时间
 * @returns  promise
 */
export const WorkOrderStatisticsApi = (params) => {
  return request({
    url: '/api/task-service/task/userWork',
    params
  })
}
