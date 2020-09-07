import Mock from 'mockjs2'
import { builder, getBody } from '../util'

const equipcolumns = () => {
  const columns = [
    {
      title: '通信地址',
      dataIndex: 'commAddress',
      key: 'commAddress',
      align: 'center'
    },
    {
      title: '设备类型',
      dataIndex: 'equipType',
      key: 'equipType',
      align: 'center'
    },
    {
      title: '通信方式',
      dataIndex: 'commMode',
      key: 'commMode',
      align: 'center'
    },
    {
      title: '规约类型',
      dataIndex: 'protocolType',
      key: 'protocolType',
      align: 'center'
    },
    {
      title: '设备型号',
      dataIndex: 'equipMode',
      key: 'equipMode',
      align: 'center'
    },
    {
      title: '上级设备',
      dataIndex: 'upEquipId',
      key: 'upEquipId',
      align: 'center'
    },
    // {
    //   title: '设备名称',
    //   dataIndex: 'equipName',
    //   key: 'equipName',
    //   align: 'center'
    // },
    {
      title: '操作',
      dataIndex: 'action',
      scopedSlots: { customRender: 'action' },
      fixed: 'right',
      align: 'center',
      width: 150
    }
  ]
  return builder(columns)
}
const allequips = (options) => {
  const data = []
  data.push({
    equipNo: 'NYKZQ3462',
    commAddress: '48585674',
    equipType: '能源控制器',
    commMode: 'rs485',
    protocolType: '698',
    equipMode: '三相四线',
    upEquipId: '100004',
    equipName: ''
  })
  data.push({
    equipNo: 'NYKZQ3463',
    commAddress: '48585675',
    equipType: '能源路由器',
    commMode: 'rs485',
    protocolType: '698',
    equipMode: '三相四线',
    upEquipId: '100002',
    equipName: ''
  })
  data.push({
    equipNo: 'NYKZQ3464',
    commAddress: '48585676',
    equipType: '能源路由器',
    commMode: 'rs485',
    protocolType: '698',
    equipMode: '三相四线',
    upEquipId: '100002',
    equipName: ''
  })
  data.push({
    equipNo: 'NYKZQ3465',
    commAddress: '48585677',
    equipType: '监控计量设备',
    commMode: 'rs485',
    protocolType: '698',
    equipMode: '三相四线',
    upEquipId: '100001',
    equipName: ''
  })
  data.push({
    equipNo: 'NYKZQ3466',
    commAddress: '48585678',
    equipType: '监控计量设备',
    commMode: 'rs485',
    protocolType: '698',
    equipMode: '三相四线',
    upEquipId: '100001',
    equipName: ''
  })
  data.push({
    equipNo: 'NYKZQ3467',
    commAddress: '48585679',
    equipType: '传感设备',
    commMode: 'rs485',
    protocolType: '698',
    equipMode: '三相四线',
    upEquipId: '100001',
    equipName: ''
  })
  return builder(data)
}
// const allequips = (options) => {
//   const body = getBody(options)
//   const data = []
//   var type = '能源控制器'
//   var name = Mock.mock('@integer(1, 999)') === 1 ? '能源控制器' : '能源控制器'
//   if (body.equipType) {
//     type = body.equipType
//   }
//   if (body.equipName !== '') {
//     name = body.equipName
//   }
//   for (let i = 0; i < 100; i++) {
//     data.push({
//       equipNo: 'NYKZQ3466' + i,
//       commAddress: Mock.mock('@natural()'),
//       equipType: type,
//       commMode: '通信方式',
//       protocolType: '规约类型',
//       equipMode: Mock.mock('@integer(0, 4)'),
//       upEquipId: 'NYKZQ3466',
//       equipName: name
//     })
//   }
//   return builder(data)
// }
const equipType = () => {
  const columns = [
    { key: 1, val: '能源控制器' },
    { key: 2, val: '能源路由器' },
    { key: 3, val: '监控计量设备' },
    { key: 4, val: '传感设备' }
  ]
  return builder(columns)
}
const deteteEquip = (options) => {
  const body = getBody(options)
  return builder(null, body.id + '删除成功')
}
const updateEquip = (options) => {
  const body = getBody(options)
  return builder(null, body.id + '更新成功')
}
const insertEquip = (options) => {
  return builder(null, '新增成功')
}

Mock.mock(/\/archives\/equip/, 'get', equipcolumns)
Mock.mock(/\/archives\/allequips/, 'post', allequips)
Mock.mock(/\/archives\/equi/, 'get', equipType)
Mock.mock(/\/archives\/deleteEquip/, 'post', deteteEquip)
Mock.mock(/\/archives\/updateEquip/, 'post', updateEquip)
Mock.mock(/\/archives\/insertEquip/, 'post', insertEquip)
