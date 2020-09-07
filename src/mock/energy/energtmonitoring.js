import Mock from 'mockjs2'
import { builder, getBody } from '../util'

const getAll = (options) => {
  console.log('options', options)
  const body = getBody(options)
  console.log('Mock user/info body', body)
  const allmeter = {
    'name': '管理员',
    'avatar': '/ztlogo64.png',
    'roles': ['homepage', 'device', 'data', 'archives', 'efficiency', 'user', 'monitor']
  }

  return builder(allmeter)
}

Mock.mock(/\/dashboard\/energymonitoring/, 'get', getAll)
