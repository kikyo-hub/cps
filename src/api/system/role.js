import { axios } from '@/utils/request'
// 分页查询role list
export function getRoles (queryParam) {
  return axios({
    url: '/system/role/getRoles',
    method: 'get',
    params: { ...queryParam }
  })
}
// 更新角色的基本元信息
export function updateRole (record) {
  return axios({
    url: '/system/role/updateRole',
    method: 'post',
    data: record
  })
}
//  给角色分配权限
export function distAuths (record) {
  return axios({
    url: '/system/role/distAuths',
    method: 'post',
    data: record
  })
}
// 删除角色，先判断此角色下有没有用户
export function deleteRoles (ids) {
  return axios({
    url: '/system/role/delRole',
    method: 'post',
    data: ids
  })
}
 // 获取拥有此角色的用户
export function getRoleUsers (id) {
  return axios({
    url: '/system/role/getRoleUsers',
    method: 'get',
    params: { id: id }
  })
}
