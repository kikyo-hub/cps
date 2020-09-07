import Mock from 'mockjs2'
import { builder } from '../util'

const orgTree = () => {
    // const data = [{
    //     'key': 'key-01',
    //     'title': '监测点',
    //     'icon': null,
    //     'children': [{
    //       'key': 'key-01-01',
    //       'title': '监测点1',
    //       'icon': 'eye',
    //       'address': '1楼',
    //       'group': true
    //     },
    //     {
    //       'key': 'key-01-02',
    //       'title': '监测点2',
    //       'icon': 'eye',
    //       'address': '2楼',
    //       'group': true
    //     },
    //     {
    //       'key': 'key-01-03',
    //       'title': '监测点3',
    //       'icon': 'eye',
    //       'address': '3楼',
    //       'group': true
    //     },
    //     {
    //       'key': 'key-01-04',
    //       'title': '监测点4',
    //       'icon': 'eye',
    //       'address': '4楼',
    //       'group': true
    //     }
    //     ]
    //   }]
      const data1 = []
      const data = []
      data1.push({ 'key': 'key-01',
          'title': '监测点',
          'icon': null,
          'children': [] })
      for (let i = 1; i < 15; i++) {
        data.push({
          'key': 'key-01-0' + i,
          'title': '监测点' + i,
          'icon': 'eye',
          'address': i + '楼',
          'group': true
        })
      }
      data1[0].children = data
    return builder(data1)
}
export function changeHourMinutestr (str) {
    const hours = Math.floor(str / 60).toString()
    const minutes = (str % 60).toString()
    if (str !== '0' && str !== '' && str !== null) {
      return hours + ':' + (minutes.length < 2 ? '0' + minutes : minutes) + ''
    } else {
      return ''
    }
  }
  const lineData = (options) => {
    const data = []
    // var a = options.body.split(',')
    // console.log(typeof (a))
    // console.log(a)
      for (let i = 0; i < 96; i++) {
        if (options.body.slice(2, 6) !== '') {
          data.push({
            time: changeHourMinutestr(15 * i), type: options.body.slice(2, 6), value: Mock.mock('@integer(60, 100)')
        })
        if (options.body.slice(9, 13) !== '') {
          data.push({
            time: changeHourMinutestr(15 * i), type: options.body.slice(9, 13), value: Mock.mock('@integer(60, 100)')
        })
        if (options.body.slice(16, 20) !== '') {
          data.push({
            time: changeHourMinutestr(15 * i), type: options.body.slice(16, 20), value: Mock.mock('@integer(60, 100)')
        })
        }
        }
        }
      }
    return builder(data)
}

const columnData = () => {
    const data = []
    const date = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    for (let i = 0; i < 7; i++) {
        data.push({
            date: date[i], value: Mock.mock('@integer(50, 100)')
        })
    }
      return builder(data)
}

const columns = () => {
  const columns = [
    {
      title: '监测设备名称',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '4点',
      dataIndex: 'four',
      key: 'four'
    },
    {
      title: '8点',
      dataIndex: 'eight',
      key: 'eight'
    },
    {
      title: '12点',
      dataIndex: 'twelve',
      key: 'twelve'
    },
    {
      title: '16点',
      dataIndex: 'sixth',
      key: 'sixth'
    },
    {
      title: '20点',
      dataIndex: 'twenty',
      key: 'twenty'
    },
    {
      title: '24点',
      dataIndex: 'twentyfour',
      key: 'twentyfour'
    },
    {
      title: '总计',
      dataIndex: 'total',
      key: 'total'
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      scopedSlots: { customRender: 'operation' }
    }
  ]
    return builder(columns)
}

const tableData = () => {
  const data = []
    for (let i = 0; i < 8; i++) {
        data.push({
          key: i + 1,
          name: '监测设备' + (i + 1),
          four: Mock.mock('@integer(50, 100)'),
          eight: Mock.mock('@integer(50, 100)'),
          twelve: Mock.mock('@integer(50, 100)'),
          sixth: Mock.mock('@integer(50, 100)'),
          twenty: Mock.mock('@integer(50, 100)'),
          twentyfour: Mock.mock('@integer(50, 100)'),
          total: Mock.mock('@integer(300, 600)')
        })
    }
  return builder(data)
}
const tableData1 = (options) => {
  var data = []
  console.log(options.body)
  // console.log(options.body.length)
  if (options.body.length === 6) {
   data = [{
    key: 'A相' + options.body.slice(2, 4),
    name: 'A相' + options.body.slice(2, 4),
    value: '224'
  },
  {
    key: 'B相' + options.body.slice(2, 4),
    name: 'B相' + options.body.slice(2, 4),
    value: '225'
  },
  {
    key: 'C相' + options.body.slice(2, 4),
    name: 'C相' + options.body.slice(2, 4),
    value: '228'
  }]
  } else if (options.body.length === 11) {
    data = [{
      key: 'A相' + options.body.slice(2, 4),
      name: 'A相' + options.body.slice(2, 4),
      value: '224'
    },
    {
      key: 'B相' + options.body.slice(2, 4),
      name: 'B相' + options.body.slice(2, 4),
      value: '225'
    },
    {
      key: 'C相' + options.body.slice(2, 4),
      name: 'C相' + options.body.slice(2, 4),
      value: '228'
    },
    {
      key: 'A相' + options.body.slice(7, 9),
      name: 'A相' + options.body.slice(7, 9),
      value: '224'
    },
    {
      key: 'B相' + options.body.slice(7, 9),
      name: 'B相' + options.body.slice(7, 9),
      value: '225'
    },
    {
      key: 'C相' + options.body.slice(7, 9),
      name: 'C相' + options.body.slice(7, 9),
      value: '228'
    }]
  } else if (options.body.length === 16) {
    data = [{
      key: 'A相' + options.body.slice(2, 4),
      name: 'A相' + options.body.slice(2, 4),
      value: '224'
    },
    {
      key: 'B相' + options.body.slice(2, 4),
      name: 'B相' + options.body.slice(2, 4),
      value: '225'
    },
    {
      key: 'C相' + options.body.slice(2, 4),
      name: 'C相' + options.body.slice(2, 4),
      value: '228'
    },
    {
      key: 'A相' + options.body.slice(7, 9),
      name: 'A相' + options.body.slice(7, 9),
      value: '224'
    },
    {
      key: 'B相' + options.body.slice(7, 9),
      name: 'B相' + options.body.slice(7, 9),
      value: '225'
    },
    {
      key: 'C相' + options.body.slice(7, 9),
      name: 'C相' + options.body.slice(7, 9),
      value: '228'
    },
    {
      key: 'A相' + options.body.slice(12, 14),
      name: 'A相' + options.body.slice(12, 14),
      value: '224'
    },
    {
      key: 'B相' + options.body.slice(12, 14),
      name: 'B相' + options.body.slice(12, 14),
      value: '225'
    },
    {
      key: 'C相' + options.body.slice(12, 14),
      name: 'C相' + options.body.slice(12, 14),
      value: '228'
    }]
  }
    return builder(data)
}
Mock.mock(/\/humidity\/orgtree/, 'get', orgTree)
Mock.mock(/\/humidity\/lineData/, 'get', lineData)
Mock.mock(/\/humidity\/columnData/, 'get', columnData)
Mock.mock(/\/humidity\/columns/, 'get', columns)
Mock.mock(/\/humidity\/tableData/, 'get', tableData)
Mock.mock(/\/humidity\/tableD/, 'get', tableData1)
