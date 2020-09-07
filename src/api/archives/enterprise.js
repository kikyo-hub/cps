import { axios } from '@/utils/request'

const EnterpriseApi = {
  GetEnterpriseData: '/archives/customer',
  GetDatas: '/archives/getDatas',
  AddDatas: '/archives/add',
  UpdateDatas: '/archives/putbuildingno',
  UpdateEnDatas: '/archives/putCustomerData',
  DeleteBuildingNo: '/archives/deletebuildingno',
  getEnterpriseType: '/dict/equip/enterpriseType'
  }

  export function getEnterpriseType () {
    return axios({
      url: EnterpriseApi.getEnterpriseType,
      method: 'get'
    })
  }
  export function GetEnterpriseData () {
    return axios({
      url: EnterpriseApi.GetEnterpriseData,
      method: 'get'
      // params: {
      //   enterprise_id: enterpriseid
      // }
      // data: parameter
    })
  }

  export function DeleteBuildingNo (id) {
    return axios({
      url: EnterpriseApi.DeleteBuildingNo,
      method: 'delete',
      params: {
        id: id
      }
      // data: parameter
    })
  }

  export function GetDatas (parameter) {
    return axios({
      url: EnterpriseApi.GetDatas,
      method: 'post',
      data: parameter
    })
  }

  export function AddDatas (parameter) {
    return axios({
      url: EnterpriseApi.AddDatas,
      method: 'post',
      data: parameter
    })
  }

  export function UpdateDatas (parameter) {
    return axios({
      url: EnterpriseApi.UpdateDatas,
      method: 'put',
      data: parameter
    })
  }

  export function UpdateEnDatas (parameter) {
    return axios({
      url: EnterpriseApi.UpdateEnDatas,
      method: 'put',
      data: parameter
    })
  }
