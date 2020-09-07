import { axios } from '@/utils/request'
// 分页查询role list
export function getUsers (queryParam) {
  return axios({
    url: '/system/user/getUsers',
    method: 'get',
    params: { ...queryParam }
  })
}
// 更新角色的基本元信息
export function updateUsers (record) {
  return axios({
    url: '/system/user/updateUsers',
    method: 'post',
    data: record
  })
}
//  给角色分配权限
export function distRoles (record) {
  return axios({
    url: '/system/user/distRoles',
    method: 'post',
    data: record
  })
}
// 删除角色，先判断此角色下有没有用户
export function delUsers (ids) {
  return axios({
    url: '/system/user/delUsers',
    method: 'post',
    data: ids
  })
}

export function getRoles () {
  return axios({
    url: '/system/user/getRoles',
    method: 'get'
  })
}
