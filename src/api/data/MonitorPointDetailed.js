import { axios } from '@/utils/request'

export function GetMonitorCurveEnergy (parameter) {
  return axios({
    url: '/monitor/MonitorPointDetailed/getMonitorCurveEnergy',
    method: 'get',
    params: parameter
  })
}

export function GetMonitorCurveEnvironment (parameter) {
  return axios({
    url: '/monitor/MonitorPointDetailed/getMonitorCurveEnvironment',
    method: 'get',
    params: parameter
  })
}
export function GetMonitorTree (parameter) {
    return axios({
        url: '/monitor/MonitorPointDetailed/getMonitorTree',
        method: 'get',
        params: parameter
    })
}
export function GetMonitorDayEnergy (parameter) {
    return axios({
        url: '/monitor/MonitorPointDetailed/getMonitorDayEnergy',
        method: 'get',
        params: parameter
    })
}
