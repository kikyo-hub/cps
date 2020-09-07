import { axios } from '@/utils/request'

export function getOrgDatas (queryParam) {
  return axios({
    url: '/system/org/getOrgDatas',
    method: 'get',
    params: { ...queryParam }
  })
}
// Record
export function updateOrgData (record) {
  return axios({
    url: '/system/org/updateOrg',
    method: 'post',
    data: record
  })
}
export function deleteOrgDatas (ids) {
  return axios({
    url: '/system/org/delOrg',
    method: 'post',
    data: ids
  })
}
export function getOrgTypes () {
  return axios({
    url: '/system/org/getOrgTypes',
    method: 'get'
  })
}
export function getOrgUsers (id) {
  return axios({
    url: '/system/org/getOrgUsers',
    method: 'get',
    params: { id: id }
  })
}
