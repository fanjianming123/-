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

/**
 * 获取一定时间范围之内的收入
 * @param {String} start 2020-01-01 00:00:00	开始日期时间
 * @param {String} end 2020-01-01 00:00:00	结束日期时间
 * @param {String} innerCode 售货机编号
 * @returns promise
 */
export const getorderAmountAPI = (start, end, innerCode) =>
  request({
    method: 'GET',
    url: `/api/order-service/report/orderAmount?start=${start}&end=${end}&innerCode=${innerCode}`
  })

/**
 * 获取一定时间范围之内的订单总数
 * @param {String} start 2020-01-01 00:00:00	开始日期时间
 * @param {String} end 2020-01-01 00:00:00	结束日期时间
 * @param {String} innerCode 售货机编号
 * @returns promise
 */
export const getorderCountAPI = (start, end, innerCode) =>
  request({
    method: 'GET',
    url: `/api/order-service/report/orderCount?start=${start}&end=${end}&innerCode=${innerCode}`
  })

/**
 *获取售货机维修次数
 * @param {String} innerCode 设备编号
 * @param {String} start 开始日期
 * @param {String} end 结束日期
 * @param {Object} data
 * vmType	integer		售货机类型Id
 * nodeId	string			所属点位Id
 * createUserId	integer			创建人Id
 * @returns promise
 */
export const getrepairCountAPI = (innerCode, start, end, paramas) =>
  request({
    method: 'GET',
    url:
      '/api/task-service/task/repairCount/' +
      innerCode +
      '/' +
      start +
      '/' +
      end,
    paramas
  })

/**
 *获取售货机补货次数
 * @param {String} innerCode 设备编号
 * @param {String} start 开始日期
 * @param {String} end 结束日期
 * @param {Object} paramas
 * vmType	integer		售货机类型Id
 * nodeId	string			所属点位Id
 * createUserId	integer			创建人Id
 * @returns promise
 */
export const getsupplyCountAPI = (innerCode, start, end, paramas) =>
  request({
    method: 'GET',
    url:
      '/api/task-service/task/supplyCount/' +
      innerCode +
      '/' +
      start +
      '/' +
      end,
    paramas
  })

/**
 *获取售货机商品销量
 * @param {String} innerCode 设备编号
 * @param {String} start 开始日期
 * @param {String} end 结束日期
 * @param {Object} paramas
 * vmType	integer		售货机类型Id
 * nodeId	string			所属点位Id
 * createUserId	integer			创建人Id
 * @returns promise
 */
export const getskuCollectAPI = (innerCode, start, end, paramas) =>
  request({
    method: 'GET',
    url:
      '/api/order-service/report/skuCollect/' +
      innerCode +
      '/' +
      start +
      '/' +
      end,
    paramas
  })

/**
 *
 * @param {Object} data
 * vmRow	number	非必须
 * vmCol	number	非必须
 * name	string	非必须
 * channelMaxCapacity	number	非必须
 * model	string	非必须
 * image	string	非必须
 * @returns promise
 */
export const addVmType = (data) =>
  request({
    method: 'post',
    url: '/api/vm-service/vmType',
    data
  })

/**
 *售货机类型修改
 * @param {String} id 类型Id
 * @param {Object} data
 * vmRow	number	非必须
 * vmCol	number	非必须
 * name	string	非必须
 * channelMaxCapacity	number	非必须
 * model	string	非必须
 * image	string	非必须
 * @returns promise
 */
export const editVmType = (id, data) =>
  request({
    method: 'PUT',
    url: '/api/vm-service/vmType/' + id,
    data
  })

/**
 * 图片上传
 * @param {Object} data 图片文件
 * @returns promise
 */
export const UploadImageAPI = (data) =>
  request({
    method: 'post',
    url: '/api/vm-service/sku/fileUpload',
    data
  })
