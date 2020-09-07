import Mock from 'mockjs2'
import { builder, getBody } from '../util'
const totalCount = 5701

const getMonitorPoint = (options) => {
  const parameters = getBody(options)

  const result = []
  const pageNo = parseInt(parameters.pageNo)
  const pageSize = parseInt(parameters.pageSize)
  const totalPage = Math.ceil(totalCount / pageSize)
  // const key = (pageNo - 1) * pageSize
  // const next = (pageNo >= totalPage ? (totalCount % pageSize) : pageSize) + 1
  result.push({
    monitorId: '10001',
    monitorName: '801空调用电',
    deviceType: '空调',
    equipAddress: '8楼801',
    collectionRuleId: '56',
    monitorDesc: '801空调用电分析点数据',
    buildingNo: 'G1',
    floorNo: '8',
    roomNo: '801',
    creator: '杨晓元',
    createTime: '2020-01-03',
    avatar: '~@/assets/空调.png'
  })
  result.push({
    monitorId: '10002',
    monitorName: '801照明用电',
    deviceType: '照明',
    equipAddress: '8楼801',
    collectionRuleId: '45',
    monitorDesc: '801照明用电分析点数据',
    buildingNo: 'G1',
    floorNo: '8',
    roomNo: '801',
    creator: '杨晓元',
    createTime: '2020-01-03',
    avatar: '@/assets/照明用电.png'
  })
  result.push({
    monitorId: '10003',
    monitorName: '801日常用水',
    deviceType: '用水',
    equipAddress: '8楼',
    collectionRuleId: '34',
    monitorDesc: '801日常用水分析点数据',
    buildingNo: 'G1',
    floorNo: '8',
    roomNo: '801',
    creator: '杨晓元',
    createTime: '2020-01-03',
    avatar: '/src/assets/生活用水.png'
  })
  result.push({
    monitorId: '10004',
    monitorName: '801办公用电',
    deviceType: '办公用电',
    equipAddress: '8楼801',
    collectionRuleId: '66',
    monitorDesc: '801办公用电分析点数据',
    buildingNo: 'G1',
    floorNo: '8',
    roomNo: '801',
    creator: '杨晓元',
    createTime: '2020-01-03',
    avatar: '/../../src/assets/办公用电.png'
  })
  result.push({
    monitorId: '10007',
    monitorName: '802办公用电',
    deviceType: '办公用电',
    equipAddress: '8楼802',
    collectionRuleId: '66',
    monitorDesc: '802办公用电分析点数据',
    buildingNo: 'G1',
    floorNo: '8',
    roomNo: '802',
    creator: '杨晓元',
    createTime: '2020-01-03',
    avatar: '/../../src/assets/办公用电.png'
  })
  result.push({
    monitorId: '10008',
    monitorName: '802空调用电',
    deviceType: '空调',
    equipAddress: '8楼802',
    collectionRuleId: '56',
    monitorDesc: '802空调用电分析点数据',
    buildingNo: 'G1',
    floorNo: '8',
    roomNo: '802',
    creator: '杨晓元',
    createTime: '2020-01-03',
    avatar: '~@/assets/空调.png'
  })
  result.push({
    monitorId: '10012',
    monitorName: '802日常用水',
    deviceType: '用水',
    equipAddress: '8楼',
    collectionRuleId: '34',
    monitorDesc: '802日常用水分析点数据',
    buildingNo: 'G1',
    floorNo: '8',
    roomNo: '802',
    creator: '杨晓元',
    createTime: '2020-01-03',
    avatar: '/src/assets/生活用水.png'
  })
  // result.push({
  //   monitorId: '10005',
  //   monitorName: '801其他能耗',
  //   deviceType: '其他',
  //   equipAddress: '8楼',
  //   collectionRuleId: '32',
  //   monitorDesc: '801其他能耗分析点数据',
  //   buildingNo: 'G1',
  //   floorNo: '8',
  //   roomNo: '801',
  //   creator: '杨晓元',
  //   createTime: '2020-01-03',
  //   avatar: 'buildimg'
  // })
  // result.push({
  //   title: '空调用能分析',
  //   avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
  //   description: '空调用能分析点数据',
  //   owner: Mock.mock('@cname'),
  //   startAt: Mock.mock('@datetime'),
  //   progress: {
  //     value: Mock.mock('@integer(1, 100)')
  //   },
  //   id: '1',
  //   monitorName: '监测点名',
  //   deviceType: '设备类型',
  //   equipAddress: '设备地址',
  //   collectionRule: '采集规则',
  //   desc: '描述',
  //   buildingNo: '所属楼栋',
  //   floorNo: '所属楼层',
  //   roomNo: '所属房间',
  //   creator: '创建人员',
  //   createTime: Mock.mock('@datetime')
  // })
  // result.push({
  //   title: '照明用能分析',
  //   avatar: 'https://gw.alipayobjects.com/zos/rmsportal/zOsKZmFRdUtvpqCImOVY.png',
  //   description: '希望是一个好东西，也许是最好的，好东西是不会消亡的',
  //   owner: Mock.mock('@cname'),
  //   startAt: Mock.mock('@datetime'),
  //   progress: {
  //     value: Mock.mock('@integer(1, 100)')
  //   },
  //   id: '2',
  //   monitorName: '监测点名',
  //   deviceType: '设备类型',
  //   equipAddress: '设备地址',
  //   collectionRule: '采集规则',
  //   desc: '描述',
  //   buildingNo: '所属楼栋',
  //   floorNo: '所属楼层',
  //   roomNo: '所属房间',
  //   creator: '创建人员',
  //   createTime: Mock.mock('@datetime')
  // })
  // result.push({
  //   title: '日常用水分析',
  //   avatar: 'https://gw.alipayobjects.com/zos/rmsportal/dURIMkkrRFpPgTuzkwnB.png',
  //   description: '生命就像一盒巧克力，结果往往出人意料',
  //   owner: Mock.mock('@cname'),
  //   startAt: Mock.mock('@datetime'),
  //   progress: {
  //     value: Mock.mock('@integer(1, 100)')
  //   },
  //   id: '3',
  //   monitorName: '监测点名',
  //   deviceType: '设备类型',
  //   equipAddress: '设备地址',
  //   collectionRule: '采集规则',
  //   desc: '描述',
  //   buildingNo: '所属楼栋',
  //   floorNo: '所属楼层',
  //   roomNo: '所属房间',
  //   creator: '创建人员',
  //   createTime: Mock.mock('@datetime')
  // })
  // result.push({
  //   title: '办公用电分析',
  //   avatar: 'https://gw.alipayobjects.com/zos/rmsportal/sfjbOqnsXXJgNCjCzDBL.png',
  //   description: '城镇中有那么多的酒馆，她却偏偏走进了我的酒馆',
  //   owner: Mock.mock('@cname'),
  //   startAt: Mock.mock('@datetime'),
  //   progress: {
  //     value: Mock.mock('@integer(1, 100)')
  //   },
  //   id: '4',
  //   monitorName: '监测点名',
  //   deviceType: '设备类型',
  //   equipAddress: '设备地址',
  //   collectionRule: '采集规则',
  //   desc: '描述',
  //   buildingNo: '所属楼栋',
  //   floorNo: '所属楼层',
  //   roomNo: '所属房间',
  //   creator: '创建人员',
  //   createTime: Mock.mock('@datetime')
  // })
  // result.push({
  //   title: '其他能耗分析',
  //   avatar: 'https://gw.alipayobjects.com/zos/rmsportal/siCrBXXhmvTQGWPNLBow.png',
  //   description: '那时候我只会想自己想要什么，从不想自己拥有什么',
  //   owner: Mock.mock('@cname'),
  //   startAt: Mock.mock('@datetime'),
  //   progress: {
  //     status: 'exception',
  //     value: Mock.mock('@integer(1, 100)')
  //   },
  //   id: '5',
  //   monitorName: '监测点名',
  //   deviceType: '设备类型',
  //   equipAddress: '设备地址',
  //   collectionRule: '采集规则',
  //   desc: '描述',
  //   buildingNo: '所属楼栋',
  //   floorNo: '所属楼层',
  //   roomNo: '所属房间',
  //   creator: '创建人员',
  //   createTime: Mock.mock('@datetime')
  // })
  return builder({
    pageSize: pageSize,
    pageNo: pageNo,
    totalCount: totalCount,
    totalPage: totalPage,
    data: result
  })
}
const InsertMonitorPoint = (options) => {
  return builder(null, '新增成功')
}
const UpdateMonitorPoint = (options) => {
  return builder(null, '更新成功')
}
const DeleteMonitorPoint = (options) => {
  const parameters = getBody(options)
  return builder(null, parameters.id + '删除成功')
}
Mock.mock(/\/archives\/getMonitorPoint/, 'post', getMonitorPoint)
Mock.mock(/\/archives\/insertPoint/, 'post', InsertMonitorPoint)
Mock.mock(/\/archives\/updatePoint/, 'post', UpdateMonitorPoint)
Mock.mock(/\/archives\/deletePoint/, 'post', DeleteMonitorPoint)
