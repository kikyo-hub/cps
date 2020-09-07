import Mock from 'mockjs2'
import { builder, getBody } from '../util'
const GetDRules = (options) => {
    const ico = require('@/assets/logo1.png')
    const body = getBody(options)
    const dataSource = []
    for (let i = 0; i < 3; i++) {
    dataSource.push({
        id: i,
        title: '规则库-空调-基本',
        title1: '规则库-照明-基本',
        title2: '规则库-给水-基本',
        avatar: ico,
        content: '这个规则库模版用于处理空调的能耗分析',
        content1: '这个规则库模版用于处理照明的能耗分析',
        content2: '这个规则库模版用于处理给水的能耗分析'
    })
    }
    dataSource.push({})
    return builder(dataSource, body.id + 'GetDRules查询成功')
}
const DelDRules = (options) => {
const body = getBody(options)
    return builder(null, body.id + 'DelDRules删除成功')
}
const UpdateDRules = (options) => {
const body = getBody(options)
    return builder(null, body.id + 'UpdateDRules更新成功')
}
const AddDRules = (options) => {
    return builder(null, 'AddDRules新增成功')
}
Mock.mock(/\/archives\/getDRules/, 'post', GetDRules)
Mock.mock(/\/archives\/addDRules/, 'post', AddDRules)
Mock.mock(/\/archives\/delDRules/, 'post', DelDRules)
Mock.mock(/\/archives\/updateDRules/, 'post', UpdateDRules)
