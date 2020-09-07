// const Mock = require('mock.js')
// const id = Mock.mock('@id')
// console.log(id)
import Mock from 'mockjs2'
import { builder, getBody } from '../util'

const data = () => {
  const enterprisedata = ['管理员', '34000589748125ZT', '0551-65336307', '合肥高新区创新产业园二期G1', '良好', '仪器仪表制造业', '有限责任公司', '开业', '1997-03-12']
  return builder(enterprisedata)
}

const data1 = () => {
  const enterprisedata = ['ZTA楼', '118.2356', '124.3647', '9', 'Science.W', '1997-03-12']
  return builder(enterprisedata)
}

const data2 = () => {
  const enterprisedata = ['ZTB楼', '118.2356', '124.3647', '9', 'Science.W', '2008-03-12']
  return builder(enterprisedata)
}

const data3 = () => {
  const enterprisedata = ['ZTC楼', '118.2356', '124.3647', '9', 'Science.W', '2015-03-12']
  return builder(enterprisedata)
}

const GetDatas = (options) => {
  const body = getBody(options)
  const dataSource = []
  for (let i = 0; i < 5; i++) {
  dataSource.push({
      id: i,
      title: 'ZTA楼',
      content: '这个规则库模版用于处理空调的能耗分析'
  })
  }
  dataSource.push({})
  return builder(dataSource, body.id + 'GetDRules查询成功')
  // return builder(dataSource)
}

const DelDatas = (options) => {
  console.log('ssss' + options.body)
  const body = getBody(options)
  console.log('1213' + options.body)
      return builder(null, body + 'DelDRules删除成功')
  }

const UpdateDatas = (options) => {
  const body = getBody(options)
      return builder(null, body.id + 'UpdateDRules更新成功')
  }

const AddDatas = (options) => {
      return builder(null, 'AddDRules新增成功')
  }

Mock.mock(/\/archives\/customer/, 'get', data)
Mock.mock(/\/archives\/custome/, 'get', data1)
Mock.mock(/\/archives\/custom/, 'get', data2)
Mock.mock(/\/archives\/custo/, 'get', data3)
Mock.mock(/\/archives\/getDatas/, 'post', GetDatas)
Mock.mock(/\/archives\/addDatas/, 'post', AddDatas)
Mock.mock(/\/archives\/delDatas/, 'post', DelDatas)
Mock.mock(/\/archives\/updateDatas/, 'post', UpdateDatas)
