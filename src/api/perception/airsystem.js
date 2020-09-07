import { axios } from '@/utils/request'

const AirsystemApi = {
    Getairsystemdata: '/airconditionsystem/airdata', // 空调负荷折线图
    Getairsystempie: '/airconditionsystem/airpie', // 空调数量饼图
    Getairsystem: '/airconditionsystem/air', // 获取全部信息
    Getairsystemtable: '/airconditionsystem/airtable', // 表格，每层具体情况
    Deletetable: '/airconditionsystem/deletetable'// 删除表格
}
export function Deletetable (parameter) {
  return axios({
    url: Deletetable,
    method: 'get',
    data: parameter
  })
}
export function Getairsystemdata (airdata, airmonitor) {
    return axios({
      url: AirsystemApi.Getairsystemdata,
      method: 'get',
      params: {
        airdata: airdata,
        airmonitor: airmonitor
      }
    })
  }
export function Getairsystempie (parameter) {
  return axios({
    url: AirsystemApi.Getairsystempie,
    method: 'get',
    data: parameter
  })
}
export function Getairsystem (type) {
  return axios({
    url: AirsystemApi.Getairsystem,
    method: 'get',
    params: {
    type: type
  }
  })
}
export function Getairsystemtable (bulidingno, floor, status, equipStatus) {
  return axios({
    url: AirsystemApi.Getairsystemtable,
    method: 'get',
    params: {
      bulidingno: bulidingno,
      floor: floor,
      status: status,
      equipstatus: equipStatus
    }
  })
}
