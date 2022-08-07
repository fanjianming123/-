import request from '@/utils/request'
/**
 * 商品类型搜索
 * @returns promise
 */
export const getGoodsList = (params) =>
  request({
    url: '/api/vm-service/skuClass/search',
    params
  })
