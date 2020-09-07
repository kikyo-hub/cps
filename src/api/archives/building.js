import { axios } from '@/utils/request'

const BuildingApi = {
    GetColumns: '/archives/i',
    GetMonitorData: '/archives/detectionPoint',
    GetDiagnosticData: '/archives/diagnostic',
    GetBuildingData: '/archives/buildingdata',
    GetBuiDiaData: '/archives/custome',
    DeletediagnosisId: '/archives/deleteDiagnosis',
    DeletemonitorId: '/archives/deleteCMonitor',
    UpdatediagnosisDatas: '/archives/putDiagnosis',
    UpdatemonitorDatas: '/archives/putCMonitor',
    Adddiagnosis: '/archives/addDiagnosis',
    Addmonitor: '/archives/addCMonitor',
    selectDiagnosis: '/archives/selectDiagnosis',
    selectCMonitor: '/archives/selectCMonitor',
    GetAllBuiData: '/archives/selectBuildingAllData',
    insertFloor: '/archives/insertFloor',
    updateFloor: '/archives/updateFloor',
    deleteFloor: '/archives/deleteFloor',
    insertRoom: '/archives/insertRoom',
    updateRoom: '/archives/updateRoom',
    deleteRoom: '/archives/deleteRoom'
  }

  export function deleteRoom (parameter) {
    return axios({
      url: BuildingApi.deleteRoom,
      method: 'delete',
      params: {
        roomNo: parameter
      }
    })
  }

  export function updateRoom (parameter) {
    return axios({
      url: BuildingApi.updateRoom,
      method: 'put',
      data: parameter
    })
  }

  export function insertRoom (parameter) {
    return axios({
      url: BuildingApi.insertRoom,
      method: 'put',
      data: parameter
    })
  }
  export function deleteFloor (parameter) {
    return axios({
      url: BuildingApi.deleteFloor,
      method: 'delete',
      params: {
        floorNo: parameter
      }
    })
  }

  export function updateFloor (parameter) {
    return axios({
      url: BuildingApi.updateFloor,
      method: 'put',
      data: parameter
    })
  }

  export function insertFloor (parameter) {
    return axios({
      url: BuildingApi.insertFloor,
      method: 'put',
      data: parameter
    })
  }

  export function GetFloorForBuild (parameter) {
    return axios({
      url: '/archives/getFloorRoomForBuild',
      method: 'get',
      params: parameter
    })
  }

  export function GetColumns () {
    return axios({
      url: BuildingApi.GetColumns,
      method: 'get'
    })
  }

  export function GetMonitorData (buildingno) {
    return axios({
      url: BuildingApi.GetMonitorData,
      method: 'get',
      params: {
        buildingno: buildingno
      }
    })
  }

  export function GetDiagnosticData () {
    return axios({
      url: BuildingApi.GetDiagnosticData,
      method: 'get'
    })
  }

  export function GetBuildingData (buildingno) {
    return axios({
      url: BuildingApi.GetBuildingData,
      method: 'get',
      params: {
        building_no: buildingno
      }
    })
  }

  export function GetBuiDiaData (buildingno) {
    return axios({
      url: BuildingApi.GetBuiDiaData,
      method: 'get',
      params: {
        buildingno: buildingno
      }
    })
  }

  export function DeletediagnosisId (diagnosisId) {
    return axios({
      url: BuildingApi.DeletediagnosisId,
      method: 'delete',
      params: {
        diagnosisId: diagnosisId
      }
    })
  }

  export function DeletemonitorId (monitorId) {
    return axios({
      url: BuildingApi.DeletemonitorId,
      method: 'delete',
      params: {
        monitorId: monitorId
      }
    })
  }

  export function UpdatediagnosisDatas (parameter) {
    return axios({
      url: BuildingApi.UpdatediagnosisDatas,
      method: 'put',
      data: parameter
    })
  }

  export function UpdatemonitorDatas (parameter) {
    return axios({
      url: BuildingApi.UpdatemonitorDatas,
      method: 'put',
      data: parameter
    })
  }

  export function Adddiagnosis (parameter) {
    return axios({
      url: BuildingApi.Adddiagnosis,
      method: 'post',
      data: parameter
    })
  }

  export function Addmonitor (parameter) {
    return axios({
      url: BuildingApi.Addmonitor,
      method: 'post',
      data: parameter
    })
  }

  export function selectDiagnosis (buildingNo, floorNo) {
    return axios({
      url: BuildingApi.selectDiagnosis,
      method: 'get',
      params: {
        floorNo: floorNo,
        buildingNo: buildingNo
      }
    })
  }

  export function selectCMonitor (buildingNo, floorNo) {
    return axios({
      url: BuildingApi.selectCMonitor,
      method: 'get',
      params: {
        buildingNo: buildingNo,
        floorNo: floorNo
      }
    })
  }

  export function GetAllBuiData (buildingNo) {
    return axios({
      url: BuildingApi.GetAllBuiData,
      method: 'get',
      params: {
        buildingNo: buildingNo
      }
    })
  }
