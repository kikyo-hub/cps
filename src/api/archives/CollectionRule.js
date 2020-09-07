import { axios } from '@/utils/request'

const DiagnosticRulesApi = {
    addRules: '/archives/collectionRule/instert',
    delDRules: '/archives/collectionRule/delete/',
    updateRules: '/archives/collectionRule/updatebyID',
    getcollectionRuleNo: '/archives/collectionRule/getcollectionRuleNo'
  }

export function GetDRules (parameter) {
  return axios({
    url: '/archives/collectionRule/page',
    method: 'get',
    params: parameter
  })
}
export function AddRules (parameter) {
  return axios({
    url: DiagnosticRulesApi.addRules,
    method: 'post',
    data: parameter
  })
}
export function DelDRules (parameter) {
  return axios({
    url: DiagnosticRulesApi.delDRules + parameter,
    method: 'delete'
  })
}
export function UpdateRules (parameter) {
  return axios({
    url: DiagnosticRulesApi.updateRules,
    method: 'put',
    data: parameter
  })
}

export function Getdataid () {
  return axios({
    url: '/dataid/getall',
    method: 'get'
  })
}

export function getcollectionRuleNo () {
  return axios({
    url: DiagnosticRulesApi.getcollectionRuleNo,
    method: 'get'
  })
}
