import { axios } from '@/utils/request'

// const MonitorPointApi = {
//     getMonitorPoint: '/archives/getMonitorPoint',
//     insertPoint: '/archives/insertPoint',
//     updatePoint: '/archives/updatePoint',
//     deleteMonitorPoint: '/archives/deletePoint'
// }

export function GetAddress (parameter) {
  return axios({
    url: '/archives/monitor/getAddress',
    method: 'get',
    params: parameter
  })
}
export function GetBuildingOption (parameter) {
  return axios({
    url: '/archives/monitor/getBuildSelect',
    method: 'get',
    params: parameter
  })
}
export function GetRoom (parameter) {
  return axios({
    url: '/archives/monitor/getRoom',
    method: 'get',
    params: parameter
  })
}
export function GetFloor (parameter) {
  return axios({
    url: '/archives/monitor/getFloor',
    method: 'get',
    params: parameter
  })
}
export function GetBuilding (parameter) {
  return axios({
    url: '/archives/monitor/getBuild',
    method: 'get',
    params: parameter
  })
}
export function GetCollRule () {
  return axios({
    url: '/archives/collectionRule/allSelect',
    method: 'get'
  })
}
export function Release (parameter) {
  return axios({
    url: '/archives/monitor/release',
    method: 'get',
    params: parameter
  })
}
export function GetPEquipNotM (parameter) {
  return axios({
    url: '/archives/equip/getPEquipNotM',
    method: 'get',
    params: parameter
  })
}
export function GetMonitorUnbind (parameter) {
  return axios({
    url: '/archives/monitor/pageUnbind',
    method: 'get',
    params: parameter
  })
}
export function GetMonitorBinding (parameter) {
  return axios({
    url: '/archives/monitor/pageBinding',
    method: 'get',
    params: parameter
  })
}
export function GetMonitorPointPage (parameter) {
  return axios({
    url: '/archives/monitor/page',
    method: 'get',
    params: parameter
  })
}
export function AddMonitorPoint (parameter) {
  return axios({
    url: '/archives/monitor/add',
    method: 'post',
    data: parameter
  })
}
export function DeleteMonitorPoint (parameter) {
  return axios({
    url: '/archives/monitor/' + parameter,
    method: 'delete'
  })
}
export function UpdateMonitorPoint (parameter) {
  return axios({
    url: '/archives/monitor/',
    method: 'put',
    data: parameter
  })
}
export function GetEnergyDeviceTypeCol () {
  return axios({
    url: '/dict/equip/eDeviceType',
    method: 'get'
  })
}
// export function GetMonitorPoint (parameter) {
//   return axios({
//     url: MonitorPointApi.getMonitorPoint,
//     method: 'post',
//     data: parameter
//   })
// }
// export function InsertPoint (parameter) {
//   return axios({
//     url: MonitorPointApi.insertPoint,
//     method: 'post',
//     data: parameter
//   })
// }
// export function UpdatePoint (parameter) {
//   return axios({
//     url: MonitorPointApi.updatePoint,
//     method: 'post',
//     data: parameter
//   })
// }
// export function DeleteMonitorPointApi (parameter) {
//   return axios({
//     url: MonitorPointApi.deleteMonitorPoint,
//     method: 'post',
//     data: parameter
//   })
// }
