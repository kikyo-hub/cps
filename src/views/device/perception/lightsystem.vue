<template>
  <div class="page-header-index-wide">
    <a-row :gutter="24" type="flex" :style="{ marginTop: '24px' }">
      <a-col :span="24" style="pading-left: 6px pading-right: 12px">
        <a-card :loading="loading" :bordered="false" title="设备运行实时负荷" style="width: 100%;height:100%; pading-right: 9px">
          <span class="salesCard">
            <a-form layout="inline">
              <a-row>
                <a-col :md="8" :sm="24" style="wideth: 80%">
                  <a-form-item label="选择监控日期">
                    <a-date-picker style="width: 140%" placeholder="请选择日期" @change="change"/>
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
                <a-col :md="8" :sm="24" style="wideth: 140%">
                  <a-form-item>
                    <a-button type="primary" @click="getdate1">查询</a-button>
                  </a-form-item>
                </a-col>
              </a-row>
            </a-form>
            <a-row>
              <a-col :md="12" :sm="24" style="width: 100%">
                <div id="container"/>
              </a-col>
            </a-row>
          </span>
        </a-card>
      </a-col>
      <a-col :span="14" style="pading-left: 6px; pading-right: 12px; margin-top:20px">
        <a-card :loading="loading" :bordered="false" title="设备运行状态" style="width: 100%;height:100%; pading-left: 4px pading-right: 9px">
          <a-col :md="12" :sm="24">
            <div id="container2"></div>
          </a-col>
          <a-col :md="12" :sm="24">
            <div id="container4"/>
          </a-col>
        </a-card>
      </a-col>
      <a-col :span="10" style="pading-left: 10px; pading-right: 12px; margin-top:20px">
        <a-card :loading="loading" :bordered="false" title="用电状况" style="width: 100%;height:100%; pading-left: 9px pading-right: 9px">
          <a-col :md="24" :sm="24">
            <div id="gun"/>
          </a-col>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="48" type="flex" :style="{ marginTop: '24px' }">
      <a-col style="pading-left: 6px pading-right: 12px">
        <a-card
          :loading="loading"
          :bordered="true"
          title="照明监测"
          style="margin-top:10px; width: 155%">
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
            <a-form>
              <a-table
                row-key="monotorId"
                :columns="colheads"
                :data-source="tabledata1"
                :pagination="pagination"
                bordered>
                <span slot="buildingNameTitle"><a-icon type="switcher" theme="twoTone"/>楼栋名称</span>
                <span slot="monotorNameTitle"><a-icon type="edit" theme="twoTone"/>设备名称</span>
                <span slot="floorNameTitle"><a-icon type="home" theme="twoTone"/>楼层</span>
                <span slot="nameTitle"><a-icon type="star" theme="twoTone"/>类型</span>
                <span slot="roomNameTitle"><a-icon type="hdd" theme="twoTone"/>房间</span>
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
          </a-form>
        </a-card></a-col>
    </a-row>
    <airconditionsystem ref="airconditionsystem" @ok="handleOk"/>
  </div>
</template>

<script>
import DetailList from '@/components/tools/DetailList'
import { mixinDevice } from '@/utils/mixin'
import { Line, Bullet, Donut } from '@antv/g2plot'
import { Getligsystemdata, GetTabledata1, Getlitsystem } from '@/api/perception/lisystem' //  Getaligsystemgun,Getaligsystempie
import { GetBuilding, GetFloor, GetRoom } from '@/api/archives/MonitorPoint'
import moment from 'moment'
import airconditionsystem from '../modules/airconditionsystemForm'
import { cascader } from 'ant-design-vue'

const data = []
var gundata = []
const newdata = []
var bulidingno = ''// 存放楼栋信息
var floor = ''// 存放楼层
var status1 = ''// 存放运行状态
var equipStatus = ''// 存放设备状态
// const linedata = [

// ]
const sourceData = [
    { type: '在运设备', value: null },
    { type: '停运设备', value: null },
    { type: '无设备', value: null }
]
const sourceData1 = [
    { type: '开启设备', value: null },
    { type: '关闭设备', value: null }
]
const pieScale = [{
  dataKey: 'percent',
  min: 0,
  formatter: '.0%'
}]
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
var BuildingOptions = []
const floorData = []
var tabledata1 = []
var piedata = []
var lightdate // 存放日期
var lightmonitor // 存放监测点

export default {
  mixins: [mixinDevice],
  components: {
    airconditionsystem,
    DetailList,
    cascader
  },
    data () {
    return {
      loading: false,
      disabled: true,
      data,
      gundata,
      newdata,
      sourceData,
      sourceData1,
      pieScale,
      pieStyle: {
        stroke: '#fff',
        lineWidth: 1
      },
      colheads,
      tabledata1,
      BuildingOptions,
      floorData,
      // locationData,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      visible: false,
      pagination: { total: 0,
        pageSize: 5, // 每页中显示10条数据
        showSizeChanger: true,
        pageSizeOptions: ['5', '10', '20', '50', '100'], // 每页中显示的数据
        showTotal: total => `共有 ${total} 条数据` // 分页中显示总的数据
        },
      linePlot: {},
      bulletPlot: {},
      lightdate,
      lightmonitor,
      bulidingno,
      floor,
      status1,
      equipStatus,
      Building: [],
      piedata
    }
    },
    // created () {
    // setTimeout(() => {
    //   this.loading = !this.loading
    // }, 1000)
    // },
    mounted: function () {
    this.getdata()
    this.gettable()
    this.getpie()
    this.getgun()
    this.getData2()
    // this.getlist()
    },
    methods: {
      getData2 () {
      GetBuilding().then(response => {
        this.Building = response.result
      })
    },
      getdata () {
        lightmonitor = 10000015
        lightdate = '2020-06-01'
        Getligsystemdata(lightdate, lightmonitor).then(response => {
        var data1 = response.result
        for (let i = 0; i < data1.length; i += 1) {
          // console.log(data1[i].dataTime.substring(11, 16))
         data.push({
          year: data1[i].dataTime.substring(11, 16),
          value: data1[i].ua
        }
        // console.log(newdata1)
        )
      }
        // console.log(data)
        this.linePlot = new Line(document.getElementById('container'), {
          title: {
            visible: true,
            text: '照明实时数据'
          },
          description: {
            visible: true,
            text: '照明曲线'
          },
           padding: 'auto',
           forceFit: true,
           data,
           xField: 'year',
           yField: 'value',
           smooth: true,
           interactions: [{
          type: 'slider',
          cfg: {
            start: 0.1,
            end: 0.2
          }
        }]
        })

        this.linePlot.render()
         })
    },
    handleOk () {
      // 新增/修改 成功时，重载列表
      this.gettable()
    },
    gettable () {
       var tabledata
       var length
      //  var length2
       var type = 2
        Getlitsystem(type).then(response => {
        tabledata = response.result
        length = tabledata.length
        console.log('返回数据', tabledata)
        this.tabledata1 = tabledata
        console.log('照明信息', this.tabledata1)
        console.log('运行状态', this.tabledata1.equipStatus)
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
       var runlength = 0
       var oklength = 0
       var nglength = 0
       var onlength = 0
       var offlength = 0
       var tabledata
       Getlitsystem(2).then(response => {
       tabledata = response.result
        for (let i = 0; i < tabledata.length; i += 1) {
          if (tabledata[i].switchStatus === 1) {
            runlength = runlength + 1
          } else if (tabledata[i].switchStatus === 2) {
            oklength = oklength + 1
          } else {
            nglength = nglength + 1
          }
          if (tabledata[i].equipStatus === 1 && tabledata[i].switchStatus !== 0) {
            onlength = onlength + 1
          } else if (tabledata[i].equipStatus === 0 && tabledata[i].switchStatus !== 0) { offlength = offlength + 1 }
        }
        this.sourceData[0].value = runlength
        this.sourceData[1].value = oklength
        this.sourceData[2].value = nglength
        this.sourceData1[0].value = onlength
        this.sourceData1[1].value = offlength
        console.log('饼图数据', this.sourceData)
        this.donutPlot = new Donut(document.getElementById('container2'), {
        forceFit: true,
        title: {
            visible: true,
            text: '设备状态'
        },
        description: {
            visible: true,
            text: '照明设备状况'
        },
        label: {
          type: 'spider'
        },
        radius: 0.6,
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
        // offset: 100,
        radius: 0.6,
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
    getgun () {
    lightmonitor = 10000015
    lightdate = '2020-06-01'
    Getligsystemdata(lightdate, lightmonitor).then(response => {
    var data1 = response.result
    for (let i = 0; i < 10; i += 1) {
          // console.log(data1[i].dataTime.substring(11, 16))
         gundata.push({
          title: `诊断点${i + 1}`,
          measures: [data1[i].p],
          targets: [data1[i].p]
        })
        }
        console.log(gundata)
    this.bulletPlot = new Bullet(document.getElementById('gun'), {
    title: {
    visible: true,
    text: '照明用电情况'
    },
    description: {
    visible: true,
    text: '预期照明用电与实际照明用电'
     },
    data: gundata,
    rangeMax: 20
})

   this.bulletPlot.render()
   })
   lightdate = ''
   },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    // 折线图和饼图的日期选择
    change (date, dateString) {
      lightdate = dateString
      // console.log(date1)
      return lightdate
    },
    // 折线图和饼图的监测点选择
    monitor (value) {
      lightmonitor = value
    },
    getdate1 () { // 查询
      lightmonitor = 10000015
      console.log('查询日期', lightdate)
      if (lightmonitor && lightdate) {
      console.log('查询参数', lightmonitor, lightdate)
      this.queryParam = {
        date: moment(new Date())
      }
      Getligsystemdata(lightdate, lightmonitor).then(response => {
        var newdata1 = response.result
        var newdata = []
        if (newdata1 !== '查询成功') {
        console.log('')
        for (let i = 0; i < 96; i += 1) {
        newdata.push({
          year: newdata1[i].dataTime.substring(11, 16),
          value: newdata1[i].p
        }
        // console.log(newdata1)
        )
      }
      //  console.log(newdata)
      this.linePlot.changeData(newdata)
      this.bulletPlot.changeData(newdata)
      this.$message.success('查询成功')
      } else { this.$message.warning('查询失败') }
       })
    } else { this.$message.warning('查询失败') }
    },
    // 表格的修改
    handleDelete (key) {
         const table = [...this.tabledata1]
        //  console.log('123', tabledata)
         this.tabledata1 = table.filter(item => item.key !== key)
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
       GetTabledata1(bulidingno, floor, status1, equipStatus).then(response => {
        tabledata = response.result
        console.log('查询结果', tabledata)
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
