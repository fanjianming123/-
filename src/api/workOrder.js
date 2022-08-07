import request from "@/utils/request";
/**
 *  获取工单搜索列表
 * @returns promise
 */
export const getWorkOrderList = () =>
  request({
    url: "/api/task-service/task/search",
  });
