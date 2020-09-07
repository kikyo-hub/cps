import { axios } from '@/utils/request'

const MonitorEquipApi = {
  equipColumns: '/archives/equipcolumns',
  GetAllequips: '/archives/allequips',
  equipType: '/archives/equip',
  deleteEquip: '/archives/deleteEquip',
  updateEquip: '/archives/updateEquip',
  insertEquip: '/archives/insertEquip',
  equipTypeOptions: '/dict/equip/type',
  equipCommModeOptions: '/dict/equip/commmode',
  equipProtocolOptions: '/dict/equip/protocol',
  equipModeOptions: '/dict/equip/mode',
  getEquipPage: '/archives/equip/page',
  getEquipall: '/archives/equip/all',
  getEquipdata: '/archives/equip/getEquipdata',
  getCallVersion: '/archives/callversion',
  getCallTime: '/archives/call_time',
  setCallTime: '/archives/set_time',
  remoteReset: '/archives/reset',
  getCallMeterArchives: '/archives/callmeter'
}

export function GetUpEquipOptions () {
  return axios({
    url: '/archives/equip/allUpEquipS',
    method: 'get'
  })
}
export function UpdateUpEquip (parameter) {
  return axios({
    url: '/archives/equip/updateUpEquip',
    method: 'post',
    data: parameter
  })
}
export function GetUpEquipOption () {
  return axios({
    url: '/archives/equip/allUpEquipS',
    method: 'get'
  })
}
export function insEquipExcel (parameter) {
  return axios({
    url: '/archives/equip/Excel',
    method: 'post',
    data: parameter,
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function updEquip (parameter) {
  return axios({
    url: '/archives/equip/',
    method: 'put',
    data: parameter
  })
}
export function delEquip (parameter) {
  return axios({
    url: '/archives/equip/' + parameter,
    method: 'delete'
  })
}
export function insEquip (parameter) {
  return axios({
    url: '/archives/equip/',
    method: 'post',
    data: parameter
  })
}

export function GetEquipPage (parameter) {
  return axios({
    url: MonitorEquipApi.getEquipPage,
    method: 'get',
    params: parameter
  })
}
// params: parameter,
// headers: {
//   'Content-Type': 'application/json;charset=UTF-8'
// }
export function GetEquipTypeO () {
  return axios({
    url: MonitorEquipApi.equipTypeOptions,
    method: 'get'
  })
}
export function GetEquipCommModeO () {
  return axios({
    url: MonitorEquipApi.equipCommModeOptions,
    method: 'get'
  })
}

export function GetEquipProtocolO () {
  return axios({
    url: MonitorEquipApi.equipProtocolOptions,
    method: 'get'
  })
}

export function GetEquipModeOptions () {
  return axios({
    url: MonitorEquipApi.equipModeOptions,
    method: 'get'
  })
}

export function GetColumns () {
  return axios({
    url: MonitorEquipApi.equipColumns,
    method: 'get'
  })
}

export function GetAllequips (parameter) {
  return axios({
    url: MonitorEquipApi.GetAllequips,
    method: 'post',
    data: parameter
  })
}
export function GetequipType () {
  return axios({
    url: MonitorEquipApi.equipType,
    method: 'get'
  })
}
export function DeteteEquip (parameter) {
  return axios({
    url: MonitorEquipApi.deleteEquip,
    method: 'post',
    data: parameter
  })
}
export function UpdateEquip (parameter) {
  return axios({
    url: MonitorEquipApi.updateEquip,
    method: 'post',
    data: parameter
  })
}
export function InsertEquip (parameter) {
  return axios({
    url: MonitorEquipApi.insertEquip,
    method: 'post',
    data: parameter
  })
}

export function getEquipall () {
  return axios({
    url: MonitorEquipApi.getEquipall,
    method: 'get'
  })
}

export function getEquipdata (commaddress) {
  return axios({
    url: MonitorEquipApi.getEquipdata,
    method: 'get',
    params: {
      commaddress: commaddress
    }
  })
}
export function getCallVersion (address) {
  return axios({
    url: MonitorEquipApi.getCallVersion,
    method: 'get',
    params: {
      address: address
    }
  })
}
export function getCallTime (address, seconds) {
  return axios({
    url: MonitorEquipApi.getCallTime,
    method: 'get',
    params: {
      address: address,
      seconds: seconds
    }
  })
}
export function getMeterArchives (address, seconds) {
  return axios({
    url: MonitorEquipApi.getCallMeterArchives,
    method: 'get',
    params: {
      address: address,
      seconds: seconds
    }
  })
}
export function setCallTime (address) {
  return axios({
    url: MonitorEquipApi.setCallTime,
    method: 'get',
    params: {
      address: address
    }
  })
}
export function remoteReset (address, radiomsg) {
  return axios({
    url: MonitorEquipApi.remoteReset,
    method: 'get',
    params: {
      address: address,
      radiomsg: radiomsg
    }
  })
}
