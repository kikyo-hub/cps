import { axios } from '@/utils/request'

const ElectricApi = {
    GetdataDaywater: '/standardata/DayList',
    GetdataWeekwater: '/standardata/WeekList',
    GetdataMonthwater: '/standardata/MonthList',
    Getdatawater: '/standardata/List',
    GetdataDaypei: '/standardata/Daypie',
    GetdataWeekpei: '/standardata/Weekpie',
    Gettestdatapei: '/standardata/pie'
  }

  export function GetdataDaywater () {
    return axios({
      url: ElectricApi.GetdataDaywater,
      method: 'get'
    //   data: parameter
    })
  }

  export function GetdataWeekwater () {
    return axios({
      url: ElectricApi.GetdataWeekwater,
      method: 'get'
    })
  }

  export function GetdataMonthwater () {
    return axios({
      url: ElectricApi.GetdataMonthwater,
      method: 'get'
    })
  }

  export function Getdatawater () {
    return axios({
      url: ElectricApi.Getdatawater,
      method: 'get'
    })
  }

  export function GetdataDaypei () {
    return axios({
      url: ElectricApi.GetdataDaypei,
      method: 'get'
    })
  }

  export function GetdataWeekpei () {
    return axios({
      url: ElectricApi.GetdataWeekpei,
      method: 'get'
    })
  }

  export function Gettestdatapei () {
    return axios({
      url: ElectricApi.Gettestdatapei,
      method: 'get'
    })
  }
