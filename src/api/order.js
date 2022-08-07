import request from "@/utils/request";

/**
 * 订单搜索
 * @returns promise
 */
export const orderSearchApi = (params) =>
  request({
    url:'/api/order-service/order/search',
    params
  });
