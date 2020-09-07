import { axios } from '@/utils/request'

export function GetMonitorPointPage (parameter) {
  return axios({
    url: '/archives/diagnosis/getAllMonitorPointPage',
    method: 'get',
    params: parameter
  })
}
export function getDiagnosisRuleOptions (parameter) {
  return axios({
    url: '/archives/diagnosis/getDiagnosisRuleSelect',
    method: 'get'
  })
}
export function GetDiagnosisType (parameter) {
  return axios({
    url: '/dict/equip/diagnosisType',
    method: 'get'
  })
}
export function BandingDM (parameter) {
  return axios({
    url: '/archives/diagnosis/bandingDM',
    method: 'post',
    data: parameter
  })
}
export function UnbindDM (parameter) {
  return axios({
    url: '/archives/diagnosis/unbindDM',
    method: 'post',
    data: parameter
  })
}
export function GetDigP (parameter) {
  return axios({
    url: '/archives/diagnosis/page',
    method: 'get',
    params: parameter
  })
}
export function DelDigP (parameter) {
  return axios({
    url: '/archives/diagnosis/' + parameter,
    method: 'delete'
  })
}
export function UpdDigP (parameter) {
  return axios({
    url: '/archives/diagnosis/',
    method: 'put',
    data: parameter
  })
}
export function InsDigP (parameter) {
  return axios({
    url: '/archives/diagnosis/',
    method: 'post',
    data: parameter
  })
}
