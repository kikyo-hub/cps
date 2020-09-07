import { axios } from '@/utils/request'

const EnergyAnalysisApi = {
  getTodaydata: '/Energyanalysis/todaydata',
  getmonitorRank: '/Energyanalysis/monitorRank',
  getmonitorweekData: '/Energyanalysis/monitorweekData',
  getmonitorweekDc: '/Energyanalysis/monitorweekDc',
  getdiagnosisdayData: '/Energyanalysis/diagnosisdayData',
  getdiagnosisdayRank: '/Energyanalysis/diagnosisdayRank',
  getdiagnosisweekData: '/Energyanalysis/diagnosisweekData'
  }
  export function getTodaydata (todaydata, Yesterdaydata, Beforedaydata) {
    return axios({
      url: EnergyAnalysisApi.getTodaydata,
      method: 'get',
      params: {
        todaydata: todaydata,
        Yesterdaydata: Yesterdaydata,
        Beforedaydata: Beforedaydata
     }
    })
  }
  export function getmonitorRank (today, yesterday) {
    return axios({
      url: EnergyAnalysisApi.getmonitorRank,
      method: 'get',
      params: {
        today: today,
        Yesterday: yesterday
     }
    })
  }
  export function getmonitorweekData (begindate, enddate) {
    return axios({
      url: EnergyAnalysisApi.getmonitorweekData,
      method: 'get',
      params: {
        begindate: begindate,
        enddate: enddate
     }
    })
  }
  export function getmonitorweekDc (monday, sunday) {
    return axios({
      url: EnergyAnalysisApi.getmonitorweekDc,
      method: 'get',
      params: {
        monday: monday,
        sunday: sunday
     }
    })
  }
  export function getdiagnosisweekData (monday, sunday) {
    return axios({
      url: EnergyAnalysisApi.getdiagnosisweekData,
      method: 'get',
      params: {
        monday: monday,
        sunday: sunday
     }
    })
  }
  export function getdiagnosisdayData (today, yesterday) {
    return axios({
      url: EnergyAnalysisApi.getdiagnosisdayData,
      method: 'get',
      params: {
        today: today,
        yesterday: yesterday
     }
    })
  }
  export function getdiagnosisdayRank (today, yesterday) {
    return axios({
      url: EnergyAnalysisApi.getdiagnosisdayRank,
      method: 'get',
      params: {
        today: today,
        yesterday: yesterday
     }
    })
  }
