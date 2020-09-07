import { axios } from '@/utils/request'

const DiagnosisApi = {
    getOrgTree: '/device/BuildingSurvey',
    getLineData: '/device/BuildingSurv',
    getColumnData: '/device/BuildingSu'
  }

  export function getOrgTree (parameter) {
    return axios({
      url: DiagnosisApi.getOrgTree,
      method: 'get',
      data: parameter
    })
  }

  export function getLineData (parameter) {
    return axios({
      url: DiagnosisApi.getLineData,
      method: 'get',
      data: parameter
    })
  }

  export function getColumnData (parameter) {
    return axios({
      url: DiagnosisApi.getColumnData,
      method: 'get',
      data: parameter
    })
  }
