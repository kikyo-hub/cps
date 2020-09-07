import Mock from 'mockjs2'
import { builder } from '../util'
var Random = Mock.Random

const buildingdata = () => {
  const enterprisedata = ['管理员', '34000589748125ZT', '0551-65336307', '合肥高新区创新产业园二期G1', '良好', '仪器仪表制造业', '有限责任公司', '开业', '1997-03-12']
  return builder(enterprisedata)
}

const data = () => {
  const goodsColumns = [
    {
          title: '监测点名称',
          dataIndex: 'monitorname',
          scopedSlots: { customRender: 'monitorname' },
          key: 'monitorname'
        },
        {
          title: '用能设备类型',
          dataIndex: 'devicetype',
          scopedSlots: { customRender: 'devicetype' },
          key: 'devicetype',
          align: 'center'
        },
        {
          title: '描述信息',
          dataIndex: 'desc',
          scopedSlots: { customRender: 'desc' },
          key: 'desc',
          align: 'center'
        },
        {
          title: '所属楼层',
          dataIndex: 'floorno',
          scopedSlots: { customRender: 'floorno' },
          key: 'floorno',
          align: 'center'
        },
        {
          title: '所属房间',
          dataIndex: 'roomno',
          scopedSlots: { customRender: 'roomno' },
          key: 'roomno',
          align: 'center'
        },
        {
          title: '创建人员',
          dataIndex: 'cerator',
          scopedSlots: { customRender: 'cerator' },
          key: 'cerator',
          align: 'center'
        },
        {
            title: '创建时间',
            dataIndex: 'createtime',
            scopedSlots: { customRender: 'createtime' },
            key: 'createtime',
            align: 'center'
          },
        {
          title: '操作',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' },
          fixed: 'right',
          align: 'center',
          width: 150
        }
  ]
  return builder(goodsColumns)
}

const data1 = () => {
//   const loadGoodsData = []
//     for (let i = 0; i < 100; i++) {
//     loadGoodsData.push({
//     key: i.toString(),
//     name: `Edrward ${i}`,
//     id: 32,
//     type: `集中器 ${i}`,
//     fullname: `张三`,
//     address: `London Park no. ${i}`,
//     number: `173${i}`,
//     legalpersonname: `王五`,
//     occupymultiplelayers: `是`,
//     startfloor: `1`,
//     endfloor: `${i}`
//   })
// }
  const loadGoodsData = [
    {
        key: '0',
        monitorname: Mock.mock('@first'),
        devicetype: Mock.mock('@id'),
        desc: '国营企业',
        floorno: Random.integer(1, 9),
        roomno: Mock.mock('@integer(100, 1000)'),
        cerator: Mock.mock('@first'),
        createtime: Mock.mock('@date()')
      },
      {
        key: '1',
        monitorname: Mock.mock('@first'),
        devicetype: Mock.mock('@id'),
        desc: '私营企业',
        floorno: Random.integer(1, 9),
        roomno: Mock.mock('@integer(100, 1000)'),
        cerator: Mock.mock('@first'),
        createtime: Mock.mock('@date()')
      },
      {
        key: '2',
        monitorname: Mock.mock('@first'),
        devicetype: Mock.mock('@id'),
        desc: '国营企业',
        floorno: Random.integer(1, 9),
        roomno: Mock.mock('@integer(100, 1000)'),
        cerator: Mock.mock('@first'),
        createtime: Mock.mock('@date()')
      },
      {
        key: '3',
        monitorname: Mock.mock('@first'),
        devicetype: Mock.mock('@id'),
        desc: '科技技术企业',
        floorno: Random.integer(1, 9),
        roomno: Mock.mock('@integer(100, 1000)'),
        cerator: Mock.mock('@first'),
        createtime: Mock.mock('@date()')
      },
      {
        key: '4',
        monitorname: Mock.mock('@first'),
        devicetype: Mock.mock('@id'),
        desc: '国营企业',
        floorno: Random.integer(1, 9),
        roomno: Mock.mock('@integer(100, 1000)'),
        cerator: Mock.mock('@first'),
        createtime: Mock.mock('@date()')
      }
  ]
  return builder(loadGoodsData)
}

const data2 = () => {
    const loadGoodsData = [
      {
          key: '0',
          monitorname: Mock.mock('@first'),
          devicetype: Mock.mock('@id'),
          desc: '国营企业',
          floorno: Random.integer(1, 9),
          roomno: Mock.mock('@integer(100, 1000)'),
          cerator: Mock.mock('@first'),
          createtime: Mock.mock('@date()')
        },
        {
          key: '1',
          monitorname: Mock.mock('@first'),
          devicetype: Mock.mock('@id'),
          desc: '私营企业',
          floorno: Random.integer(1, 9),
          roomno: Mock.mock('@integer(100, 1000)'),
          cerator: Mock.mock('@first'),
          createtime: Mock.mock('@date()')
        },
        {
          key: '2',
          monitorname: Mock.mock('@first'),
          devicetype: Mock.mock('@id'),
          desc: '国营企业',
          floorno: Random.integer(1, 9),
          roomno: Mock.mock('@integer(100, 1000)'),
          cerator: Mock.mock('@first'),
          createtime: Mock.mock('@date()')
        },
        {
          key: '3',
          monitorname: Mock.mock('@first'),
          devicetype: Mock.mock('@id'),
          desc: '科技技术企业',
          floorno: Random.integer(1, 9),
          roomno: Mock.mock('@integer(100, 1000)'),
          cerator: Mock.mock('@first'),
          createtime: Mock.mock('@date()')
        },
        {
          key: '4',
          monitorname: Mock.mock('@first'),
          devicetype: Mock.mock('@id'),
          desc: '国营企业',
          floorno: Random.integer(1, 9),
          roomno: Mock.mock('@integer(100, 1000)'),
          cerator: Mock.mock('@first'),
          createtime: Mock.mock('@date()')
        }
    ]
    return builder(loadGoodsData)
  }

Mock.mock(/\/archives\/buildingdata/, 'get', buildingdata)
Mock.mock(/\/archives\/i/, 'get', data)
Mock.mock(/\/archives\/j/, 'get', data1)
Mock.mock(/\/archives\/k/, 'get', data2)
