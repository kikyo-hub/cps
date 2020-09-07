import Mock from 'mockjs2'
import { builder } from '../util'

const data = () => {
    const test = []
    for (let i = 0; i < 24; i += 1) {
        test.push({
        x: `${i }时`,
        y: Math.floor(Math.random() * 1000) + 200
})
}
    return builder(test)
}
const data2 = () => {
    const test1 = []
    for (let i = 0; i < 7; i += 1) {
        test1.push({
        x: `第${i + 1}天`,
        y: Math.floor(Math.random() * 1000) + 200
})
}
return builder(test1)
}
const data3 = () => {
    const equipments = ['照明设备', '空调暖通', '公用电梯', '储能设备', '监控中心']
    const test = []
          for (let i = 0; i < 5; i += 1) {
          test.push({
          x: equipments[i],
          y: Math.floor(Math.random() * 1000) + 200
  })
}
return builder(test)
}

const data31 = () => {
    const equipments = ['电热水器', '空调用水', '清洁用水']
    const test = []
          for (let i = 0; i < 5; i += 1) {
          test.push({
          x: equipments[i],
          y: Math.floor(Math.random() * 1000) + 200
  })
}
return builder(test)
}

const data4 = () => {
    const sourceData = [
        { item: '第一季度', count: 32.2 },
        { item: '第二季度', count: 21 },
        { item: '第三季度', count: 17 },
        { item: '第四季度', count: 13 }
      ]
      return builder(sourceData)
}
const data5 = (options) => {
  console.log(options)
  // console.log(options.body)
    const data = []
    for (let i = 0; i < 24; i += 1) {
             data.push({
             x: `${i }:00`,
             type: '实时负荷',
             y: Math.floor(Math.random() * 1000) + 1000
     })
     data.push({
             x: `${i }:00`,
             type: '预测负荷',
             y: Math.floor(Math.random() * 1000) + 1000
     })
   }
      return builder(data)
}
const data6 = () => {
    const pieData = [
        {
          type: '离线数量',
          value: 27
        },
        {
          type: '运行数量',
          value: 25
        },
        {
          type: '空闲数量',
          value: 18
        }
      ]
      return builder(pieData)
}
const data7 = () => {
    const barData = [
        { 地区: '办公室照明耗电', 耗电量: 321.52 },
        { 地区: '走廊照明耗电', 耗电量: 215.09 },
        { 地区: '电梯照明耗电', 耗电量: 201.41 },
        { 地区: '其他照明耗电', 耗电量: 153.46 }
      ]
      return builder(barData)
}
const data8 = () => {
    const data = []
 for (let i = 0; i < 24; i += 1) {
          data.push({
          x: `${i }:00`,
          type: '实时负荷',
          y: Math.floor(Math.random() * 1000) + 1000
  })
}
      return builder(data)
}
const data9 = () => {
    const piedata = [
        {
          type: '离线数量',
          value: 12
        },
        {
          type: '运行数量',
          value: 25
        },
        {
          type: '空闲数量',
          value: 18
        }
      ]
      return builder(piedata)
}

const data10 = () => {
  const data = []
  for (let i = 0; i < 24; i += 1) {
           data.push({
           x: `${i }:00`,
           type: '实时负荷',
           y: Math.floor(Math.random() * 1000) + 1000
   })
 }
    return builder(data)
}

const data11 = () => {
  const piedata = [
    {
      type: '离线数量',
      value: 12
    },
    {
      type: '运行数量',
      value: 25
    },
    {
      type: '空闲数量',
      value: 18
    }
  ]
    return builder(piedata)
}

const data12 = () => {
  const data = []
  for (let i = 0; i < 9; i += 1) {
    data.push({
       year: '周一',
type: (i + 1) + '楼',
value: Mock.mock('@integer(0, 15)')
    })
    data.push({
      year: '周二', type: (i + 1) + '楼', value: Mock.mock('@integer(0, 15)')
   })
   data.push({
    year: '周三', type: (i + 1) + '楼', value: Mock.mock('@integer(0, 15)')
 })
 data.push({
  year: '周四', type: (i + 1) + '楼', value: Mock.mock('@integer(0, 15)')
})
data.push({
  year: '周五', type: (i + 1) + '楼', value: Mock.mock('@integer(0, 15)')
})
data.push({
  year: '周六', type: (i + 1) + '楼', value: Mock.mock('@integer(0, 15)')
})
data.push({
  year: '周日', type: (i + 1) + '楼', value: Mock.mock('@integer(0, 15)')
})
  }
    return builder(data)
}

const data13 = () => {
  const piedata = [
    {
      type: '第一季度',
      value: Mock.mock('@integer(200, 300)')
    },
    {
      type: '第二季度',
      value: Mock.mock('@integer(200, 300)')
    },
    {
      type: '第三季度',
      value: Mock.mock('@integer(200, 300)')
    },
    {
      type: '第四季度',
      value: Mock.mock('@integer(200, 300)')
    }
  ]
    return builder(piedata)
}

const data14 = () => {
  const piedata = []
  for (let i = 0; i < 9; i++) {
    piedata.push({
      type: (i + 1) + '楼',
      value: Mock.mock('@integer(20, 30)')
    })
  }
    return builder(piedata)
}

const data15 = (options) => {
  const data = []
  console.log(options.body)
  const week = ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
if (options.body === 'week') {
  for (let i = 0; i < 7; i++) {
    data.push({
      date: week[i],
      value: Mock.mock('@integer(10, 30)')
      })
  }
} else {
  for (let i = 0; i < 30; i++) {
    data.push({
      date: '第' + i + '天',
      value: Mock.mock('@integer(10, 30)')
      })
  }
}
    return builder(data)
}

const data16 = () => {
  const data = [
    {
      type: '空调用水',
      value: Mock.mock('@integer(10, 30)')
    },
    {
      type: '其余用水',
      value: Mock.mock('@integer(80, 100)')
    }
  ]
    return builder(data)
}
Mock.mock(/\/dashboard\/energymonitoring/, 'get', data)
Mock.mock(/\/dashboard\/energy/, 'get', data2)
Mock.mock(/\/dashboard\/ener/, 'get', data3)
Mock.mock(/\/dashboard\/aner/, 'get', data31)
Mock.mock(/\/dashboard\/ene/, 'get', data4)
Mock.mock(/\/dashboard\/en/, 'get', data5)
Mock.mock(/\/dashboard\/e/, 'get', data6)
Mock.mock(/\/dashboard\/f/, 'get', data7)
Mock.mock(/\/dashboard\/g/, 'get', data8)
Mock.mock(/\/dashboard\/h/, 'get', data9)
Mock.mock(/\/dashboard\/i/, 'get', data10)
Mock.mock(/\/dashboard\/j/, 'get', data11)
Mock.mock(/\/dashboard\/k/, 'get', data12)
Mock.mock(/\/dashboard\/l/, 'get', data13)
Mock.mock(/\/dashboard\/m/, 'get', data14)
Mock.mock(/\/dashboard\/n/, 'get', data15)
Mock.mock(/\/dashboard\/o/, 'get', data16)
