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
            <a-card :bordered="false" title="诊断点日曲线" :style="{ marginBottom: '24px' }">
              <span slot="extra"><a-form layout="inline">
                <!-- <a-checkbox-group :options="plainOptions" :default-value="['电压']" @change="onChange1" style="margin-top:10px"/> -->
                <a-form-item label="选择日期">
                  <a-date-picker style="width: 80%" placeholder="请选择日期" @change="onChange2" :default-value="date" :format="dateFormat"/>
                </a-form-item>
                <a-form-item><a-button type="primary" @click="query()">查询</a-button></a-form-item>
              </a-form>
              </span>
              <a-tabs type="card" @change="callback" v-model="activeKey">
                <a-tab-pane key="voltage" tab="电压">
                  <div id="voltage"></div>
                </a-tab-pane>
                <a-tab-pane key="current" tab="电流">
                  <div id="current"></div>
                </a-tab-pane>
                <a-tab-pane key="power" tab="功率">
                  <div id="power"></div>
                </a-tab-pane>
                <a-tab-pane key="papr" tab="用电量">
                  <div id="papr"></div>
                </a-tab-pane>
              </a-tabs>
              <div id="line"></div>
            </a-card>
          </a-col>
          <!-- <a-col :span="4">
            <a-table
              :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
              :columns="columns"
              :data-source="data1"
              size="small"
              :pagination="false"
              style="margin-top:35%"
            ></a-table>
          </a-col> -->
        </a-row>
        <!-- <a-row>
          <a-col :span="24">
            <div id="donut"></div>
          </a-col>
        </a-row> -->
        <a-row>
          <a-col :span="24">
            <a-table :columns="columns" :data-source="tableData" :pagination="pagination" rowKey="monitorId">
              <a slot="monitorName" slot-scope="text">
                <router-link :to="{ name: 'monitor_point' }"><a-icon type="solution" />{{ text }}</router-link>
              </a>
              <span slot="deviceTypename" slot-scope="text">
                <a-icon type="monitor" />{{ text }}
              </span>
              <a slot="equipAddress" slot-scope="text">
                <router-link :to="{ name: 'monitor_equip' }"><a-icon type="cluster" />{{ text }}</router-link>
              </a>
              <a slot="collectionRuleName" slot-scope="text">
                <router-link :to="{ name: 'collection_rules' }"><a-icon type="cloud-upload" />{{ text }}</router-link>
              </a>
              <a slot="buildingName" slot-scope="text">
                <router-link :to="{ name: 'building' }"><a-icon type="home" />{{ text }}</router-link>
              </a>
              <span slot="monitorDesc" slot-scope="text">
                <a-icon type="message" />{{ text }}
              </span>
            </a-table>
          </a-col>
        </a-row>
      </a-col>
    </a-row>

    <!-- <org-modal ref="modal" @ok="handleSaveOk" @close="handleSaveClose" /> -->
  </a-card>
</template>

<script>
import STree from '@/components/Tree/Tree'
import { STable } from '@/components'
import moment from '../../../node_modules/moment'
// import OrgModal from './modules/OrgModal'
import { getOrgTree, getLineData, getTableData1 } from '@/api/data/diagnosis'
import { Line } from '@antv/g2plot'
var linePlot
// var linePlot2
// var linePlot3
// var linePlot4
// var linePlot5
// var linePlot6
// var linePlot7
// const columns = [
//     {
//       title: '点位名称',
//       dataIndex: 'name',
//       key: 'name'
//     }
    // {
    //   title: '值',
    //   dataIndex: 'value',
    //   key: 'value'
    // }
  // ]
const plainOptions = ['电压', '电流', '功率']
const columns = [
    {
      title: '监测点名称',
      dataIndex: 'monitorName',
      key: 'monitorName',
      scopedSlots: { customRender: 'monitorName' }
    },
    {
      title: '用能类型',
      dataIndex: 'deviceTypename',
      key: 'deviceTypename',
      scopedSlots: { customRender: 'deviceTypename' }
    },
    {
      title: '设备地址',
      dataIndex: 'equipAddress',
      key: 'equipAddress',
      scopedSlots: { customRender: 'equipAddress' }
    },
    {
      title: '采集规则',
      dataIndex: 'collectionRuleName',
      key: 'collectionRuleName',
      scopedSlots: { customRender: 'collectionRuleName' }
    },
    {
      title: '所在楼栋',
      dataIndex: 'buildingName',
      key: 'buildingName',
      scopedSlots: { customRender: 'buildingName' }
    },
    {
      title: '监测点描述',
      dataIndex: 'monitorDesc',
      key: 'monitorDesc',
      scopedSlots: { customRender: 'monitorDesc' }
    }
  ]
export default {
  name: 'TreeList',
  components: {
    STable,
    STree
  },
  data () {
    return {
      openKeys: ['key-01'],
      diagnosispoint: '诊断点',
      plainOptions,
      columns,
      selectedRowKeys: ['A相电压'],
      tableData: [],
      data: [],
      // 查询参数
      // queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      orgTree: [],
      voltage: [],
      current: [],
      power: [],
      papr: [],
      choice: 'voltage',
      activeKey: 'voltage',
      date: null,
      dateFormat: 'YYYY/MM/DD',
      visible: false,
      dateString: null,
      treekey: '',
      data1: [],
      // 监测点所有设备数据
      alldata: [],
      // 当天曲线数据
      curvedata: [],
      plainOptionsoperation: ['电压'],
      selectedRowKeys1: [],
      pagination: { pageSize: 4 },
      address: ''
      // selectedRowKeys: [],
      // selectedRows: []
    }
  },
  created () {
    this.getTime()
    getOrgTree().then(res => {
      // console.log('OrgTree', res)
      this.treekey = res[0].diagnosisId
      this.getTableData(this.treekey)
      // console.log('treekey', this.treekey)
      this.line()
      // this.dount()
      this.alldata = res
      // console.log('equip', res[0].equip)
      // var data3 = this.tabledataprocessing(res[0].equip)
      // this.data = data3
      const data1 = []
      const data = []
      data1.push({ 'key': 'key-01',
          'title': '诊断点',
          'icon': null,
          'children': [] })
      for (let i = 0; i < res.length; i++) {
        data.push({
          'key': 'key-01-' + res[i].diagnosisId,
          'title': res[i].diagnosisName,
          'icon': 'solution',
          'id': res[i].diagnosisId,
          'group': true
        })
      }
      data1[0].children = data
      this.orgTree = data1
    })
  },
  mounted () {
      // this.line()
      // this.dount()
  },
  methods: {
    getTime () {
        // new Date() new一个data对象，当前日期和时间
        // toLocaleString() 方法可根据本地时间把 Date 对象转换为字符串，并返回结果。
        this.nowtime = new Date().toLocaleString()
       this.date = moment(this.nowtime, 'YYYY/MM/DD')
        // console.log('nowtime: ', this.nowtime)
      },
      callback (key) {
        var a = key
        this.choice = key
if (a === 'voltage') {
    linePlot.updateConfig({
    yAxis: {
    min: 200
    // tickInterval: 10
  },
    data: this[a],
    meta: {
    value: {
      formatter: v => `${v}V` // 箭头函数只有一条语句，去掉{}后默认带上return，不用再加
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
      formatter: (v) => { return `${v}KWH` }
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
      },
    getTableData (id) {
      getOrgTree(id).then(res => {
        console.log('根据id查询监测点', id, res[0].monitor)
        this.tableData = this.addtable(res[0].monitor)
      })
    },
    addtable (data) {
      data.forEach(tabledata => {
        switch (parseInt(tabledata.deviceType)) {
    case 1:
        tabledata.deviceTypename = '空调'
         break
         case 2:
        tabledata.deviceTypename = '照明'
        break
        case 3:
        tabledata.deviceTypename = '用电'
        break
        case 4:
        tabledata.deviceTypename = '环境'
        break
        case 11:
        tabledata.deviceTypename = '给水'
        break
    case 21:
        tabledata.deviceTypename = '燃气'
         break
    case 31:
        tabledata.deviceTypename = '供热'
         break
}
      })
      return data
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
            this.choice = 'voltage'
            this.activeKey = 'voltage'
  this.curvedata = response
  var data = []
  var data2 = []
  var data3 = []
  // var data4 = []
  // var data5 = []
  // var data6 = []
  // var data7 = []
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
            time: response[i].dataTime.substring(11, 16), type: '正向有功电能', value: parseFloat(response[i].pap)
        })
  }
     this.voltage = data
  this.current = data2
  this.power = data3
  this.papr = data8
  var a = this.choice
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
      formatter: (v) => { return `${v}KWH` }
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
}
  // linePlot2.changeData(data2)
  // linePlot3.changeData(data3)
  // linePlot4.changeData(data4)
  // linePlot5.changeData(data5)
  // linePlot6.changeData(data6)
  // linePlot7.changeData(data7)
      })
    },
    handleClick (e) {
      // console.log('handleClick', e)
      this.treekey = e.key.substring(7)
      console.log(this.treekey)
      this.dataprocessing()
  //     getColumnData(this.treekey, this.dateString).then(res => {
  //       var data = []
  // for (let i = 0; i < res.length; i++) {
  //       data.push({
  //           date: res[i].dataTime.substring(5, 10), 日正向有功总能示值: res[i].papR
  //       })
  //   }
  //   // console.log(data)
  //       columnPlot.changeData(data)
  //     })
      this.getTableData(this.treekey)
    },
    handleTitleClick (item) {
      // console.log('handleTitleClick', item)
    },
    titleClick (e) {
      // console.log('titleClick', e)
    },
    handleSaveOk () {

    },
    handleSaveClose () {

    },
    onChange2 (date, dateString) {
      this.dateString = dateString
    },
    onSelectChange (selectedRowKeys) {
      //  console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    onChange (key) {
      //  console.log('selectKeys changed: ', key)
       getTableData1(key).then(res => {
      this.data = res.result
    })
    },
    query () {
      this.dataprocessing()
  //     getColumnData(this.treekey, this.dateString).then(res => {
  //       var data = []
  // for (let i = 0; i < res.length; i++) {
  //       data.push({
  //           date: res[i].dataTime.substring(5, 10), 日正向有功总能示值: res[i].papR
  //       })
  //   }
  //       columnPlot.changeData(data)
  //     })
    },

    // 图表
    line () {
          this.dateString = this.date.format('YYYY-MM-DD')
          // console.log('line', this.treekey)
getLineData(this.treekey, this.dateString).then(response => {
  console.log('getLineData', response)
  // console.log(this.treekey, this.dateString)
  this.curvedata = response
  var data8 = []
  var data = []
  var data2 = []
  var data3 = []
  // var data4 = []
  // var data5 = []
  // var data6 = []
  // var data7 = []
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
  // for (let i = 0; i < response.length; i++) {
  //   data4.push({
  //           time: response[i].dataTime.substring(11, 16), type: '温度', value: parseFloat(response[i].temperature)
  //       })
  // }
  // for (let i = 0; i < response.length; i++) {
  //   data5.push({
  //           time: response[i].dataTime.substring(11, 16), type: '湿度', value: parseFloat(response[i].humidity)
  //       })
  // }
  // for (let i = 0; i < response.length; i++) {
  //   data6.push({
  //           time: response[i].dataTime.substring(11, 16), type: 'CO2浓度', value: parseFloat(response[i].co2)
  //       })
  // }
  // for (let i = 0; i < response.length; i++) {
  //   data7.push({
  //           time: response[i].dataTime.substring(11, 16), type: '光照强度', value: parseFloat(response[i].illuminance)
  //       })
  // }
  // console.log(data4)
  // console.log(data, data2, data3, data4, data5, data6, data7)
  for (let i = 0; i < response.length; i++) {
  data8.push({
            time: response[i].dataTime.substring(11, 16), type: '正向有功电能', value: parseFloat(response[i].pap)
        })
  }
    this.voltage = data
  this.current = data2
  this.power = data3
  this.papr = data8
   linePlot = new Line('line', {
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

// linePlot2 = new Line('current', {
//   description: {
//     visible: true,
//     text: '日曲线变化图'
//   },
//   padding: 'auto',
//   forceFit: true,
//   data: data2,
//   xField: 'time',
//   yField: 'value',
//   seriesField: 'type',
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
// linePlot2.render()

// linePlot3 = new Line('power', {
//   description: {
//     visible: true,
//     text: '日曲线变化图'
//   },
//   padding: 'auto',
//   forceFit: true,
//   data: data3,
//   xField: 'time',
//   yField: 'value',
//   seriesField: 'type',
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
// linePlot3.render()

// linePlot4 = new Line('temperature', {
//   description: {
//     visible: true,
//     text: '日曲线变化图'
//   },
//   padding: 'auto',
//   forceFit: true,
//   data: data4,
//   xField: 'time',
//   yField: 'value',
//   seriesField: 'type',
//   interactions: [
//         {
//           type: 'slider',
//           cfg: {
//             start: 0.1,
//             end: 0.2
//           }
//         }
//       ],
//       smooth: true
// })
// linePlot4.render()

// linePlot5 = new Line('humidity', {
//   description: {
//     visible: true,
//     text: '日曲线变化图'
//   },
//   padding: 'auto',
//   forceFit: true,
//   data: data5,
//   xField: 'time',
//   yField: 'value',
//   seriesField: 'type',
//   interactions: [
//         {
//           type: 'slider',
//           cfg: {
//             start: 0.1,
//             end: 0.2
//           }
//         }
//       ],
//       smooth: true
// })
// linePlot5.render()

// linePlot6 = new Line('co2', {
//   description: {
//     visible: true,
//     text: '日曲线变化图'
//   },
//   padding: 'auto',
//   forceFit: true,
//   data: data6,
//   xField: 'time',
//   yField: 'value',
//   seriesField: 'type',
//   interactions: [
//         {
//           type: 'slider',
//           cfg: {
//             start: 0.1,
//             end: 0.2
//           }
//         }
//       ],
//       smooth: true
// })
// linePlot6.render()

// linePlot7 = new Line('illuminance', {
//   description: {
//     visible: true,
//     text: '日曲线变化图'
//   },
//   padding: 'auto',
//   forceFit: true,
//   data: data7,
//   xField: 'time',
//   yField: 'value',
//   seriesField: 'type',
//   interactions: [
//         {
//           type: 'slider',
//           cfg: {
//             start: 0.1,
//             end: 0.2
//           }
//         }
//       ],
//       smooth: true
// })
// linePlot7.render()
})
    }
  }
}
</script>

<style lang="less">

</style>
