import Mock from 'mockjs2'
import { builder } from '../util'
const TableData = () => {
    const test = []
    for (let i = 1; i <= 24; i += 1) {
        test.push({
          x: `${i}时`,
          y: Math.floor(Math.random() * 1000) + 200
        })
      } return builder(test)
}
const TableData2 = () => {
  const test = [
    { item: '已用设备', count: 60 },
    { item: '未用设备', count: 30 },
    { item: '故障设备', count: 10 }
  ]
  return builder(test)
}
const TableData3 = () => {
  const test = [
    {
      dataIndex: 'devicename',
      key: 'devicename',
       title: '楼层',
      slots: { title: 'customTitle' },
      scopedSlots: { customRender: 'devicename' }
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: '位置',
      dataIndex: 'address',
      key: 'address'
    },
    {
      title: '运行状态',
      key: 'status',
      dataIndex: 'status',
      scopedSlots: { customRender: 'status' }
    },
    {
      title: '设备状态',
      key: 'running',
      dataIndex: 'running',
      scopedSlots: { customRender: 'running' }
    },
    {
      title: '操作',
      key: 'action',
      scopedSlots: { customRender: 'action' }
    }
  ]
  return builder(test)
}
const TableData4 = () => {
  const tabledata1 = [
    {
      key: '1',
      devicename: '一层',
      type: '空调',
      address: '大楼',
      status: '可用',
      running: '开'
    },
    {
      key: '2',
      devicename: '二层',
      type: '空调',
      address: '大楼',
      status: '不可用',
      running: '关'
    },
    {
      key: '3',
      devicename: '三层',
      type: '空调',
      address: '大楼',
      status: '可用',
      running: '开'
    },
    {
      key: '4',
      devicename: '四层',
      type: '空调',
      address: '大楼',
      status: '可用',
       running: '关'
    },
    {
      key: '5',
      devicename: '五层',
      type: '空调',
      address: '大楼',
      status: '可用',
       running: '关'
    },
    {
      key: '6',
      devicename: '六层',
      type: '空调',
      address: '大楼',
      status: '可用',
       running: '关'
    },
    {
      key: '7',
      devicename: '七层',
      type: '空调',
      address: '大楼',
      status: '可用',
       running: '关'
    },
    {
      key: '8',
      devicename: '八层',
      type: '空调',
      address: '大楼',
      status: '可用',
       running: '关'
    },
    {
      key: '9',
      devicename: '九层',
      type: '空调',
      address: '大楼',
      status: '可用',
       running: '关'
    }
  ]
return builder(tabledata1)
}
Mock.mock(/\/airconditionsystem\/airdata/, 'get', TableData)
Mock.mock(/\/airconditionsystem\/airpie/, 'get', TableData2)
Mock.mock(/\/airconditionsystem\/airtable/, 'get', TableData3)
Mock.mock(/\/airconditionsystem\/airtabl/, 'get', TableData4)
