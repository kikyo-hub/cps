import { axios } from '@/utils/request'

export function SelectDicts () {
  return axios({
    url: '/system/dict/selectDicts',
    method: 'get'
  })
}

export function DeleteDicts (dict) {
  return axios({
    url: '/system/dict/deleteDicts',
    method: 'post',
    data: dict
  })
}

export function UpdateDicts (dict) {
  return axios({
    url: '/system/dict/updateDicts',
    method: 'post',
    data: {
      dict: dict
    }
  })
}
