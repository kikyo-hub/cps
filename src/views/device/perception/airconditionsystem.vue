<template>
  <div :loading="loading" class="page-header-index-wide">
    <a-row :gutter="24" type="flex" :style="{ marginTop: '24px' }">
      <a-col :span="24" style="pading-left: 6px pading-right: 12px">
        <a-card :loading="load" :bordered="false" title="设备运行实时负荷" style="width: 100%;height:100%; pading-right: 9px">
          <span class="salesCard">
            <a-form layout="inline">
              <a-row>
                <a-col :md="8" :sm="24" style="wideth: 80%">
                  <a-form-item label="选择监控日期">
                    <a-date-picker style="width: 140%" placeholder="请选择日期" @change="change,panelChange"/>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24" style="wideth: 80%">
                  <a-form-item label="选择监控点">
                    <cascader
                      :options="Building"
                      :load-data="loadCData"
                      placeholder="请选择"
                      change-on-select
                      v-decorator="['location', {rules:[{required: true, message: '请选择安装位置'}]}]"
                    />
                  </a-form-item>
                </a-col>
                <a-col :md="6" :sm="24" style="wideth: 100%">
                  <a-form-item>
                    <a-button type="primary" @click="getdata">查询</a-button>
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
            <a-row>
              <a-col :span="24"><div ref="container1" style="width:1500px;height:500px;"></div></a-col>
            </a-row>
          </span>
        </a-card>
      </a-col>
      <a-col :span="18">
        <a-card :loading="loading" :bordered="false" title="设备运行状态" style="width: 100%;padding-left: 9px;margin-top:20px;height:100%;">
          <a-col :md="12" :sm="24">
            <div id="container3"></div>
          </a-col>
          <a-col :md="12" :sm="24">
            <div id="container4"/>
          </a-col>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card :loading="loading" :bordered="false" title="系统能耗" style="width: 100%;height:100%;margin-top:20px">
          <a-col :span="24" align="center"><img src="~@/assets/elec.svg" class="logo" alt="logo" style="width:30%"></a-col>
          <a-col :span="24"><div style="font-size:48px;font-weight:bolder;">用电量：{{ sum }} kW·h</div></a-col>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="24" type="flex" :style="{ marginTop: '24px'}">
      <a-col style="pading-left: 6px pading-right: 12px">
        <a-card :loading="loading" :bordered="false" title="空调监测" style="margin-top:10px; width: 153%">
          <a-form layout="inline">
            <a-row :gutter="24">
              <a-col :md="4" :sm="12">
                <a-form-item label="楼栋">
                  <a-select placeholder="请选择" default-value="" style="width: 100px" @change="buliding">
                    <a-select-option value="">全部</a-select-option>
                    <a-select-option v-for="item in BuildingOptions" :key="item.value"> <!-- value="item.value" 配合default-value使用设置默认值 -->
                      {{ item.label }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="4" :sm="12">
                <a-form-item label="楼层">
                  <a-select placeholder="请选择" default-value="" style="width: 100px" @change="floorno">
                    <a-select-option value="">全部</a-select-option>
                    <a-select-option v-for="item in floorData" :key="item.value"> <!-- value="item.value" 配合default-value使用设置默认值 -->
                      {{ item.label }}
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="4" :sm="12">
                <a-form-item label="运行状态">
                  <a-select v-model="queryParam.status" placeholder="请选择" default-value="" style="width: 100px" @change="running">
                    <a-select-option value="">全部</a-select-option>
                    <a-select-option value="1">在运</a-select-option>
                    <a-select-option value="2">停运</a-select-option>
                    <a-select-option value="0">无设备</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="4" :sm="12">
                <a-form-item label="设备状态">
                  <a-select v-model="queryParam.statuse" placeholder="请选择" default-value="" style="width: 100px" @change="func">
                    <a-select-option value="">全部</a-select-option>
                    <a-select-option value="1">开</a-select-option>
                    <a-select-option value="0">关</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24" style="pading-left: 40px">
                <span class="table-page-search-submitButtons">
                  <a-button @click="search" type="primary" icon="search">查询</a-button>
                  <!-- <a-button type="primary" style="margin-left: 8px" @click="insertData" icon="plus">新增</a-button> -->
                  <a-button style="margin-left: 50px" @click="gettable" icon="reload">重置</a-button>
                </span>
              </a-col>
            </a-row>
            <a-table
              ref="table"
              row-key="monotorId"
              :columns="colheads"
              :align="center"
              :data-source="tabledata1"
              :pagination="pagination"
              bordered>
              <span slot="buildingNameTitle"><a-icon type="switcher" theme="twoTone"/>楼栋名称</span>
              <span slot="monotorNameTitle"><a-icon type="edit" theme="twoTone"/>设备名称</span>
              <span slot="floorNameTitle"><a-icon type="home" theme="twoTone"/>楼层名称</span>
              <span slot="nameTitle"><a-icon type="star" theme="twoTone"/>类型</span>
              <span slot="roomNameTitle"><a-icon type="hdd" theme="twoTone"/>房间名称</span>
              <span slot="statusTitle"><a-icon type="api" theme="twoTone"/>设备状态</span>
              <span slot="equipStatusTitle"><a-icon type="tool" theme="twoTone"/>运行状态</span>
              <span slot="actionTitle"><a-icon type="pushpin" theme="twoTone"/>操作</span>
              <span slot="switchStatus" slot-scope="text, record">
                <div v-if="record.switchStatus === 1 || record.switchStatus === 2">
                  <a-tag :color="record.status ==='停运' ? 'red' : 'green'" >
                    {{ record.status.toUpperCase() }}
                  </a-tag>
                </div>
                <div v-else>
                  <a-tag :color="record.status ==='无设备' ? 'gray' : 'green'" >
                    {{ record.status.toUpperCase() }}
                  </a-tag>
                </div>
              </span>
              <span slot="equipStatus" slot-scope="text, record">
                <div v-if="record.equipStatus === 1">
                  <a-switch :disabled="record.equipStatus2" checked-children="开" un-checked-children="关" default-checked />
                </div>
                <div v-else>
                  <a-switch :disabled="record.equipStatus2" checked-children="开" un-checked-children="关" />
                </div>
              </span>
              <span slot="action" slot-scope="text, record">
                <a-button type="primary" @click="$refs.airconditionsystem.update(record)">
                  编辑
                </a-button>
              </span>
            </a-table>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
    <airconditionsystem ref="airconditionsystem" @ok="handleOk"/>
  </div>
</template>

<script>
// import { mixinDevice } from '@/utils/mixin'
// import pick from 'lodash.pick'
import { Donut } from '@antv/g2plot'
import echarts from 'echarts'
import { Getairsystemdata, Getairsystemtable, Getairsystem } from '@/api/perception/airsystem'
import { GetFloor, GetBuilding, GetRoom } from '@/api/archives/MonitorPoint'
import moment from 'moment'
import { cascader } from 'ant-design-vue'
import airconditionsystem from '../modules/airconditionsystemForm'

const data = []
// const DetailListItem = DetailList.Item
const sourceData = [
    { type: '在运设备', value: null },
    { type: '停运设备', value: 1 },
    { type: '无设备', value: null }
]
const sourceData1 = [
    { type: '开启设备', value: null },
    { type: '关闭设备', value: null }
]
const colheads = [
    {
      dataIndex: 'buildingName',
      key: 'buildingName',
      // title: '楼栋名称',
      slots: { title: 'buildingNameTitle' },
      scopedSlots: { customRender: 'buildingName' },
      align: 'center'
    },
    {
      dataIndex: 'monotorName',
      key: 'monotorName',
      //  title: '设备名称',
      slots: { title: 'monotorNameTitle' },
      scopedSlots: { customRender: 'monotorName' },
      align: 'center'
    },
    {
      dataIndex: 'floorName',
      key: 'floorName',
      //  title: '楼层',
      slots: { title: 'floorNameTitle' },
      scopedSlots: { customRender: 'floorName' },
      align: 'center'
    },
    {
      // title: '类型',
      dataIndex: 'name',
      key: 'name',
      slots: { title: 'nameTitle' },
      scopedSlots: { customRender: 'name' },
      align: 'center'
    },
    {
      // title: '位置',
      dataIndex: 'roomName',
      key: 'roomName',
      slots: { title: 'roomNameTitle' },
      scopedSlots: { customRender: 'roomName' },
      align: 'center'
    },
    {
      // title: '设备状态',
      key: 'status',
      dataIndex: 'status',
      slots: { title: 'statusTitle' },
      scopedSlots: { customRender: 'switchStatus' },
      align: 'center'
    },
    {
      // title: '运行状态',
      key: 'equipStatus2',
      slots: { title: 'equipStatusTitle' },
      dataIndex: 'equipStatus2',
      scopedSlots: { customRender: 'equipStatus' },
      align: 'center'
    },
    {
      // title: '操作',
      key: 'action',
      slots: { title: 'actionTitle' },
      scopedSlots: { customRender: 'action' },
      align: 'center'
    }
  ]
const tabledata1 = []
const floorData = []
var xAxisData = []
var data1 = []
var myChart

var BuildingOptions = []
// var electric = 0 // 用电量
var airdata // 存放日期
var airmonitor // 存放监测点信息
var bulidingno = ''// 存放楼栋信息
var floor = ''// 存放楼层
var status1 = ''// 存放运行状态
var equipStatus = ''// 存放设备状态
export default {
  // mixins: [mixinDevice],
  components: {
    airconditionsystem,
    cascader
  },
  data () {
    return {
      labelCol: {
        xs: { span: 8 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      visible: false,
      load: false,
      disabled: true,
      loading: false,
      data,
      sum: 0,
      sourceData,
      sourceData1,
      colheads,
      tabledata1,
      BuildingOptions,
      Building: [],
      floorData,
      advanced: false,
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      pagination: { total: 0,
        pageSize: 5, // 每页中显示10条数据
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '50', '100'], // 每页中显示的数据
        showTotal: total => `共有 ${total} 条数据` // 分页中显示总的数据
        },
      linePlot: {},
      // electric,
      airdata,
      airmonitor,
      bulidingno,
      floor,
      status1,
      equipStatus
    }
  },
  mounted: function () {
  this.getdata()
  this.getpie()
  this.gettable()
  this.getData2()
  },

 methods: {
      getData2 () {
      GetBuilding().then(response => {
        this.Building = response.result
      })
      },
      getdata () {
        airmonitor = 10000015
        airdata = '2020-06-01'
        Getairsystemdata(airdata, airmonitor).then(response => {
        var data = response.result
        console.log('折线图', data)
        this.sum = 0
        for (let i = 0; i < data.length; i += 1) {
          xAxisData[i] = data[i].dataTime.substring(11, 16)
           data1[i] = data[i].ua
        this.sum = this.sum + data[i].p
      }
      var option = {
        title: {
            text: '空调设备状况'
        },
        legend: {
            data: ['pa', 'pb', 'pc']
        },
        toolbox: {
            // y: 'bottom',
            feature: {
                magicType: {
                    type: ['stack', 'tiled']
                },
                dataView: {},
                saveAsImage: {
                    pixelRatio: 2
                }
            }
        },
        tooltip: {},
        xAxis: {
            data: xAxisData,
            splitLine: {
                show: false
            }
        },
        yAxis: {
        },
        series: [{
            name: 'pa',
            type: 'bar',
            data: data1,
            animationDelay: function (idx) {
                return idx * 15
            }
        }, {
        name: 'pb',
        type: 'bar',
        data: data1,
        animationDelay: function (idx) {
            return idx * 15 + 100
        }
    }, {
        name: 'pc',
        type: 'bar',
        data: data1,
        animationDelay: function (idx) {
            return idx * 15 + 100
        }
    }],
        animationEasing: 'elasticOut',
        animationDelayUpdate: function (idx) {
            return idx * 10
        }
        }
      myChart = echarts.init(this.$refs.container1, 'light')
			myChart.setOption(option)
        console.log('电量总和', this.sum)
        return this.sum
      })
      },
      gettable () {
       var tabledata
       var length
      //  var length2
       var type = 1
        Getairsystem(type).then(response => {
        tabledata = response.result
        length = tabledata.length
        console.log('返回数据', tabledata)
        this.tabledata1 = tabledata
        // console.log(222, tabledata)
        console.log('空调信息', this.tabledata1)
        for (let i = 0; i < length; i += 1) {
          // this.disabled[i] = tabledata[i].status
          if (this.tabledata1[i].switchStatus === 1) {
            this.tabledata1[i].status = '在运'
          } else if (this.tabledata1[i].switchStatus === 2) {
            this.tabledata1[i].status = '停运'
                   } else { this.tabledata1[i].status = '无设备' }
          if (this.tabledata1[i].status === '无设备') {
            this.tabledata1[i].equipStatus2 = true
          } else { this.tabledata1[i].equipStatus2 = false }
          if (this.tabledata1[i].equipStatus === 1) {
            this.tabledata1[i].equipStatus3 = '开'
          } else { this.tabledata1[i].equipStatus3 = '关' }
        }
      })
      GetBuilding().then(res => {
        this.BuildingOptions = res.result
        console.log('楼栋名称：', this.BuildingOptions)
      })
      },
      getpie () {
       var tabledata
       Getairsystem(1).then(response => {
       tabledata = response.result
       console.log('tabledata1', tabledata)
        for (let i = 0; i < tabledata.length; i += 1) {
          if (tabledata[i].switchStatus === 1) {
            this.sourceData[0].value = this.sourceData[0].value + 1
          } else if (tabledata[i].switchStatus === 2) {
            this.sourceData[1].value = this.sourceData[1].value + 1
          } else {
            this.sourceData[2].value = this.sourceData[2].value + 1
          }
          if (tabledata[i].equipStatus === 1 && tabledata[i].switchStatus !== 0) {
            this.sourceData1[0].value = this.sourceData1[0].value + 1
          } else if (tabledata[i].equipStatus === 0 && tabledata[i].switchStatus !== 0) {
            this.sourceData1[1].value = this.sourceData1[1].value + 1
          }
        }
        console.log('饼图数据', this.sourceData)
        console.log('饼图数据2', this.sourceData1)
        this.donutPlot = new Donut(document.getElementById('container3'), {
        forceFit: true,
        title: {
            visible: true,
            text: '设备状态'
        },
        description: {
            visible: true,
            text: '空调设备状况'
        },
        label: {
          type: 'spider'
        },
        radius: 0.8,
        padding: 'auto',
        data: this.sourceData,
        angleField: 'value',
        colorField: 'type'
        })

       this.donutPlot.render()

       this.donutPlot = new Donut(document.getElementById('container4'), {
        forceFit: true,
        title: {
            visible: true,
            text: '设备状态'
        },
        description: {
            visible: true,
            text: '设备运行状况'
        },
        label: {
          type: 'spider'
        },
        radius: 0.8,
        padding: 'auto',
        data: this.sourceData1,
        angleField: 'value',
        colorField: 'type'
        })

        this.donutPlot.render()
       })
      },
      loadCData (selectedOptions) {
      console.log('selectedOptions', selectedOptions)
      const targetOption = selectedOptions[selectedOptions.length - 1]
      targetOption.loading = true
      var rrr = {}
      if (selectedOptions.length === 1) {
        GetFloor({ 'builingNo': selectedOptions[0].value }).then(response => {
          rrr = response.result
        })
      }
      if (selectedOptions.length === 2) {
        GetRoom({ 'floorNo': selectedOptions[1].value }).then(response => {
          rrr = response.result
        })
      }
      setTimeout(() => {
        targetOption.loading = false
        targetOption.children = rrr
        this.Building = [...this.Building]
      }, 1000)
      },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    },
    // 折线图和饼图的日期选择
    change (date, dateString) {
      airdata = dateString
      console.log('日期选择', dateString)
      return airdata
    },
    panelChange (value, mode) {
      console.log(value, mode)
    },
    monitor (value) {
      airmonitor = value
      return airmonitor
    },
    // getdate1 () {
    //   airmonitor = 10000015
    //   console.log('日期', airdata)
    //   this.queryParam = {
    //     date: moment(new Date())
    //   }
    //   Getairsystemdata(airdata, airmonitor).then(response => {
    //     var newdata1 = response.result
    //     var newdata = []
    //     console.log('查询电能数据', newdata)
    //     for (let i = 0; i < 96; i += 1) {
    //       // console.log(newdata1[i].dataTime.substring(11, 16))
    //     newdata.push({
    //       year: newdata1[i].dataTime.substring(11, 16),
    //       电量: newdata1[i].p
    //     }
    //     // console.log(newdata1)
    //     )
    //   }
    //   //  console.log(newdata)
    //   this.linePlot.changeData(newdata)
    //   })
    //   // })
    // },
    // 表格的修改
    handleDelete (key) {
         console.log('删除数据', key)
    },
    buliding (value) {
      bulidingno = value
      GetFloor({ 'builingNo': bulidingno }).then(response => {
        this.floorData = response.result
        console.log('楼层号', this.floorData)
      })
      console.log(bulidingno)
    },
    floorno (value) {
      floor = value
      console.log(floor)
      return floor
    },
    running (value) {
      status1 = value
      console.log(status1)
      return status1
    },
    func (value) {
      equipStatus = value
      console.log(equipStatus)
      return equipStatus
    },
    search () {
       var tabledata
       var length
       console.log(bulidingno, floor, status1, equipStatus)
       Getairsystemtable(bulidingno, floor, status1, equipStatus).then(response => {
        tabledata = response.result
        console.log('查询结果', tabledata)
        console.log('楼栋名称', tabledata.builingName)
        length = tabledata.length
        this.tabledata1 = tabledata
        for (let i = 0; i < length; i += 1) {
          // this.disabled[i] = tabledata[i].status
          if (this.tabledata1[i].switchStatus === 1) {
            this.tabledata1[i].status = '在运'
          } else if (this.tabledata1[i].switchStatus === 2) {
            this.tabledata1[i].status = '停运'
                   } else { this.tabledata1[i].status = '无设备' }
          if (this.tabledata1[i].status === '无设备') {
            this.tabledata1[i].equipStatus2 = true
          } else { this.tabledata1[i].equipStatus2 = false }
        }
      })
    },
    handleOk () {
      // 新增/修改 成功时，重载列表
      this.gettable()
    }
}
}
</script>
<style lang="less" scoped>
  .extra-wrapper {
    line-height: 55px;
    padding-right: 24px;

    .extra-item {
      display: inline-block;
      margin-right: 24px;

      a {
        margin-left: 24px;
      }
    }
  }

  .antd-pro-pages-dashboard-analysis-twoColLayout {
    position: relative;
    display: flex;
    display: block;
    flex-flow: row wrap;
  }

  .antd-pro-pages-dashboard-analysis-salesCard {
    height: calc(100% - 24px);
    /deep/ .ant-card-head {
      position: relative;
    }
  }

  .dashboard-analysis-iconGroup {
    i {
      margin-left: 16px;
      color: rgba(0,0,0,.45);
      cursor: pointer;
      transition: color .32s;
      color: black;
    }
  }
  .analysis-salesTypeRadio {
    position: absolute;
    right: 54px;
    bottom: 12px;
  }
</style>
