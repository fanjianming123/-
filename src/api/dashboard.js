// 首页模块相关接口
import request from '@/utils/request'
/**
 * 获取 销售统计订单量
 * @param {String} start  开始时间
 * @param {String} end  结束时间
 * @returns  promise
 */
export const SalesStatisticsOrderApi = (start, end) => {
  return request({
    url: `/api/order-service/report/orderCount`,
    params: {
      start: start,
      end: end
    }
  })
}
/**
 * 获取销售额
 * @param {string} start  开始时间
 * @param {string} end  结束时间
 * @returns  promise
 */
export const TotalAmountOfMoneyApi = (start, end) => {
  return request({
    url: `/api/order-service/report/orderAmount`,
    params: {
      start: start,
      end: end
    }
  })
}
/**
 * 获取排行前几的商品
 * @param {String} topValue  前几的商品
 * @param {String} start  开始日期
 * @param {String} end  结束日期
 * @returns
 */
export const GetTopSalesApi = (topValue, start, end) => {
  return request({
    url: `/api/order-service/report/skuTop/${topValue}/${start}/${end}`
  })
}
/**
 *  获取合作商点位总数
 * @returns promise
 */
export const TotalnumberofpointsApi = () => {
  return request({
    url: '/api/vm-service/node/count'
  })
}
/**
 *  获取合作商总数
 * @returns promise
 */
export const TotalPartnersApi = () => {
  return request({
    url: '/api/user-service/partner/count'
  })
}
/**
 *  获取10个故障列表
 * @returns promise
 */
export const FaultListApi = () => {
  return request({
    url: '/api/status-service/status/top10'
  })
}

/**
 * 获取销售额统计图表
 * @param {Number} collectType  统计时间类型 1 按日 2 按月
 * @param {string} start  开始日期
 * @param {string} end  结束日期
 * @returns  promise
 */
export const SalesStatisticsApi = (collectType, start, end) => {
  return request({
    url: `/api/order-service/report/amountCollect/${collectType}/${start}/${end}`
  })
}
/**
 * 根据地区汇总销售额数据(销售量分布)
 * @param {string} start  开始日期
 * @param {string} end 结束日期
 * @returns
 */
export const SalesDistributionApi = (start, end) => {
  return request({
    url: `/api/order-service/report/regionCollect/${start}/${end}`
  })
}
/**
 * 合作商点位汇总统计
 * @returns promise
 */
export const PartnerLocationApi = () => {
  return request({
    url: '/api/vm-service/node/nodeCollect'
  })
}
