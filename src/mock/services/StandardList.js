import Mock from 'mockjs2'
import { builder } from '../util'
const TableData = () => {
    const test = []
    for (let i = 2; i < 26; i += 2) {
        test.push({
          x: `${i}时`,
          y: Math.floor(Math.random() * 1000) + 200
        })
      } return builder(test)
}
const TableData2 = () => {
    const test = []
    for (let i = 0; i < 7; i += 1) {
        test.push({
          x: `第${i + 1}天`,
          y: Math.floor(Math.random() * 1000) + 200
        })
      } return builder(test)
}
const TableData4 = () => {
    const test = []
    for (let i = 0; i < 12; i += 1) {
        test.push({
          x: `${i + 1}月`,
          y: Math.floor(Math.random() * 1000) + 200
        })
      } return builder(test)
}
const TableData3 = () => {
    const test = []
    for (let i = 0; i < 30; i += 1) {
        test.push({
          x: `${i + 1}号`,
          y: Math.floor(Math.random() * 1000) + 200
        })
      } return builder(test)
}
const TableData5 = () => {
    const test = []
    for (let i = 0; i < 9; i += 1) {
        test.push({
          x: `${i + 1}楼`,
          y: Math.floor(Math.random() * 1000) + 200
        })
      } return builder(test)
}
const sourceData = () => {
    const test = [
        { item: '0~4时', count: 32.2 },
        { item: '4~8时', count: 21 },
        { item: '8~12时', count: 17 },
        { item: '12~16时', count: 13 },
        { item: '16~20时', count: 9 },
        { item: '20~24时', count: 7.8 }
    ]
     return builder(test)
}
const sourceData2 = () => {
    const test = [
      { item: '周一', count: 20 },
      { item: '周二', count: 21 },
      { item: '周三', count: 17 },
      { item: '周四', count: 13 },
      { item: '周五', count: 9 },
      { item: '周六', count: 4 },
      { item: '周日', count: 5 }
    ]
     return builder(test)
  }
  const sourceData3 = () => {
    const test = [
      { item: '周一', count: 20 },
      { item: '周二', count: 21 },
      { item: '周三', count: 17 },
      { item: '周四', count: 13 },
      { item: '周五', count: 9 },
      { item: '周六', count: 4 },
      { item: '周日', count: 5 }
    ]
     return builder(test)
  }
  const sourceData4 = () => {
    const test = [
      { item: '一月', count: 20 },
      { item: '二月', count: 21 },
      { item: '三月', count: 17 },
      { item: '四月', count: 13 },
      { item: '五月', count: 9 },
      { item: '六月', count: 4 },
      { item: '七月', count: 5 },
      { item: '八月', count: 5 },
      { item: '九月', count: 5 },
      { item: '十月', count: 5 },
      { item: '十一月', count: 5 },
      { item: '十二月', count: 5 }
    ]
     return builder(test)
  }
  const sourceData5 = () => {
    const test = [
      { item: '照明', count: 20 },
      { item: '空调', count: 21 },
      { item: '生产', count: 17 },
      { item: '电梯', count: 13 },
      { item: '其他', count: 9 }
    ]
     return builder(test)
  }
Mock.mock(/\/standardata\/DayList/, 'get', TableData)
Mock.mock(/\/standardata\/WeekList/, 'get', TableData2)
Mock.mock(/\/standardata\/MonthList/, 'get', TableData3)
Mock.mock(/\/standardata\/YearList/, 'get', TableData4)
Mock.mock(/\/standardata\/List/, 'get', TableData5)
Mock.mock(/\/standardata\/sourceData/, 'get', sourceData)
Mock.mock(/\/standardata\/Daypie/, 'get', sourceData)
Mock.mock(/\/standardata\/Weekpie/, 'get', sourceData2)
Mock.mock(/\/standardata\/Monthpie/, 'get', sourceData3)
Mock.mock(/\/standardata\/Yearpie/, 'get', sourceData4)
Mock.mock(/\/standardata\/pie/, 'get', sourceData5)
