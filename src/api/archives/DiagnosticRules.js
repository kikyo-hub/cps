import { axios } from '@/utils/request'

const DiagnosticRulesApi = {
    getDRules: '/archives/getDRules',
    addDRules: '/archives/diagnosisRule/insert',
    delDRules: '/archives/diagnosisRule/delete',
    updateDRules: '/archives/diagnosisRule/updatebyID',
    getiagnosisRuleType: '/dict/equip/diagnosisRuleType'
  }

export function GetDRules (parameter) {
  return axios({
    url: '/archives/diagnosisRule/page',
    method: 'get',
    params: parameter
  })
}
export function AddDRules (parameter) {
  return axios({
    url: DiagnosticRulesApi.addDRules,
    method: 'post',
    data: parameter
  })
}
export function DelDRules (parameter) {
  return axios({
    url: '/archives/diagnosisRule/delete/' + parameter,
    method: 'delete'
  })
}
export function UpdateDRules (parameter) {
  return axios({
    url: DiagnosticRulesApi.updateDRules,
    method: 'put',
    data: parameter
  })
}

export function getiagnosisRuleType () {
  return axios({
    url: DiagnosticRulesApi.getiagnosisRuleType,
    method: 'get'
  })
}
