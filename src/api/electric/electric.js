import { axios } from '@/utils/request'

const ElectricApi = {
    // GetdataDayList: '/testdata/DayList',
    GetdataDayList: '/monitor/data/getTotalEMonitorCurveOf2H',
    GetdataWeekList: '/monitor/data/getEMonitorDayReadOfWeek2',
    GetdataMonthList: '/testdata/MonthList',
    GetdataList: '/testdata/List',
    GetdataDaypie: '/testdata/Daypie',
    GetdataWeekpie: '/testdata/Weekpie',
    Gettestdatapie: '/testdata/pie'
  }

  export function GetdataDayList (param1, param2) {
    return axios({
      url: ElectricApi.GetdataDayList,
      method: 'get',
      params: {
        diagnosis_id: param1 + '',
        data_day: param2 + ''
     }
    })
  }

  export function GetdataWeekList (param1, param2) {
    return axios({
      url: ElectricApi.GetdataWeekList,
      method: 'get',
      params: {
        diagnosis_id: param1 + '',
        data_day: param2 + ''
     }
    })
  }

  export function GetdataMonthList () {
    return axios({
      url: ElectricApi.GetdataMonthList,
      method: 'get'
    })
  }

  export function GetdataList () {
    return axios({
      url: ElectricApi.GetdataList,
      method: 'get'
    })
  }

  export function GetdataDaypie () {
    return axios({
      url: ElectricApi.GetdataDaypie,
      method: 'get'
    })
  }

  export function GetdataWeekpie () {
    return axios({
      url: ElectricApi.GetdataWeekpie,
      method: 'get'
    })
  }

  export function Gettestdatapie () {
    return axios({
      url: ElectricApi.Gettestdatapie,
      method: 'get'
    })
  }
