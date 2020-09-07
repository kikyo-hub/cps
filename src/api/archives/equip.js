import { axios } from '@/utils/request'
const EquipApi = {
    getAllSubordinateEquipment: '/archives/equip/getAllSubordinateEquipment',
    getAllLowerEquipment: '/archives/equip/getAllLowerEquipment'
    }
export function getAllSubordinateEquipment (parameter) {
        return axios({
          url: EquipApi.getAllSubordinateEquipment,
          method: 'get',
          params: parameter
        })
      }
export function getAllLowerEquipment (commAddress) {
  return axios({
    url: EquipApi.getAllLowerEquipment,
    method: 'get',
    params: {
      commAddress: commAddress
    }
  })
}
