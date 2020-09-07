import { axios } from '@/utils/request'

const ComprehensiveApi = {
    getAllPaprBy2H: '/monitor/data/getAllPaprBy2H',
    getAllPapr: '/monitor/data/getAllPapr'
  }

  export function getAllPaprBy2H (param1, param2, param3) {
    return axios({
      url: ComprehensiveApi.getAllPaprBy2H,
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
      url: ComprehensiveApi.getAllPapr,
      method: 'get',
      params: {
        start_data_day: param1 + '',
        end_data_day: param2 + ''
     }
    })
  }
