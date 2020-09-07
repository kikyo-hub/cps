import { axios } from '@/utils/request'

const DeviceMonitorApi = {
    GetLightLineData: '/devicemonitor/a',
    GetAirPieData: '/devicemonitor/b'
  }

  export function GetLightLineData () {
    return axios({
      url: DeviceMonitorApi.GetLightLineData,
      method: 'get'
    //   data: parameter
    })
  }

  export function GetAirPieData () {
    return axios({
      url: DeviceMonitorApi.GetAirPieData,
      method: 'get'
    //   data: parameter
    })
  }
