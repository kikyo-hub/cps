import { axios } from '@/utils/request'

const DiagnosisReportApi = {
  GetMonitorNum: '/exception/getmonitornum'
  }

  export function GetMonitorNum () {
    return axios({
      url: DiagnosisReportApi.GetMonitorNum,
      method: 'get'
    })
  }
