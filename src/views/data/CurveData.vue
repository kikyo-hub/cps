<template>
  <a-card :bordered="false">
    <a-row :gutter="8">
      <a-col :span="4">
        <s-tree
          :dataSource="orgTree"
          :openKeys.sync="openKeys"
          :search="false"
          @click="handleClick"
          @titleClick="handleTitleClick"
          style="min-height:666px;max-height:666px;overflowY:scroll;"></s-tree>
      </a-col>
      <a-col :span="20">
        <a-row>
          <a-col :span="24">
            <a-card :bordered="false" title="监测点日曲线" :style="{ marginBottom: '24px' }">
              <span slot="extra"><a-form layout="inline">
                <a-form-item label="选择日期">
                  <a-date-picker style="width: 80%" placeholder="请选择日期" @change="onChange2" :default-value="date" :format="dateFormat"/>
                </a-form-item>
                <a-form-item><a-button type="primary" @click="query()">查询</a-button></a-form-item>
              </a-form>
              </span>
              <a-tabs type="card" @change="callback" v-model="activeKey">
                <a-tab-pane key="voltage" tab="电压" v-if="a">
                  <div id="voltage"></div>
                </a-tab-pane>
                <a-tab-pane key="current" tab="电流" v-if="b">
                  <div id="current"></div>
                </a-tab-pane>
                <a-tab-pane key="power" tab="功率" v-if="c">
                  <div id="power"></div>
                </a-tab-pane>
                <a-tab-pane key="papr" tab="用电量" v-if="c">
                  <div id="papr"></div>
                </a-tab-pane>
                <a-tab-pane key="temperature" tab="温度" v-if="d">
                  <div id="temperature"></div>
                </a-tab-pane>
                <a-tab-pane key="humidity" tab="湿度" v-if="e">
                  <div id="humidity"></div>
                </a-tab-pane>
                <a-tab-pane key="co2" tab="CO2浓度" v-if="f">
                  <div id="co2"></div>
                </a-tab-pane>
                <a-tab-pane key="illuminance" tab="光照强度" v-if="g">
                  <div id="illuminance"></div>
                </a-tab-pane>
              </a-tabs>
              <!-- g2plot共用一个图表 -->
              <div id="test"></div>
            </a-card>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <a-table :columns="columns" :data-source="data" :pagination="false" rowKey="equipId">
              <a slot="equipName" slot-scope="text">
                <router-link :to="{ name: 'monitor_equip' }">{{ text }}</router-link>
              </a>
            </a-table>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import STree from '@/components/Tree/Tree'
import moment from 'moment'
import { getOrgTree, getLineData, gettableData, getColumnData1 } from '@/api/data/humidity'
import { Line, Column } from '@antv/g2plot'
var linePlot
var columnPlot
const columns = [
    {
      title: '监测设备名称',
      dataIndex: 'equipName',
      key: 'equipName',
      scopedSlots: { customRender: 'equipName' }
    },
    {
      title: '通信地址',
      dataIndex: 'commAddress',
      key: 'commAddress'
    },
    {
      title: '设备类型',
      dataIndex: 'equipType',
      key: 'equipType'
    },
    {
      title: '通信方式',
      dataIndex: 'commMode',
      key: 'commMode'
    },
    {
      title: '规约类型',
      dataIndex: 'protocolType',
      key: 'protocolType'
    },
    {
      title: '设备型号',
      dataIndex: 'equipMode',
      key: 'equipMode'
    },
    {
      title: '上级设备',
      dataIndex: 'upEquipId',
      key: 'upEquipId'
    }
  ]
const columns1 = [
    {
      title: '点位名称',
      dataIndex: 'name',
      key: 'name'
    }
  ]
const plainOptions = ['电压', '电流', '功率', '温度', '湿度', 'CO2', '光照度']
const option = [
  { key: 'voltage', name: '电压' },
  { key: 'current', name: '电流' },
  { key: 'power', name: '功率' },
  { key: 'temperature', name: '温度' },
  { key: 'humidity', name: '湿度' },
  { key: 'co2', name: 'CO2浓度' },
  { key: 'illuminance', name: '光照强度' }
]
export default {
  name: 'TreeList',
  components: {
    STree
  },
  data () {
    return {
      date: null,
      dateFormat: 'YYYY/MM/DD',
      openKeys: ['key-01'],
      diagnosispoint: '监测点',
      visible: false,
      dateString: null,
      treekey: '',
      orgTree: [],
      columns,
      data: [],
      data1: [],
      data4: [],
      nowtime: '',
      // 监测点所有设备数据
      alldata: [],
      // 当天曲线数据
      curvedata: [],
      columns1,
      plainOptions,
      plainOptionsoperation: ['电压'],
      // plainOptionsoperation: ['电压', '电流', '功率', '温度', '湿度', 'CO2', '光照度'],
      selectedRowKeys: ['A相电压'],
      // selectedRowKeys: ['A相电压', 'B相电压', 'C相电压', 'A相电流', 'B相电流', 'C相电流', '功率', '温度', '湿度', 'CO2', '光照度'],
      selectedRowKeys1: [],
      // selectedRowKeys: [],
      // selectedRows: []
      voltage: [],
      current: [],
      power: [],
      temperature: [],
      humidity: [],
      co2: [],
      illuminance: [],
      papr: [],
      choice: 'voltage',
      activeKey: 'voltage',
      option,

      a: true,
      b: true,
      c: true,
      d: true,
      e: true,
      f: true,
      g: true
    }
  },
  created () {
    this.getTime()
    getOrgTree().then(res => {
      // console.log('OrgTree', res)
      this.treekey = res[0].monitorId
      this.alldata = res
      // this.line()
      // this.donut()
      this.linetest()
      // console.log('equip', res[0].equip)
      // var data3 = this.tabledataprocessing(res[0].equip)
      // this.data = data3
      const data1 = []
      const data = []
      data1.push({ 'key': 'key-01',
          'title': '监测点',
          'icon': null,
          'children': [] })
      for (let i = 0; i < res.length; i++) {
        data.push({
          'key': 'key-01-' + res[i].monitorId,
          'title': res[i].monitorName,
          'icon': 'cluster',
          'id': res[i].monitorId,
          'group': true
        })
      }
      data1[0].children = data
      this.orgTree = data1
      // 表格
      var data3 = this.tabledataprocessing(res[0].equip)
      this.data = data3
    })
  },
  mounted () {
  },
  methods: {
    getTime () {
        // new Date() new一个data对象，当前日期和时间
        // toLocaleString() 方法可根据本地时间把 Date 对象转换为字符串，并返回结果。
        this.nowtime = new Date().toLocaleString()
       this.date = moment(this.nowtime, 'YYYY/MM/DD')
      },
    callback (key) {
      // console.log('key', key, this[key])
      this.choice = key
      var a = key
      if (a === 'voltage') {
    linePlot.updateConfig({
    yAxis: {
    min: 200
    // tickInterval: 10
  },
    data: this[a],
    meta: {
    value: {
      formatter: (v) => { return `${v}V` }
    }
  },
  interactions: [
        {
          type: 'slider',
          cfg: {
            start: 0,
            end: 1
          }
        }
      ],
      smooth: true
})
linePlot.render()
  } else if (a === 'current') {
    // console.log('222222', a, this[a])
    linePlot.updateConfig({
    yAxis: {
    min: 0
    // tickInterval: 10
  },
    data: this[a],
    meta: {
    value: {
      formatter: (v) => { return `${v}A` }
    }
  },
  interactions: [
        {
          type: 'slider',
          cfg: {
            start: 0,
            end: 1
          }
        }
      ],
      smooth: true
})
linePlot.render()
  } else if (a === 'power') {
    // console.log('222222', a, this[a])
    linePlot.updateConfig({
    yAxis: {
    min: 0
    // max: 515,
    // tickInterval: 5000
  },
    data: this[a],
    meta: {
    value: {
      formatter: (v) => { return `${v}W` }
    }
  },
  interactions: [
        {
          type: 'slider',
          cfg: {
            start: 0,
            end: 1
          }
        }
      ],
      smooth: true
})
linePlot.render()
  } else if (a === 'papr') {
    // console.log('222222', a, this[a])
    linePlot.updateConfig({
    yAxis: {
    min: 0
    // max: 5,
    // tickInterval: 5
  },
    data: this[a],
    meta: {
    value: {
      formatter: (v) => { return `${v}kW·h` }
    }
  },
  interactions: [
        {
          type: 'slider',
          cfg: {
            start: 0,
            end: 1
          }
        }
      ],
      smooth: true
})
linePlot.render()
  } else if (a === 'temperature') {
    // console.log('222222', a, this[a])
    linePlot.updateConfig({
    yAxis: {
    min: 0
    // max: 40,
    // tickInterval: 10
  },
    data: this[a],
    meta: {
    value: {
      formatter: (v) => { return `${v}℃` }
    }
  },
  interactions: [
        {
          type: 'slider',
          cfg: {
            start: 0,
            end: 1
          }
        }
      ],
      smooth: true
})
linePlot.render()
  } else if (a === 'humidity') {
    // console.log('222222', a, this[a])
    linePlot.updateConfig({
    yAxis: {
    min: 0
    // max: 100,
    // tickInterval: 20
  },
    data: this[a],
    meta: {
    value: {
      formatter: (v) => { return `${v}%rh` }
    }
  },
  interactions: [
        {
          type: 'slider',
          cfg: {
            start: 0,
            end: 1
          }
        }
      ],
      smooth: true
})
linePlot.render()
  } else if (a === 'co2') {
    // console.log('222222', a, this[a])
    linePlot.updateConfig({
    yAxis: {
    min: 300
    // max: 800,
    // tickInterval: 100
  },
    data: this[a],
    meta: {
    value: {
      formatter: (v) => { return `${v}ppm` }
    }
  },
  interactions: [
        {
          type: 'slider',
          cfg: {
            start: 0,
            end: 1
          }
        }
      ],
      smooth: true
})
linePlot.render()
  } else {
    // console.log('222222', a, this[a])
    linePlot.updateConfig({
    yAxis: {
    min: 0
    // max: 250000,
    // tickInterval: 50000
  },
    data: this[a],
    meta: {
    value: {
      formatter: (v) => { return `${v}Lx` }
    }
  },
  interactions: [
        {
          type: 'slider',
          cfg: {
            start: 0,
            end: 1
          }
        }
      ],
      smooth: true
})
linePlot.render()
  }
//       linePlot.updateConfig({
//     yAxis: {
//     min: 500000000
//   },
//     data: this[key],
//   interactions: [
//         {
//           type: 'slider',
//           cfg: {
//             start: 0,
//             end: 1
//           }
//         }
//       ],
//       smooth: true
// })
// linePlot.render()
    },
    linetest () {
      this.dateString = this.date.format('YYYY-MM-DD')
          // console.log('line', this.treekey)
getLineData(this.treekey, this.dateString).then(response => {
  this.curvedata = response
  this.judge2(this.treekey)
    //   setTimeout(() => {
    // }, 1000)
  // this.visiblejudge(response)
  // this.judge(this.treekey)
  var data = []
  var data2 = []
  var data3 = []
  var data4 = []
  var data5 = []
  var data6 = []
  var data7 = []
  var data8 = []
  for (let i = 0; i < response.length; i++) {
    data.push({
            time: response[i].dataTime.substring(11, 16), type: 'A相电压', value: parseFloat(response[i].ua)
        },
        {
            time: response[i].dataTime.substring(11, 16), type: 'B相电压', value: parseFloat(response[i].ub)
        },
        {
            time: response[i].dataTime.substring(11, 16), type: 'C相电压', value: parseFloat(response[i].uc)
        })
  }
  for (let i = 0; i < response.length; i++) {
    data2.push({
            time: response[i].dataTime.substring(11, 16), type: 'A相电流', value: parseFloat(response[i].ia)
        },
        {
            time: response[i].dataTime.substring(11, 16), type: 'B相电流', value: parseFloat(response[i].ib)
        },
        {
            time: response[i].dataTime.substring(11, 16), type: 'C相电流', value: parseFloat(response[i].ic)
        })
  }
  for (let i = 0; i < response.length; i++) {
    data3.push({
            time: response[i].dataTime.substring(11, 16), type: '有功功率', value: parseFloat(response[i].p)
        },
        {
            time: response[i].dataTime.substring(11, 16), type: 'A相有功功率', value: parseFloat(response[i].pa)
        },
        {
            time: response[i].dataTime.substring(11, 16), type: 'B相有功功率', value: parseFloat(response[i].pb)
        },
        {
            time: response[i].dataTime.substring(11, 16), type: 'C相有功功率', value: parseFloat(response[i].pc)
        })
  }
  for (let i = 0; i < response.length; i++) {
    data8.push({
            time: response[i].dataTime.substring(11, 16), type: '用电量', value: parseFloat(response[i].papR)
        })
  }
  for (let i = 0; i < response.length; i++) {
    data4.push({
            time: response[i].dataTime.substring(11, 16), type: '温度', value: parseFloat(response[i].temperature)
        })
  }
  for (let i = 0; i < response.length; i++) {
    data5.push({
            time: response[i].dataTime.substring(11, 16), type: '湿度', value: parseFloat(response[i].humidity)
        })
  }
  for (let i = 0; i < response.length; i++) {
    data6.push({
            time: response[i].dataTime.substring(11, 16), type: 'CO2浓度', value: parseFloat(response[i].co2)
        })
  }
  for (let i = 0; i < response.length; i++) {
    data7.push({
            time: response[i].dataTime.substring(11, 16), type: '光照强度', value: parseFloat(response[i].illuminance)
        })
  }
  // console.log(data4)
  // console.log(data, data2, data3, data4, data5, data6, data7)
  this.voltage = data
  this.current = data2
  this.power = data3
  this.temperature = data4
  this.humidity = data5
  this.co2 = data6
  this.illuminance = data7
  this.papr = data8
   linePlot = new Line('test', {
  description: {
    visible: true,
    text: '日曲线变化图'
  },
  padding: 'auto',
  forceFit: true,
  data: data,
    meta: {
    value: {
      formatter: (v) => { return `${v}V` }
    }
  },
  xField: 'time',
  yField: 'value',
  yAxis: {
    min: 200
  },
  // yAxis: {
  //   min: 220,
  //   max: 250,
  //   tickInterval: 10
  // },
  seriesField: 'type',
  interactions: [
        {
          type: 'slider',
          cfg: {
            start: 0,
            end: 1
          }
        }
      ],
      smooth: true
})
linePlot.render()
})
    },
    dataprocessing () {
      getLineData(this.treekey, this.dateString).then(response => {
        if (response.length === 0) {
          this.$notification['warning']({
        message: '通知',
        description:
          '暂无数据！',
          duration: 1.5
      })
      linePlot.updateConfig({
    yAxis: {
  },
    data: [],
  interactions: [
        {
          type: 'slider',
          cfg: {
            start: 0,
            end: 1
          }
        }
      ],
      smooth: true
})

linePlot.render()
  this.voltage = []
  this.current = []
  this.power = []
  this.temperature = []
  this.humidity = []
  this.co2 = []
  this.illuminance = []
  this.papr = []
        } else {
  this.curvedata = response
  var data = []
  var data2 = []
  var data3 = []
  var data4 = []
  var data5 = []
  var data6 = []
  var data7 = []
  var data8 = []
  for (let i = 0; i < response.length; i++) {
    data.push({
            time: response[i].dataTime.substring(11, 16), type: 'A相电压', value: parseFloat(response[i].ua)
        },
        {
            time: response[i].dataTime.substring(11, 16), type: 'B相电压', value: parseFloat(response[i].ub)
        },
        {
            time: response[i].dataTime.substring(11, 16), type: 'C相电压', value: parseFloat(response[i].uc)
        })
  }
  for (let i = 0; i < response.length; i++) {
    data2.push({
            time: response[i].dataTime.substring(11, 16), type: 'A相电流', value: parseFloat(response[i].ia)
        },
        {
            time: response[i].dataTime.substring(11, 16), type: 'B相电流', value: parseFloat(response[i].ib)
        },
        {
            time: response[i].dataTime.substring(11, 16), type: 'C相电流', value: parseFloat(response[i].ic)
        })
  }
  for (let i = 0; i < response.length; i++) {
    data3.push({
            time: response[i].dataTime.substring(11, 16), type: '有功功率', value: parseFloat(response[i].p)
        },
        {
            time: response[i].dataTime.substring(11, 16), type: 'A相有功功率', value: parseFloat(response[i].pa)
        },
        {
            time: response[i].dataTime.substring(11, 16), type: 'B相有功功率', value: parseFloat(response[i].pb)
        },
        {
            time: response[i].dataTime.substring(11, 16), type: 'C相有功功率', value: parseFloat(response[i].pc)
        })
  }
  for (let i = 0; i < response.length; i++) {
    data8.push({
            time: response[i].dataTime.substring(11, 16), type: '用电量', value: parseFloat(response[i].papR)
        })
  }
  // var data41 = 100000000000
  for (let i = 0; i < response.length; i++) {
    data4.push({
            time: response[i].dataTime.substring(11, 16), type: '温度', value: parseFloat(response[i].temperature)
        })
        // if (data41 > parseFloat(response[i].temperature)) {
        //   data41 = parseFloat(response[i].temperature)
        // }
  }
  // console.log('data41', data41)
  for (let i = 0; i < response.length; i++) {
    data5.push({
            time: response[i].dataTime.substring(11, 16), type: '湿度', value: parseFloat(response[i].humidity)
        })
  }
  for (let i = 0; i < response.length; i++) {
    data6.push({
            time: response[i].dataTime.substring(11, 16), type: 'CO2浓度', value: parseFloat(response[i].co2)
        })
  }
  for (let i = 0; i < response.length; i++) {
    data7.push({
            time: response[i].dataTime.substring(11, 16), type: '光照强度', value: parseFloat(response[i].illuminance)
        })
  }
  this.voltage = data
  this.current = data2
  this.power = data3
  this.temperature = data4
  this.humidity = data5
  this.co2 = data6
  this.illuminance = data7
  this.papr = data8
  var a = this.choice
  console.log('选项表格数据', a, this[a])
  if (a === 'voltage') {
    // console.log('1111111', this[a])
    linePlot.updateConfig({
    yAxis: {
    min: 200
    // tickInterval: 10
  },
    data: this[a],
    meta: {
    value: {
      formatter: (v) => { return `${v}V` }
    }
  },
  interactions: [
        {
          type: 'slider',
          cfg: {
            start: 0,
            end: 1
          }
        }
      ],
      smooth: true
})
linePlot.render()
  } else if (a === 'current') {
    // console.log('222222', a, this[a])
    linePlot.updateConfig({
    yAxis: {
    min: 0
    // max: 3,
    // tickInterval: 10
  },
    data: this[a],
    meta: {
    value: {
      formatter: (v) => { return `${v}A` }
    }
  },
  interactions: [
        {
          type: 'slider',
          cfg: {
            start: 0,
            end: 1
          }
        }
      ],
      smooth: true
})
linePlot.render()
  } else if (a === 'power') {
    // console.log('222222', a, this[a])
    linePlot.updateConfig({
    yAxis: {
    min: 0
    // max: 515,
    // tickInterval: 5000
  },
    data: this[a],
    meta: {
    value: {
      formatter: (v) => { return `${v}W` }
    }
  },
  interactions: [
        {
          type: 'slider',
          cfg: {
            start: 0,
            end: 1
          }
        }
      ],
      smooth: true
})
linePlot.render()
  } else if (a === 'papr') {
    // console.log('222222', a, this[a])
    linePlot.updateConfig({
    yAxis: {
    min: 0
    // max: 5,
    // tickInterval: 5
  },
    data: this[a],
    meta: {
    value: {
      formatter: (v) => { return `${v}kW·h` }
    }
  },
  interactions: [
        {
          type: 'slider',
          cfg: {
            start: 0,
            end: 1
          }
        }
      ],
      smooth: true
})
linePlot.render()
  } else if (a === 'temperature') {
    // console.log('222222', a, this[a])
    linePlot.updateConfig({
    yAxis: {
    min: 0
    // max: 40,
    // tickInterval: 10
  },
    data: this[a],
    meta: {
    value: {
      formatter: (v) => { return `${v}℃` }
    }
  },
  interactions: [
        {
          type: 'slider',
          cfg: {
            start: 0,
            end: 1
          }
        }
      ],
      smooth: true
})
linePlot.render()
  } else if (a === 'humidity') {
    // console.log('222222', a, this[a])
    linePlot.updateConfig({
    yAxis: {
    min: 0
    // max: 100,
    // tickInterval: 10
  },
    data: this[a],
    meta: {
    value: {
      formatter: (v) => { return `${v}%rh` }
    }
  },
  interactions: [
        {
          type: 'slider',
          cfg: {
            start: 0,
            end: 1
          }
        }
      ],
      smooth: true
})
linePlot.render()
  } else if (a === 'co2') {
    // console.log('222222', a, this[a])
    linePlot.updateConfig({
    yAxis: {
    min: 300
    // max: 800,
    // tickInterval: 100
  },
    data: this[a],
    meta: {
    value: {
      formatter: (v) => { return `${v}ppm` }
    }
  },
  interactions: [
        {
          type: 'slider',
          cfg: {
            start: 0,
            end: 1
          }
        }
      ],
      smooth: true
})
linePlot.render()
  } else if (a === 'illuminance') {
    // console.log('222222', a, this[a])
    linePlot.updateConfig({
    yAxis: {
    min: 0
    // max: 250000,
    // tickInterval: 50000
  },
    data: this[a],
    meta: {
    value: {
      formatter: (v) => { return `${v}Lx` }
    }
  },
  interactions: [
        {
          type: 'slider',
          cfg: {
            start: 0,
            end: 1
          }
        }
      ],
      smooth: true
})
linePlot.render()
  }

//   linePlot.updateConfig({
//     yAxis: {
//     min: 500000000
//   },
//     data: this[a],
//   interactions: [
//         {
//           type: 'slider',
//           cfg: {
//             start: 0,
//             end: 1
//           }
//         }
//       ],
//       smooth: true
// })

// linePlot.render()
        }
      })
    },
    tabledataprocessing (tabledata) {
      const data = []
      switch (parseInt(tabledata.equipType)) {
    case 1:
        tabledata.equipType = '能源路由器'
        break
    case 2:
        tabledata.equipType = '能源控制器'
         break
    case 3:
        tabledata.equipType = '单相电能表'
         break
    case 4:
        tabledata.equipType = '三相电能表'
         break
    case 5:
        tabledata.equipType = '分支检测装置'
         break
    case 21:
        tabledata.equipType = '红外人体感应'
         break
    case 22:
        tabledata.equipType = '二氧化碳浓度感应'
        break
        case 23:
        tabledata.equipType = '温湿度感应'
        break
}
switch (parseInt(tabledata.commMode)) {
    case 1:
        tabledata.commMode = 'RS485'
        break
    case 2:
        tabledata.commMode = '红外'
         break
    case 3:
        tabledata.commMode = '网络'
         break
    case 4:
        tabledata.commMode = 'MBUS'
         break
}
switch (parseInt(tabledata.protocolType)) {
    case 1:
        tabledata.protocolType = '698协议'
        break
    case 2:
        tabledata.protocolType = '376.1协议'
         break
    case 3:
        tabledata.protocolType = '645-07协议'
         break
    case 4:
        tabledata.protocolType = '645-97协议'
         break
          case 5:
        tabledata.protocolType = 'CJ188协议'
         break
}
      // console.log(data)
      data.push(tabledata)
      return data
    },
    judge2 (id) {
      getOrgTree(id).then(res => {
        // console.log('judge', res[0].deviceType)
        switch (parseInt(res[0].deviceType)) {
          case 1:
          case 2:
          case 3:
            case 4:
            this.a = this.b = this.c = true
            this.choice = 'voltage'
            this.activeKey = 'voltage'
            // this.choice = 'temperature'
            this.d = this.e = this.f = this.g = false
            break
            case 5:
              this.a = this.b = this.c = false
              this.choice = 'temperature'
              this.activeKey = 'temperature'
              this.d = this.e = this.f = this.g = true
              break
        }
        console.log('this.choice', this.choice)
      })
    },
    judge (id) {
      getOrgTree(id).then(res => {
        // console.log('judge', res[0].deviceType)
        switch (parseInt(res[0].deviceType)) {
          case 1:
          case 2:
          case 3:
            case 4:
            this.a = this.b = this.c = true
            this.choice = 'voltage'
            this.activeKey = 'voltage'
            this.d = this.e = this.f = this.g = false
            break
            case 5:
              this.a = this.b = this.c = false
              this.choice = 'temperature'
              this.activeKey = 'temperature'
              this.d = this.e = this.f = this.g = true
              break
        }
        console.log('this.choice', this.choice)
      this.dataprocessing()
      })
    },
    handleClick (e) {
      console.log('handleClick', e)
      this.treekey = e.key.substring(7)
      this.judge(this.treekey)
      // this.dataprocessing()
      gettableData(this.treekey).then(res => {
        // console.log('equip', res)
        this.data = this.tabledataprocessing(res)
  })
      // this.judge(this.treekey)
    },
    handleTitleClick (item) {
      // console.log('handleTitleClick', item)
    },
    onChange (checked) {
      this.visible = checked
    },
    // 日期选择
    onChange2 (date, dateString) {
      this.dateString = dateString
    },
    query () {
      this.dataprocessing()
      gettableData(this.treekey).then(res => {
        this.data = this.tabledataprocessing(res)
  })
  // getColumnData1(this.treekey, this.dateString).then(response => {
  //   // console.log('图表数据', this.treekey, this.dateString, response)
  // var data = []
  // for (let i = 0; i < response.length; i++) {
  //       data.push({
  //           date: response[i].dataTime.substring(5, 10), 日正向有功总能示值: response[i].papR
  //       })
  //   }
  // columnPlot.changeData(data)
  //     })
    },
donut () {
      this.dateString = this.date.format('YYYY-MM-DD')
getColumnData1(this.treekey, this.dateString).then(response => {
  var data = []
  for (let i = 0; i < response.length; i++) {
        data.push({
            date: response[i].dataTime.substring(5, 10), 日正向有功总能示值: response[i].papR
        })
    }
    // console.log('日正向有功总能示值', data)
  columnPlot = new Column('donut', {
  description: {
    visible: true,
    text: '监测点用电量周数据'
  },
  xAxis: {
    title: {
      visible: false
    }
  },
  yAxis: {
    title: {
      visible: false
    }
  },
  forceFit: true,
  padding: 'auto',
  data,
  xField: 'date',
  yField: '日正向有功总能示值'
})

columnPlot.render()
})
    }
  }
}
</script>

<style lang="less" >

</style>
