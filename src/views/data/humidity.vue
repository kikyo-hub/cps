<template>
  <a-card :bordered="false">
    <a-row :gutter="8">
      <a-col :span="4">
        <s-tree
          :dataSource="orgTree"
          :openKeys.sync="openKeys"
          :search="false"
          @click="handleClick"
          @titleClick="handleTitleClick"></s-tree>
      </a-col>
      <a-col :span="20">
        <a-row>
          <a-col :span="20">
            <a-card :bordered="false" title="监测点日曲线" :style="{ marginBottom: '24px' }">
              <span slot="extra"><a-form layout="inline">
                <a-checkbox-group :options="plainOptions" :default-value="plainOptionsoperation" @change="onChange1" style="margin-top:10px"/>
                <a-form-item label="选择日期">
                  <a-date-picker style="width: 80%" placeholder="请选择日期" @change="onChange2" :default-value="date" :format="dateFormat"/>
                </a-form-item>
                <a-form-item><a-button type="primary" @click="query()">查询</a-button></a-form-item>
              </a-form>
              </span>
              <div id="line"></div>
            </a-card>
          </a-col>
          <a-col :span="4">
            <a-table
              :rowSelection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
              :columns="columns1"
              :data-source="data1"
              size="small"
              :pagination="false"
              style="margin-top:35%"
              rowKey="key"
            ></a-table>
          </a-col>
        </a-row>
        <!-- <a-row v-show="visible">
          <a-card>
            <a-switch
              slot="extra"
              checked-children="开"
              un-checked-children="关"
              :checked="visible"
              @change="onChange"/>
            <a-col :span="24">
              <div id="hudonut"></div>
            </a-col>
          </a-card>
        </a-row> -->
        <a-row>
          <a-col :span="24">
            <a-table :columns="columns" :data-source="data" :pagination="false" rowKey="equipId">
              <!-- <span slot="operation" slot-scope="text,record">
                <a @click="test(record)">查看</a>
              </span> -->
            </a-table>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <div id="donut"></div>
          </a-col>
        </a-row>
      </a-col>
    </a-row>

  </a-card>
</template>

<script>
import STree from '@/components/Tree/Tree'
// import moment from 'D:/web/CPSWeb/node_modules/moment'
import moment from 'moment'
// import OrgModal from './modules/HumidityModal'
import { getOrgTree, getLineData, gettableData, getColumnData1 } from '@/api/data/humidity'
import { Line, Column } from '@antv/g2plot'
var linePlot
var columnPlot
const columns = [
    {
      title: '监测设备名称',
      dataIndex: 'equipName',
      key: 'equipName'
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
    // {
    //   title: '操作',
    //   dataIndex: 'operation',
    //   key: 'operation',
    //   scopedSlots: { customRender: 'operation' }
    // }
  ]
const columns1 = [
    {
      title: '点位名称',
      dataIndex: 'name',
      key: 'name'
    }
    // {
    //   title: '值',
    //   dataIndex: 'value',
    //   key: 'value'
    // }
  ]
const plainOptions = ['电压', '电流', '功率', '温度', '湿度', 'CO2', '光照度']
export default {
  name: 'TreeList',
  components: {
    STree
  },
  data () {
    return {
      date: moment('2020/06/05', 'YYYY/MM/DD'),
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
      selectedRowKeys1: []
      // selectedRowKeys: [],
      // selectedRows: []
    }
  },
  created () {
    getOrgTree().then(res => {
      console.log('OrgTree', res)
      this.treekey = res[0].monitorId
      this.alldata = res
      this.line()
      this.donut()
      console.log('equip', res[0].equip)
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
          'icon': 'eye',
          'id': res[i].monitorId,
          'group': true
        })
      }
      data1[0].children = data
      this.orgTree = data1
      var data3 = this.tabledataprocessing(res[0].equip)
      this.data = data3
    })
    // gettableData().then(res => {
    //   this.data = res.result
    // })
    // this.gettableData2()
    // this.donut()
    // setTimeout(() => {
    //   this.loading = !this.loading
    // }, 1000)
    // this.line()
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
  },
  mounted () {
    this.gettableData2()
      // this.line()
      // this.donut()
  },
  methods: {
    tabledataprocessing (tabledata) {
      const data = []
      // data.push({
      //   equipName: tabledata.equipName,
      //   commAddress: tabledata.commAddress
      // })
      // console.log('tabledata.equipType', typeof (tabledata.equipType))
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
      console.log(data)
      data.push(tabledata)
      return data
    },
    dataprocessing () {
      var select = this.selectedRowKeys
      var curvedata = this.curvedata
      var arr = []
      var arr2 = []
      select.forEach(element => {
        if (element === 'A相电压') {
          arr2.push({ name: 'ua', value: 'A相电压' })
        }
        if (element === 'B相电压') {
          arr2.push({ name: 'ub', value: 'B相电压' })
        }
        if (element === 'C相电压') {
          arr2.push({ name: 'uc', value: 'C相电压' })
        }
        if (element === 'A相电流') {
          arr2.push({ name: 'ia', value: 'A相电流' })
        }
        if (element === 'B相电流') {
          arr2.push({ name: 'ib', value: 'B相电流' })
        }
        if (element === 'C相电流') {
          arr2.push({ name: 'ic', value: 'C相电流' })
        }
        if (element === '功率') {
          arr2.push({ name: 'p', value: '功率' })
        }
        if (element === '温度') {
          arr2.push({ name: 'temperature', value: '温度' })
        }
        if (element === '湿度') {
          arr2.push({ name: 'humidity', value: '湿度' })
        }
        if (element === 'CO2') {
          arr2.push({ name: 'co2', value: 'CO2' })
        }
        if (element === '光照度') {
          arr2.push({ name: 'illuminance', value: '光照度' })
        }
      })
      console.log(arr2)
      curvedata.forEach(element => {
        arr2.forEach(element1 => {
          arr.push({
             time: element.dataTime.substring(11, 16), type: element1.value, value: element[element1.name]
          })
        })
      })
      console.log('line数据', arr)
      return arr
    },
    dateFormat1 (fmt, date) {
    let ret
    const opt = {
        'Y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString() // 日
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    }
    for (const k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
        };
    };
    return fmt
},
    handleClick (e) {
      // console.log('handleClick', e)
      this.treekey = e.key.substring(7)
      // console.log('999999999999', e)
      getLineData(e.key.substring(7), this.dateString).then(response => {
        console.log(e.key.substring(7), this.dateString)
        console.log('line请求数据', response)
        this.curvedata = response
        var data = this.dataprocessing()
      linePlot.changeData(data)
      })
      gettableData(this.treekey).then(res => {
        this.data = this.tabledataprocessing(res)
  })
  getColumnData1(e.key.substring(7), this.dateString).then(response => {
    console.log('图表数据', this.treekey, this.dateString, response)
  var data = []
  for (let i = 0; i < response.length; i++) {
        data.push({
            date: response[i].dataTime.substring(5, 10), 日正向有功总能示值: response[i].papR
        })
        console.log('dataaaaaa', response[i].dataTime.substring(5, 10), response[i].papR)
    }
  columnPlot.changeData(data)
      })
    },
    handleTitleClick (item) {
      // console.log('handleTitleClick', item)
    },
    onChange (checked) {
      this.visible = checked
    },
    // onSelectChange (selectedRowKeys, selectedRows) {
    //   this.selectedRowKeys = selectedRowKeys
    //   this.selectedRows = selectedRows
    // },
    test (record) {
      // this.handleClick()
      this.visible = true
      // console.log(record)
      var data = [
        { x: this.columns[1].title, y: record.four },
      { x: this.columns[2].title, y: record.eight },
      { x: this.columns[3].title, y: record.twelve },
      { x: this.columns[4].title, y: record.sixth },
      { x: this.columns[5].title, y: record.twenty },
      { x: this.columns[6].title, y: record.twentyfour }
      ]
      // console.log(data)
columnPlot.changeData(data)
    },
onSelectChange (selectedRowKeys) {
       console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
      // this.renderdata()
    },
    onChange1 (key) {
       console.log('selectKeys changed: ', key)
       this.plainOptionsoperation = key
    //    getTableData1(key).then(res => {
    //   this.data1 = res.result
    // })
    // this.gettableData2()
    this.gettableData2()
    },
    // 日期选择
    onChange2 (date, dateString) {
      this.dateString = dateString
    },
    query () {
      // getLineData(this.treekey, this.dateString).then(res => {
      //   console.log('treekey:' + this.treekey, 'date:' + this.dateString)
      //   var data = res
      //   console.log(data)
      //   linePlot.changeData(data)
      // })
      getLineData(this.treekey, this.dateString).then(res => {
        this.curvedata = res
        var data = this.dataprocessing()
      console.log(data)
      linePlot.changeData(data)
      })
      getColumnData1(this.treekey, this.dateString).then(response => {
  console.log('图表数据', response)
  var data = []
  for (let i = 0; i < response.length; i++) {
        data.push({
            date: response[i].dataTime.substring(5, 10), 日正向有功总能示值: response[i].papR
        })
    }
    // console.log(data)
  columnPlot.changeData(data)
      })
    },
    // 点位名称表数据
gettableData2 () {
  const data = []
  this.plainOptionsoperation.forEach(element => {
    if (element === '电压') {
      data.push({
    key: 'A相电压',
    name: 'A相电压'
  },
  {
    key: 'B相电压',
    name: 'B相电压'
  },
  {
    key: 'C相电压',
    name: 'C相电压'
  })
    } else if (element === '电流') {
      data.push({
    key: 'A相电流',
    name: 'A相电流'
  },
  {
    key: 'B相电流',
    name: 'B相电流'
  },
  {
    key: 'C相电流',
    name: 'C相电流'
  })
    } else {
      data.push({
    key: element,
    name: element
  })
    }
    // console.log(element)
  })
  this.data1 = data
  console.log('data', data)
},
    // 图表
//     line () {
// getLineData(this.selectedRowKeys).then(response => {
//   var data = response.result
//    linePlot = new Line('line', {
//   description: {
//     visible: true,
//     text: '96点变化图'
//   },
//   padding: 'auto',
//   forceFit: true,
//   data,
//   xField: 'time',
//   yField: 'value',
//   seriesField: 'type',
//   smooth: true
// })
// linePlot.render()
// })
//     },
        line () {
          this.dateString = this.date.format('YYYY-MM-DD')
          console.log('line', this.treekey)
getLineData(this.treekey, this.dateString).then(response => {
  // console.log('getLineData', response)
  console.log(this.treekey, this.dateString)
  this.curvedata = response
  // this.dataprocessing()
  // this.renderdata(response)
  var datatest = this.dataprocessing()
  var data = []
  for (let i = 0; i < response.length; i++) {
    data.push({
            time: response[i].dataTime.substring(11, 16), type: 'A相电压', value: response[i].ua
        })
  }
   linePlot = new Line('line', {
  description: {
    visible: true,
    text: '日曲线变化图'
  },
  padding: 'auto',
  forceFit: true,
  data: datatest,
  xField: 'time',
  yField: 'value',
  seriesField: 'type',
  // yAxis: {
  //       min: 235
  //     },
  // interactions: [
  //       {
  //         type: 'slider',
  //         cfg: {
  //           start: 0.1,
  //           end: 0.2
  //         }
  //       }
  //     ],
  // animation: {
  //     appear: {
  //         animation: 'clipingWithData'
  //       }
  //     },
      smooth: true
})
linePlot.render()
})
    },
donut () {
      this.dateString = this.date.format('YYYY-MM-DD')
getColumnData1(this.treekey, this.dateString).then(response => {
  console.log(this.treekey, response)
  var data = []
  for (let i = 0; i < response.length; i++) {
        data.push({
            date: response[i].dataTime.substring(5, 10), 日正向有功总能示值: response[i].papR
        })
    }
    console.log('日正向有功总能示值', data)
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

<style lang="less">

</style>
