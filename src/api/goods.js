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

/**
 * 新增商品类型
 * @param {String} data className
 * @returns promise
 */
export const addGoodsType = (data) =>
  request({
    url: '/api/vm-service/skuClass',
    method: 'POST',
    data
  })

/**
 *  删除商品类型
 * @param {Number} classId  商品类型id
 * @returns promise
 */
export const delGoodsType = (classId) =>
  request({
    url: '/api/vm-service/skuClass/' + classId,
    method: 'DELETE'
  })

/**
 * 修改商品类型
 * @param {Number} classId 需要修改的商量类型id
 * @returns promise
 */
export const editGoodsType = (classId) =>
  request({
    url: '/api/vm-service/skuClass/' + classId,
    method: 'PUT'
  })
