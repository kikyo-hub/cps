import { axios } from '@/utils/request'

const HumApi = {
    GetdataDaychart: '/humigity/Daychart',
    GetdataWeekchart: '/humigity/Weekchart',
    GetdataMonthchart: '/humigity/Monthchart'
}

export function GetdataDaychart () {
    return axios({
        url: HumApi.GetdataDaychart,
        method: 'get'
      //   data: parameter
      })
}

export function GetdataWeekchart () {
    return axios({
        url: HumApi.GetdataWeekchart,
        method: 'get'
      //   data: parameter
      })
}

export function GetdataMonthchart () {
    return axios({
        url: HumApi.GetdataMonthchart,
        method: 'get'
      //   data: parameter
      })
}
