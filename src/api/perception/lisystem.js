import { axios } from '@/utils/request'

const LisystemApi = {
    Getligsystemdata: '/lightsystem/lidata',
    Getaligsystempie: '/lightsystem/lipie',
    Getaligsystemgun: '/lightsystem/ligun',
    GetTabledata1: '/lightsystem/litable',
    Getlitsystem: '/lightsystem/lit'
}
export function Getligsystemdata (lightdate, lightmonitor) {
    return axios({
      url: LisystemApi.Getligsystemdata,
      method: 'get',
      params: {
        lightdate: lightdate,
        lightmonitor: lightmonitor
      }
    })
  }
export function Getaligsystempie (parameter) {
  return axios({
    url: LisystemApi.Getaligsystempie,
    method: 'get',
    data: parameter
  })
}
export function Getaligsystemgun (parameter) {
  return axios({
    url: LisystemApi.Getaligsystemgun,
    method: 'get',
    data: parameter
  })
}
export function GetTabledata1 (bulidingno, floor, status, equipstatus) {
  return axios({
    url: LisystemApi.GetTabledata1,
    method: 'get',
    params: {
      bulidingno: bulidingno,
      floor: floor,
      status: status,
      equipstatus: equipstatus
    }
  })
}
export function Getlitsystem (type) {
  return axios({
    url: LisystemApi.Getlitsystem,
    method: 'get',
    params: {
      type: type
    }
  })
}
