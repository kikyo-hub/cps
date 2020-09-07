import Mock from 'mockjs2'
import { builder } from '../util'
var Random = Mock.Random

const data = () => {
  const goodsColumns = [
    {
        title: '资产编号',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '设备名称',
        dataIndex: 'name',
        key: 'name',
        align: 'center'
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        align: 'center'
      },
      {
        title: '型号',
        dataIndex: 'model',
        key: 'model',
        align: 'center'
      },
      {
        title: '通讯地址',
        dataIndex: 'address',
        key: 'address',
        align: 'center'
      },
      {
        title: '通讯规约',
        dataIndex: 'statute',
        key: 'statute',
        align: 'center'
      },
      {
        title: '所在楼层',
        dataIndex: 'floor',
        key: 'loor',
        align: 'center'
      },
      {
        title: '操作',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' },
        fixed: 'right',
        align: 'center',
        width: 150
      }
  ]
  return builder(goodsColumns)
}

const data1 = () => {
    const goodsColumns1 = [
        {
            title: '台区名称',
            dataIndex: 'id',
            key: 'id'
          },
          {
            title: '台区编号',
            dataIndex: 'type',
            key: 'type',
            align: 'center'
          },
          {
            title: '台区类别',
            dataIndex: 'categary',
            key: 'categary',
            align: 'center'
          },
          {
            title: 'GPS经度',
            dataIndex: 'model',
            key: 'model',
            align: 'center'
          },
          {
            title: 'GPS纬度',
            dataIndex: 'address',
            key: 'address',
            align: 'center'
          },
          {
            title: '运行容量',
            dataIndex: 'statute',
            key: 'statute',
            align: 'center'
          },
          {
            title: '安装地址',
            dataIndex: 'floor',
            key: 'floor',
            align: 'center'
          },
          {
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
            fixed: 'right',
            align: 'center',
            width: 150
          }
    ]
    return builder(goodsColumns1)
  }

const data2 = () => {
  const loadGoodsData1 = [
    {
        id: 'TQ1234561',
        type: '#台区1',
        model: '12421432143214321',
        address: '460001',
        statute: '1',
        floor: '1',
        categary: '公变'
      },
      {
        id: 'TQ1234562',
        type: '#台区2',
        model: '12421432143214322',
        address: '460002',
        statute: '2',
        floor: '2',
        categary: '专变'
      },
      {
        id: 'TQ1234563',
        type: '#台区3',
        model: '12421432143214323',
        address: '460003',
        statute: '4',
        floor: '3',
        categary: '公变'
      },
      {
        id: 'TQ1234564',
        type: '#台区4',
        model: '12421432143214324',
        address: '460004',
        statute: '3',
        floor: '4',
        categary: '专变'
      },
      {
        id: 'TQ1234565',
        type: '#台区5',
        model: '12421432143214324',
        address: '460004',
        statute: '3',
        floor: '4',
        categary: '公变'
      }
  ]
  return builder(loadGoodsData1)
}

const data3 = () => {
  const loadGoodsData2 = [
    {
        id: 'JZQ1234561',
        name: '集中器',
        type: '全载',
        model: '12421432143214321',
        address: '460001',
        statute: '1',
        floor: '1'
      },
      {
        id: 'JZQ1234562',
        name: '集中器',
        type: '半载',
        model: '12421432143214322',
        address: '460002',
        statute: '2',
        floor: '2'
      },
      {
        id: 'JZQ1234563',
        name: '集中器',
        type: '半载',
        model: '12421432143214323',
        address: '460003',
        statute: '4',
        floor: '3'
      },
      {
        id: 'JZQ1234564',
        name: '集中器',
        type: '全载',
        model: '12421432143214324',
        address: '460004',
        statute: '3',
        floor: '4'
      }
  ]
  return builder(loadGoodsData2)
}

const data4 = () => {
  const loadGoodsData3 = [
    {
        id: 'CJQ1234561',
        name: '采集器',
        type: '总采',
        model: '12421432143214321',
        address: '4612001',
        statute: '1',
        floor: '2.00'
      },
      {
        id: 'CJQ1234562',
        name: '采集器',
        type: '分采',
        model: '12421432143214322',
        address: '4612002',
        statute: '2',
        floor: '6.00'
      },
      {
        id: 'CJQ1234563',
        name: '采集器',
        type: '总采',
        model: '12421432143214323',
        address: '4612003',
        statute: '4',
        floor: '28.00'
      },
      {
        id: 'CJQ1234564',
        name: '采集器',
        type: '分采',
        model: '12421432143214324',
        address: '4612004',
        statute: Random.float(),
        floor: '25.50'
      }
  ]
  return builder(loadGoodsData3)
}

const data5 = () => {
  const loadGoodsData4 = [
    {
        id: 'XYZHQ1234561',
        name: '协议转换器',
        type: '分表',
        model: '12421432143214321',
        address: '2.00',
        statute: '1',
        floor: '2.00'
      },
      {
        id: 'XYZHQ1234562',
        name: '协议转换器',
        type: '总表',
        model: '12421432143214322',
        address: '3.00',
        statute: '2',
        floor: '6.00'
      },
      {
        id: 'XYZHQ1234563',
        name: '协议转换器',
        type: '分表',
        model: '12421432143214323',
        address: '7.00',
        statute: '4',
        floor: '28.00'
      },
      {
        id: 'XYZHQ1234564',
        name: '协议转换器',
        type: '总表',
        model: '12421432143214324',
        address: '8.50',
        statute: '3',
        floor: '25.50'
      }
  ]
  return builder(loadGoodsData4)
}

const data6 = () => {
    const loadGoodsData5 = [
        {
            id: 'NYKZQ1234561',
            name: '能源控制器',
            type: '分表',
            model: '12421432143214321',
            address: '2.00',
            statute: '1',
            floor: '2.00'
          },
          {
            id: 'NYKZQ1234562',
            name: '能源控制器',
            type: '分表',
            model: '12421432143214322',
            address: '3.00',
            statute: '2',
            floor: '6.00'
          },
          {
            id: 'NYKZQ1234563',
            name: '能源控制器',
            type: '总表',
            model: '12421432143214323',
            address: '7.00',
            statute: '4',
            floor: '28.00'
          },
          {
            id: 'NYKZQ1234564',
            name: '能源控制器',
            type: '分表',
            model: '12421432143214324',
            address: '8.50',
            statute: '3',
            floor: '25.50'
          }
    ]
    return builder(loadGoodsData5)
  }

  const data7 = () => {
    const loadGoodsData6 = [
        {
            id: 'CGSB1234561',
            name: '传感设备',
            type: '温度传感',
            model: '12421432143214321',
            address: '2.00',
            statute: '1',
            floor: '2.00'
          },
          {
            id: 'CGSB1234562',
            name: '传感设备',
            type: '湿度传感',
            model: '12421432143214322',
            address: '3.00',
            statute: '2',
            floor: '6.00'
          },
          {
            id: 'CGSB1234563',
            name: '传感设备',
            type: '湿度传感',
            model: '12421432143214323',
            address: '7.00',
            statute: '4',
            floor: '28.00'
          },
          {
            id: 'CGSB1234564',
            name: '传感设备',
            type: '温度传感',
            model: '12421432143214324',
            address: '8.50',
            statute: '3',
            floor: '25.50'
          }
    ]
    return builder(loadGoodsData6)
  }

Mock.mock(/\/archives\/a1/, 'get', data)
Mock.mock(/\/archives\/b1/, 'get', data1)
Mock.mock(/\/archives\/c1/, 'get', data2)
Mock.mock(/\/archives\/d1/, 'get', data3)
Mock.mock(/\/archives\/e1/, 'get', data4)
Mock.mock(/\/archives\/f1/, 'get', data5)
Mock.mock(/\/archives\/g1/, 'get', data6)
Mock.mock(/\/archives\/h1/, 'get', data7)
