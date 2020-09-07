import Mock from 'mockjs2'
import { builder } from '../util'
// var Random = Mock.Random

// const data = () => {
//     const colheads = [
//         {
//           dataIndex: 'devicename',
//           key: 'devicename',
//            title: '设备名称',
//           slots: { title: 'customTitle' },
//           scopedSlots: { customRender: 'devicename' }
//         },
//         {
//           title: '类型',
//           dataIndex: 'type',
//           key: 'type'
//         },
//         {
//           title: '位置',
//           dataIndex: 'address',
//           key: 'address'
//         },
//         {
//           title: '运行状态',
//           key: 'status',
//           dataIndex: 'status',
//           scopedSlots: { customRender: 'status' }
//         },
//         {
//           title: '设备状态',
//           key: 'running',
//           dataIndex: 'running',
//           scopedSlots: { customRender: 'running' }
//         },
//         {
//           title: '操作',
//           key: 'action',
//           scopedSlots: { customRender: 'action' }
//         }
//       ]
//   return builder(colheads)
// }

const data1 = () => {
    const tabledata = [
        {
          key: '1',
          equipName: '1楼大厅空调',
          type: '空调',
          location: '1楼空调旁',
          status: '在运',
          equipStatus: '开'
        },
        {
          key: '2',
          equipName: '8楼办公空调',
          type: '空调',
          location: '8楼空调旁',
          status: '停运',
          equipStatus: '关'
        },
        {
          key: '3',
          equipName: '3楼办公照明',
          type: '照明',
          location: '3楼过道处',
          status: '在运',
          equipStatus: '开'
        },
        {
          key: '4',
          equipName: '5楼温湿度检测',
          type: '传感器',
          location: '5楼室外',
          status: '停运',
          equipStatus: '关'
        },
        {
            key: '5',
            equipName: '大楼电梯',
            type: '电梯',
            location: '楼体',
            status: '在运',
            equipStatus: '关'
          }
      ]
  return builder(tabledata)
}

const data2 = () => {
    const tabledata1 = [
        {
          key: '1',
          equipName: '1楼大厅',
          type: '饮水机',
          location: '1楼接待处旁',
          status: '在运',
          equipStatus: '开'
        },
        {
          key: '2',
          equipName: '3楼餐厅',
          type: '锅炉',
          location: '3楼空调旁',
          status: '停运',
          equipStatus: '关'
        },
        {
          key: '3',
          equipName: '8楼水龙头',
          type: '洗浴水龙头',
          location: '8楼卫生间',
          status: '在运',
          equipStatus: '开'
        },
        {
          key: '4',
          equipName: '开水机',
          type: '开水机',
          location: '大楼',
          status: '在运',
          equipStatus: '关'
        }
      ]
  return builder(tabledata1)
}

const data3 = () => {
    const tabledata2 = [
        {
          key: '1',
          equipName: '1楼大厅空调',
          type: '空调',
          location: '1楼空调旁',
          status: '在运',
          equipStatus: '开'
        },
        {
          key: '2',
          equipName: '8楼办公空调',
          type: '空调',
          location: '8楼空调旁',
          status: '停运',
          equipStatus: '关'
        },
        {
          key: '3',
          equipName: '3楼办公照明',
          type: '照明',
          location: '3楼过道处',
          status: '在运',
          equipStatus: '开'
        },
        {
          key: '4',
          equipName: '5楼温湿度检测',
          type: '传感器',
          location: '5楼室外',
          status: '停运',
          equipStatus: '关'
        }
      ]
  return builder(tabledata2)
}

const data4 = () => {
    const tabledata3 = [
        {
          key: '1',
          equipName: '1楼大厅空调',
          type: '空调',
          location: '1楼空调旁',
          status: '在运',
          equipStatus: '开'
        },
        {
          key: '2',
          equipName: '8楼办公空调',
          type: '空调',
          location: '8楼空调旁',
          status: '停运',
          equipStatus: '关'
        },
        {
          key: '3',
          equipName: '3楼办公照明',
          type: '照明',
          location: '3楼过道处',
          status: '在运',
          equipStatus: '开'
        },
        {
          key: '4',
          equipName: '5楼温湿度检测',
          type: '传感器',
          location: '5楼室外',
          status: '停运',
          equipStatus: '关'
        }
      ]
  return builder(tabledata3)
}

const data5 = () => {
      const tabledata4 = [
          {
            key: '1',
            equipName: '1楼大厅空调',
            type: '空调',
            location: '1楼空调旁',
            status: '在运',
            equipStatus: '开'
          },
          {
            key: '2',
            equipName: '8楼办公空调',
            type: '空调',
            location: '8楼空调旁',
            status: '停运',
            equipStatus: '关'
          },
          {
            key: '3',
            equipName: '3楼办公照明',
            type: '照明',
            location: '3楼过道处',
            status: '在运',
            equipStatus: '开'
          },
          {
            key: '4',
            equipName: '5楼温湿度检测',
            type: '传感器',
            location: '5楼室外',
            status: '停运',
            equipStatus: '关'
          }
        ]
    return builder(tabledata4)
  }

Mock.mock(/\/device\/energysurvey/, 'get', data1)
Mock.mock(/\/device\/energysurv/, 'get', data2)
Mock.mock(/\/device\/energysur/, 'get', data3)
Mock.mock(/\/device\/energysu/, 'get', data4)
Mock.mock(/\/device\/energys/, 'get', data5)
