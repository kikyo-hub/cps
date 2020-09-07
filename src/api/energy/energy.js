import { axios } from '@/utils/request'

const EnergyApi = {
    GetMeterDayData: '/dashboard/energymonitoring',
    GetMeterWeekData: '/dashboard/energy',
    GetMeterSeasonData: '/dashboard/ener',
    GetMeterYearData: '/dashboard/ene',
    GetWaterData: '/dashboard/aner',
    GetAirLineData: '/dashboard/i',
    GetAirPieData: '/dashboard/j',
    GetLightLineData: '/dashboard/en',
    GetLightDountData: '/dashboard/e',
    GetLightBarData: '/dashboard/f',
    GetWaterHeaterData: '/dashboard/k',
    GetWaterHeaterPieData1: '/dashboard/l',
    GetWaterHeaterPieData2: '/dashboard/m',
    GetACWaterLineData: '/dashboard/n',
    GetACWaterPieData: '/dashboard/o',

    test: ''
  }

  export function GetMeterDayData (parameter) {
    return axios({
      url: EnergyApi.GetMeterDayData,
      method: 'post',
      // params: {
      //   id: parameter
      // }
      data: {
        id: parameter
       }
    })
  }

  export function GetMeterWeekData () {
    return axios({
      url: EnergyApi.GetMeterWeekData,
      method: 'get'
    })
  }

  export function GetMeterSeasonData () {
    return axios({
      url: EnergyApi.GetMeterSeasonData,
      method: 'get'
    })
  }

  export function GetMeterYearData () {
    return axios({
      url: EnergyApi.GetMeterYearData,
      method: 'get'
    })
  }

  export function GetWaterData () {
    return axios({
      url: EnergyApi.GetWaterData,
      method: 'get'
    })
  }

  export function GetAirLineData () {
    return axios({
      url: EnergyApi.GetAirLineData,
      method: 'get'
    })
  }

  export function GetAirPieData () {
    return axios({
      url: EnergyApi.GetAirPieData,
      method: 'get'
    })
  }

  export function GetLightLineData (parameter) {
    return axios({
      url: EnergyApi.GetLightLineData,
      method: 'get',
      data: parameter
    })
  }

  export function GetLightDountData () {
    return axios({
      url: EnergyApi.GetLightDountData,
      method: 'get'
    })
  }

  export function GetLightBarData () {
    return axios({
      url: EnergyApi.GetLightBarData,
      method: 'get'
    })
  }

  export function GetWaterHeaterData () {
    return axios({
      url: EnergyApi.GetWaterHeaterData,
      method: 'get'
    })
  }

  export function GetWaterHeaterPieData1 () {
    return axios({
      url: EnergyApi.GetWaterHeaterPieData1,
      method: 'get'
    })
  }

  export function GetWaterHeaterPieData2 () {
    return axios({
      url: EnergyApi.GetWaterHeaterPieData2,
      method: 'get'
    })
  }

  export function GetACWaterLineData (parameter) {
    return axios({
      url: EnergyApi.GetACWaterLineData,
      method: 'get',
      data: parameter
    })
  }

  export function GetACWaterPieData () {
    return axios({
      url: EnergyApi.GetACWaterPieData,
      method: 'get'
    })
  }
