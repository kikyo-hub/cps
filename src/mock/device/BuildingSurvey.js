import Mock from 'mockjs2'
import { builder } from '../util'

const orgTree = () => {
    const data = [{
        'key': '0',
        'title': '平台组织机构',
        // 'icon': 'eye',
        'children': [{
          'key': '1',
          'title': '1楼',
          'icon': 'home',
          'address': '1楼',
          'group': true
        },
        {
          'key': '2',
          'title': '2楼',
          'icon': 'home',
          'address': '2楼',
          'group': true
        },
        {
          'key': '3',
          'title': '3楼',
          'icon': 'home',
          'address': '3楼',
          'group': true
        },
        {
          'key': '4',
          'title': '4楼',
          'icon': 'home',
          'address': '4楼',
          'group': true
        },
        {
          'key': '5',
          'title': '5楼',
          'icon': 'home',
          'address': '5楼',
          'group': true
        },
        {
          'key': '6',
          'title': '6楼',
          'icon': 'home',
          'address': '6楼',
          'group': true
        },
        {
          'key': '7',
          'title': '7楼',
          'icon': 'home',
          'address': '7楼',
          'group': true
        },
        {
          'key': '8',
          'title': '8楼',
          'icon': 'home',
          'address': '8楼',
          'group': true
        },
        {
          'key': '9',
          'title': '9楼',
          'icon': 'home',
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
const lineData = () => {
    const data = []
      for (let i = 0; i < 96; i++) {
          data.push({
              time: changeHourMinutestr(15 * i), value: Mock.mock('@integer(60, 100)')
          })
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
Mock.mock(/\/device\/BuildingSurvey/, 'get', orgTree)
Mock.mock(/\/device\/BuildingSurv/, 'get', lineData)
Mock.mock(/\/device\/BuildingSu/, 'get', columnData)
