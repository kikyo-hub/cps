import Mock from 'mockjs2'
import { builder } from '../util'
const TableData = () => {
    const test = []
    for (let i = 0; i < 24; i += 1) {
        test.push({
          time: `${i}时`,
          type: '温度',
          y: Math.floor(Math.random() * 10) + 20
        })
        test.push({
          time: `${i}时`,
          type: '湿度',
          y: Math.floor(Math.random() * 10) + 10
        })
      } return builder(test)
}
const TableData2 = () => {
    const test = []
    for (let i = 0; i < 7; i += 1) {
        test.push({
          time: `第${i}天`,
          湿度: Math.floor(Math.random() * 10) + 20
        })
      } return builder(test)
}
const TableData3 = () => {
    const test = []
    for (let i = 0; i < 30; i += 1) {
        test.push({
          time: `${i + 1}天`,
          湿度: Math.floor(Math.random() * 10) + 20
        })
      } return builder(test)
}
Mock.mock(/\/humigity\/Weekchart/, 'get', TableData2)
Mock.mock(/\/humigity\/Daychart/, 'get', TableData)
Mock.mock(/\/humigity\/Monthchart/, 'get', TableData3)
