import Mock from 'mockjs2'
import { builder } from '../util'

//
const userInfo = () => {
    return builder({ 'buildNum': '666', 'userNum': '777', 'equip': '888' })
}
const userEng = () => {
    return builder({ 'ele': '5764.33', 'water': '446.99', 'gas': '345.90', 'heat': '775.90' })
}
const weather = () => {
    var myDate = new Date()
    myDate.getMonth()
    myDate.getDate()
    return builder({ 'wendu': '9', 'riqi': (myDate.getMonth() + 1) + '月' + myDate.getDate() + '日', 'jiangshui': '30', 'shidu': '20', 'fengli': '2', 'fuzhao': '16' })
}
const qushiLineChart = () => {
    return builder([
        { month: '一月', 电能: 7.0, 水能: 3.9, 热能: 1 },
        { month: '二月', 电能: 6.9, 水能: 4.2, 热能: 2 },
        { month: '三月', 电能: 9.5, 水能: 5.7, 热能: 2.5 },
        { month: '四月', 电能: 14.5, 水能: 8.5, 热能: 3 },
        { month: '五月', 电能: 18.4, 水能: 11.9, 热能: 4 },
        { month: '六月', 电能: 21.5, 水能: 15.2, 热能: 5 },
        { month: '七月', 电能: 25.2, 水能: 17.0, 热能: 4.5 },
        { month: '八月', 电能: 26.5, 水能: 16.6, 热能: 4 },
        { month: '九月', 电能: 23.3, 水能: 14.2, 热能: 3.5 },
        { month: '十月', 电能: 18.3, 水能: 10.3, 热能: 2 },
        { month: '十一月', 电能: 13.9, 水能: 6.6, 热能: 1.5 },
        { month: '十二月', 电能: 9.6, 水能: 4.8, 热能: 1 }
      ])
}
const xianzhuangLineChart = () => {
    return builder([
        { name: '电能', '一季度': 18.9, '二季度': 28.8, '三季度': 39.3, '四季度': 81.4 },
        { name: '水能', '一季度': 12.4, '二季度': 23.2, '三季度': 34.5, '四季度': 99.7 },
        { name: '热能', '一季度': 12.4, '二季度': 23.2, '三季度': 34.5, '四季度': 99.7 }
      ])
}
const biliPieChart = () => {
    return builder([
        { item: '电能', count: 32.2 },
        { item: '水能', count: 21 },
        { item: '热能', count: 17 }
      ])
}
const engInfo = () => {
    var barData = []
    var barData2 = []
    var rankList = []
    for (let i = 0; i < 12; i += 1) {
        barData.push({
            x: `${i + 1}月`,
            y: Math.floor(Math.random() * 1000) + 200
        })
        barData2.push({
            x: `${i + 1}月`,
            y: Math.floor(Math.random() * 1000) + 200
        })
    }
    for (let i = 0; i < 7; i++) {
        rankList.push({
            name: '某某 ' + (i + 1) + ' 号楼',
            total: 1234.56 - i * 100
        })
    }
    return builder({ 'barData': barData, 'barData2': barData2, 'rankList': rankList })
}

Mock.mock(/\/energy\/analysis\/userinfo/, 'get', userInfo)
Mock.mock(/\/energy\/analysis\/userEng/, 'get', userEng)
Mock.mock(/\/energy\/analysis\/weather/, 'get', weather)
Mock.mock(/\/energy\/analysis\/qushiLineChart/, 'get', qushiLineChart)
Mock.mock(/\/energy\/analysis\/xianzhuangLineChart/, 'get', xianzhuangLineChart)
Mock.mock(/\/energy\/analysis\/biliPieChart/, 'get', biliPieChart)
Mock.mock(/\/energy\/analysis\/engInfo/, 'get', engInfo)
