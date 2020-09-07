import { axios } from '@/utils/request'

const DiagnosisApi = {
    getOrgTree: '/diagnosis/data/getCDiagnosises',
    // getOrgTree: '/monitor/data/date/getMonitors',
    getLineData: '/diagnosis/data/getEDiagnosisCurveById',
    getColumnData: '/diagnosis/data/getEDiagnosisDayReadOfWeekById',
    getTableData1: '/data/tableData1'
  }

  export function getOrgTree (param) {
    return axios({
      url: DiagnosisApi.getOrgTree,
      method: 'get',
      params: {
        diagnosis_id: param
     }
    })
  }

  export function getLineData (param1, param2) {
    return axios({
      url: DiagnosisApi.getLineData,
      method: 'get',
      params: {
        diagnosis_id: param1 + '',
        data_day: param2 + ''
     }
    })
  }

  export function getColumnData (param1, param2) {
    return axios({
      url: DiagnosisApi.getColumnData,
      method: 'get',
      params: {
        diagnosis_id: param1 + '',
        data_day: param2 + ''
     }
    })
  }

  export function getTableData1 (parameter) {
    return axios({
      url: DiagnosisApi.getTableData1,
      method: 'get',
      data: parameter
    })
  }
