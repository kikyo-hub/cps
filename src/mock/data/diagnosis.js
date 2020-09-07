import Mock from 'mockjs2'
import { builder } from '../util'

const orgTree = () => {
    const data = [{
        'key': 'key-01',
        'title': '诊断点',
        // 'icon': 'eye',
        'children': [{
          'key': 'key-01-01',
          'title': '诊断点1',
          'icon': 'tool',
          'address': '1楼',
          'group': true
        },
        {
          'key': 'key-01-02',
          'title': '诊断点2',
          'icon': 'tool',
          'address': '2楼',
          'group': true
        },
        {
          'key': 'key-01-03',
          'title': '诊断点3',
          'icon': 'tool',
          'address': '3楼',
          'group': true
        },
        {
          'key': 'key-01-04',
          'title': '诊断点4',
          'icon': 'tool',
          'address': '4楼',
          'group': true
        },
        {
          'key': 'key-01-05',
          'title': '诊断点5',
          'icon': 'tool',
          'address': '5楼',
          'group': true
        },
        {
          'key': 'key-01-06',
          'title': '诊断点6',
          'icon': 'tool',
          'address': '6楼',
          'group': true
        },
        {
          'key': 'key-01-07',
          'title': '诊断点7',
          'icon': 'tool',
          'address': '7楼',
          'group': true
        },
        {
          'key': 'key-01-08',
          'title': '诊断点8',
          'icon': 'tool',
          'address': '8楼',
          'group': true
        },
        {
          'key': 'key-01-09',
          'title': '诊断点9',
          'icon': 'tool',
          'address': '9楼',
          'group': true
        }]
      }]
    return builder(data)
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

const tableData1 = (options) => {
  var data = []
  console.log(options.body)
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
Mock.mock(/\/data\/orgtree/, 'get', orgTree)
Mock.mock(/\/data\/lineData/, 'get', lineData)
Mock.mock(/\/data\/columnData/, 'get', columnData)
Mock.mock(/\/data\/tableData1/, 'get', tableData1)
