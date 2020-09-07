import { axios } from '@/utils/request'
const ItemsApi = {
    getmeter: '/Items/meters',
    getmeterTodaydata: '/Items/metertodaydata',
    getmeterTodayrank: '/Items/meterTodayrank',
    getmeterWeekdata: '/Items/meterWeekdata',
    getmaterweekRank: '/Items/materweekRank'
}
export function getmeter (type) {
    return axios({
      url: ItemsApi.getmeter,
      method: 'get',
      params: {
        type: type
     }
    })
  }
  export function getmeterTodaydata (todaydata, adress) {
    return axios({
      url: ItemsApi.getmeterTodaydata,
      method: 'get',
      params: {
        todaydata: todaydata,
        adress: adress
     }
    })
  }
  export function getmeterTodayrank (time1, adress) {
    return axios({
      url: ItemsApi.getmeterTodayrank,
      method: 'get',
      params: {
        time1: time1,
        adress: adress
     }
    })
  }
  export function getmeterWeekdata (monday, sunday, adress) {
    return axios({
      url: ItemsApi.getmeterWeekdata,
      method: 'get',
      params: {
        monday: monday,
        sunday: sunday,
        adress: adress
     }
    })
  }
  export function getmaterweekRank (monday, sunday, adress) {
    return axios({
      url: ItemsApi.getmaterweekRank,
      method: 'get',
      params: {
        monday: monday,
        sunday: sunday,
        adress: adress
     }
    })
  }
