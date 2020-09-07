import { axios } from '@/utils/request'

const HumidityApi = {
    // getOrgTree: '/humidity/orgtree',
    getOrgTree: '/monitor/data/getMonitors',
    getOrgTreeOfEletric: '/monitor/data/getCMonitorsOfElectric',
    // getLineData: '/humidity/lineData',
    getLineData: '/monitor/data/getMonitorCurveById',
    getPaprBy2H: '/monitor/data/getPaprBy2H',
    getPaprBy2HDay: '/monitor/data/getPaprBy2HDay',
    getPaprByDay: '/monitor/data/getPaprByDay',
    getAllPaprBy2H: '/monitor/data/getAllPaprBy2H',
    getAllPapr: '/monitor/data/getAllPapr',
    getColumnData: '/monitor/data/getEMonitorDayReadOfWeekById',
    getColumns: '/humidity/columns',
    gettableData: '/monitor/data/getCEquipByMonitorId',
    getTableData1: '/humidity/tableD'
  }

  export function getOrgTree (parameter) {
    return axios({
      url: HumidityApi.getOrgTree,
      method: 'get',
      params: {
        monitor_id: parameter
     }
    })
  }

  export function getOrgTreeOfEletric (parameter) {
    return axios({
      url: HumidityApi.getOrgTreeOfEletric,
      method: 'get',
      params: {
        monitor_id: parameter
     }
    })
  }

  export function getLineData (param1, param2) {
    return axios({
      url: HumidityApi.getLineData,
      method: 'get',
      params: {
        DEV_ADDRESS: param1 + '',
        data_day: param2 + ''
     }
    })
  }

  export function getPaprBy2H (param1, param2) {
    return axios({
      url: HumidityApi.getPaprBy2H,
      method: 'get',
      params: {
        DEV_ADDRESS: param1 + '',
        data_day: param2 + ''
     }
    })
  }

  export function getPaprBy2HDay (param1, param2, param3, param4) {
    return axios({
      url: HumidityApi.getPaprBy2HDay,
      method: 'get',
      params: {
        DEV_ADDRESS: param1 + '',
        start_data_day: param2 + '',
        end_data_day: param3 + '',
        level: param4 + ''
     }
    })
  }

  export function getPaprByDay (param1, param2, param3) {
    return axios({
      url: HumidityApi.getPaprByDay,
      method: 'get',
      params: {
        DEV_ADDRESS: param1 + '',
        start_data_day: param2 + '',
        end_data_day: param3 + ''
     }
    })
  }

  export function getAllPaprBy2H (param1, param2, param3) {
    return axios({
      url: HumidityApi.getAllPaprBy2H,
      method: 'get',
      params: {
        start_data_day: param1 + '',
        end_data_day: param2 + '',
        level: param3 + ''
     }
    })
  }

  export function getAllPapr (param1, param2) {
    return axios({
      url: HumidityApi.getAllPapr,
      method: 'get',
      params: {
        start_data_day: param1 + '',
        end_data_day: param2 + ''
     }
    })
  }

  export function getColumnData1 (param1, param2) {
    // debugger
    return axios({
      url: HumidityApi.getColumnData,
      method: 'get',
      params: {
        monitor_id: param1 + '',
        data_day: param2 + ''
     }
    })
  }

  export function getColumns (parameter) {
    return axios({
      url: HumidityApi.getColumns,
      method: 'get',
      data: parameter
    })
  }

  export function gettableData (parameter) {
    return axios({
      url: HumidityApi.gettableData,
      method: 'get',
      params: {
        monitor_id: parameter
     }
    })
  }

  export function getTableData1 (parameter) {
    return axios({
      url: HumidityApi.getTableData1,
      method: 'get',
      data: parameter
    })
  }
