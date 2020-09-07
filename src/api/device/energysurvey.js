import { axios } from '@/utils/request'

const EnergySurveyApi = {
    GetColheads: '/device/energy',
    GetTabledata: '/device/energySurvey',
    GetTabledata1: '/device/energysurv',
    GetTabledata2: '/device/energysur',
    GetTabledata3: '/device/energysu',
    GetTabledata4: '/device/energys',
    DeleteEng: '/device/deleteenergySurvey'
  }

  export function GetColheads () {
    return axios({
      url: EnergySurveyApi.GetColheads,
      method: 'get'
    //   data: parameter
    })
  }

  export function GetTabledata (type) {
    return axios({
      url: EnergySurveyApi.GetTabledata,
      method: 'get',
      params: {
        type: type
      }
    //   data: parameter
    })
  }

  export function GetTabledata1 () {
    return axios({
      url: EnergySurveyApi.GetTabledata1,
      method: 'get'
    //   data: parameter
    })
  }

  export function GetTabledata2 () {
    return axios({
      url: EnergySurveyApi.GetTabledata2,
      method: 'get'
    //   data: parameter
    })
  }

  export function GetTabledata3 () {
    return axios({
      url: EnergySurveyApi.GetTabledata3,
      method: 'get'
    //   data: parameter
    })
  }

  export function GetTabledata4 () {
    return axios({
      url: EnergySurveyApi.GetTabledata4,
      method: 'get'
    //   data: parameter
    })
  }

  export function DeleteEng (monotorId) {
    return axios({
      url: EnergySurveyApi.DeleteEng,
      method: 'delete',
      params: {
        monotorId: monotorId
    }
    })
  }
