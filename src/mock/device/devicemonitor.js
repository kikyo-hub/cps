import Mock from 'mockjs2'
import { builder } from '../util'

const data = (options) => {
    console.log(options)
    console.log(options.body)
      const data = []
      for (let i = 0; i < 24; i += 1) {
               data.push({
               x: `${i }:00`,
               type: '实时负荷',
               y: Math.floor(Math.random() * 1000) + 1000
       })
       data.push({
               x: `${i }:00`,
               type: '餐厅用水负荷',
               y: Math.floor(Math.random() * 1000) + 1000
       })
       data.push({
        x: `${i }:00`,
        type: '卫生间用水负荷',
        y: Math.floor(Math.random() * 1000) + 1000
})
     }
        return builder(data)
  }

  const data1 = () => {
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

Mock.mock(/\/devicemonitor\/a/, 'get', data)
Mock.mock(/\/devicemonitor\/b/, 'get', data1)
