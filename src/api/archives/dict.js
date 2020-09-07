import { axios } from '@/utils/request'

export function SelectDicts () {
  return axios({
    url: '/dict/dict/selectDicts',
    method: 'get'
  })
}

export function DeleteDicts (dict) {
  return axios({
    url: '/dict/dict/deleteDicts',
    method: 'post',
    data: dict
  })
}

export function UpdateDicts (dict) {
  return axios({
    url: '/dict/dict/updateDicts',
    method: 'post',
    data: {
      dict: dict
    }
  })
}
