<template>
  <div class="part3" id="pdfCentent">
    <p align="left" style="font-size:22px">3、 客户能源数据分析</p>
    <p align="left" style="font-size:20px">3.1 客户能源数据展示</p>
    <p style="margin-top:5px"></p>
    <a-row :gutter="[16,8]">
      <a-col :span="20">
        <div id="qushicontainer"></div>
      </a-col>
    </a-row>
    <p style="margin-top:1px"></p>
    <p align="center" style="font-size:18px"> 图3.1 各能源月消耗示意图</p>
    <a-card :bordered="false">
      <div ref="container3" style="width:100%;height:350px;"></div>
    </a-card>
    <p align="center" style="font-size:18px"> 图3.2 各能源日消耗对比图</p>
    <p align="left" style="font-size:20px">3.2 诊断点配置情况</p>
    <p style="font-size:18px">（1）诊断点配置目的</p>
    <p style="font-size:18px">当前，我国正处于能源转型的关键时期，能源利用效率低、能源成本高等问题十分突出。综合能源服务可以提高能效、降低投资运营成本，有利于推进能源供给侧改革，
      带动和提升能源相关产业的国际竞争力。通过配置诊断点来诊断当前企业用能情况，</p>
    <p style="font-size:18px">（2）诊断点配置简介</p>
    <p style="font-size:18px">诊断点是一个虚拟概念，通过诊断点将诊断单位与监测点联系，起到一个媒介作用，从而对系统的数据采集与诊断起到更好的支撑作用。例如：电能日、曲线统计诊断点的布控，方便系统对于医院的电、
      水能源使用情况进行采集统计、诊断分析。</p>
    <p align="left" style="font-size:20px">3.3 监测点配置情况</p>
    <p style="font-size:18px">（1）监测点配置目的</p>
    <p style="font-size:18px">系统通过已布置的监测点，对现有用能单位的能耗设备数据进行采集（如水、电、气、暖等），实时监测各能耗使用情况，对能耗数据进行统计与分析，根据系统分析结果提供节能策略与设备控制，
      从而达到有效节能的目的。系统秉承相互联系、相互制约和相互促进的科学能源管理理念、管理机制和方法，最终达到降低能源消耗、提高能源利用效率，推动节能工作的顺利开展。</p>
    <p align="left" style="font-size:18px">系统各监测点能耗表：</p>
    <div class="meta-cardInfo" slot="description">
      <template>
        <a-row :gutter="[0,0]">
          <a-col :xl="12" :lg="12" :md="12" :sm="12" :xs="12">
            <div>
              <a-table
                ref="table"
                style="margin-top: 10px"
                row-key="monitorName"
                :columns="monitorColumns"
                :data-source="monitorenergyData"
                :pagination="false"
                bordered>
              </a-table>
            </div>
          </a-col>
          <a-col :xl="12" :lg="12" :md="12" :sm="12" :xs="12">
            <div>
              <a-table
                ref="table"
                style="margin-top: 10px"
                row-key="monitorName1"
                :columns="monitorColumns1"
                :data-source="monitorenergyData1"
                :pagination="false"
                bordered>
              </a-table>
            </div>
          </a-col>
        </a-row>
      </template>
    </div>
    <p style="font-size:18px">（2）监测点配置简介</p>
    <p align="left" style="font-size:18px">系统各监测点配置表：</p>
    <div>
      <a-table
        ref="table"
        style="margin-top: 10px"
        row-key="monitorType"
        :columns="monitorTypeNumColumns"
        :data-source="monitorTypeNumData"
        :pagination="false"
        bordered>
      </a-table>
    </div>
    <p style="font-size:18px">依据被诊断单位的用能特点，系统布控的监测点是对于用户的用电、水、气、蒸汽、设备、环境等数据进行监测，以下对于监测点简单举例进行介绍。</p>
    <template v-if="monitordata">
      <p style="font-size:18px">1.  {{ monitordata[0].monitorName }}</p>
      <p style="font-size:18px">通过布控在客户的监测点：{{ monitordata[0].monitorName }}，{{ monitorDesc }}</p>
      <div id="KWH" style="width:90%"></div>
      <p align="center" style="font-size:18px"> 图3.3 {{ monitordata[0].monitorName }}用电量曲线图</p>
      <p style="font-size:18px">2.  {{ monitordata[2].monitorName }}</p>
      <p style="font-size:18px">通过布控在客户环境监测点：{{ monitordata[2].monitorName }}，{{ monitorDesc1 }}</p>
      <div id="KWH1" style="width:90%"></div>
      <p align="center" style="font-size:18px"> 图3.4 {{ monitordata[2].monitorName }}光照强度曲线图</p>
      <p style="font-size:18px">3.  {{ monitordata[3].monitorName }}</p>
      <p style="font-size:18px">通过布控在客户的监测点：{{ monitordata[3].monitorName }}，{{ monitorDesc2 }}</p>
      <div id="KWH2" style="width:90%"></div>
      <p align="center" style="font-size:18px"> 图3.5 {{ monitordata[3].monitorName }}用电量曲线图</p>
    </template>
  </div>
</template>

<script>
import { StepLine, Line } from '@antv/g2plot'
import echarts from 'echarts'
import { getOrgTree, getLineData, getAllPapr } from '@/api/data/humidity'
import { getTodaydata } from '@/api/monitor/energyAnalysis'
import { getDateStr } from '@/api/monitor/date'
import { GetMonitorNum } from '@/api/exception/diagnosisReport'

const monitorColumns = [
        // {
        //   title: '监测点ID',
        //   dataIndex: 'monitorID',
        //   slots: { title: 'monitorTitle' },
        //   scopedSlots: { customRender: 'monitorID' },
        //   key: 'monitorID',
        //   align: 'center'
        // },
        {
          title: '监测点名称',
          dataIndex: 'monitorName',
          slots: { title: 'monitorNameTitle' },
          scopedSlots: { customRender: 'monitorName' },
          key: 'monitorName',
          align: 'center'
        },
        {
          title: '监测点能耗',
          dataIndex: 'monitorEnergy',
          slots: { title: 'monitorEnergyTitle' },
          scopedSlots: { customRender: 'monitorEnergy' },
          key: 'monitorEnergy',
          align: 'center'
        }
]
const monitorenergyData = []
const monitorColumns1 = [
        {
          title: '监测点名称',
          dataIndex: 'monitorName1',
          slots: { title: 'monitorNameTitle' },
          scopedSlots: { customRender: 'monitorName1' },
          key: 'monitorName1',
          align: 'center'
        },
        {
          title: '监测点能耗',
          dataIndex: 'monitorEnergy1',
          slots: { title: 'monitorEnergyTitle' },
          scopedSlots: { customRender: 'monitorEnergy1' },
          key: 'monitorEnergy1',
          align: 'center'
        }
]
const monitorenergyData1 = []
const qushidata = [
  { year: '1月', type: '电', value: 70 },
  { year: '1月', type: '水', value: 30 },
  { year: '1月', type: '气', value: 4 },
  { year: '1月', type: '热', value: 5 },
  { year: '2月', type: '电', value: 80 },
  { year: '2月', type: '水', value: 45 },
  { year: '2月', type: '气', value: 5 },
  { year: '2月', type: '热', value: 6 },
  { year: '3月', type: '电', value: 85 },
  { year: '3月', type: '水', value: 35 },
  { year: '3月', type: '气', value: 4.5 },
  { year: '3月', type: '热', value: 5.5 },
  { year: '4月', type: '电', value: 90 },
  { year: '4月', type: '水', value: 50 },
  { year: '4月', type: '气', value: 6 },
  { year: '4月', type: '热', value: 7 },
  { year: '5月', type: '电', value: 99 },
  { year: '5月', type: '水', value: 49 },
  { year: '5月', type: '气', value: 5.9 },
  { year: '5月', type: '热', value: 6.9 },
  { year: '6月', type: '电', value: 100 },
  { year: '6月', type: '水', value: 50 },
  { year: '6月', type: '气', value: 7 },
  { year: '6月', type: '热', value: 8 },
  { year: '7月', type: '电', value: 140 },
  { year: '7月', type: '水', value: 70 },
  { year: '7月', type: '气', value: 7 },
  { year: '7月', type: '热', value: 8 },
  { year: '8月', type: '电', value: 150 },
  { year: '8月', type: '水', value: 90 },
  { year: '8月', type: '气', value: 9 },
  { year: '8月', type: '热', value: 12 },
  { year: '9月', type: '电', value: 130 },
  { year: '9月', type: '水', value: 90 },
  { year: '9月', type: '气', value: 13 },
  { year: '9月', type: '热', value: 19 },
  { year: '10月', type: '电', value: 130 },
  { year: '10月', type: '水', value: 100 },
  { year: '10月', type: '气', value: 21 },
  { year: '10月', type: '热', value: 13 },
  { year: '11月', type: '电', value: 130 },
  { year: '11月', type: '水', value: 110 },
  { year: '11月', type: '气', value: 23 },
  { year: '11月', type: '热', value: 15 },
  { year: '12月', type: '电', value: 110 },
  { year: '12月', type: '水', value: 80 },
  { year: '12月', type: '气', value: 13 },
  { year: '12月', type: '热', value: 15 }
]
const monitorTypeNumColumns = [
  {
    title: '监测点类型',
    dataIndex: 'monitorType',
    slots: { title: 'monitorTypeTitle' },
    scopedSlots: { customRender: 'monitorType' },
    key: 'monitorType',
    align: 'center'
  },
  {
    title: '各类型数量',
    dataIndex: 'monitorTypeNum',
    slots: { title: 'monitorTypeNumTitle' },
    scopedSlots: { customRender: 'monitorTypeNum' },
    key: 'monitorTypeNum',
    align: 'center'
  }
]
const monitorTypeNumData = []
var step
var linePlot
var myChart
var dayEnergyx = []
var dayEnergyy = []

export default {
    name: 'ReportPartS2',
    data () {
      return {
        qushidata,
        monitordata: '',
        dateString: '',
        treekey: '',
        treekey1: ' ',
        treekey2: '',
        descType: '',
        monitorDesc: '',
        monitorDesc1: '',
        monitorDesc2: '',
        dayEnergyx,
        dayEnergyy,
        monitorColumns,
        monitorenergyData,
        monitorColumns1,
        monitorenergyData1,
        monitorTypeNumColumns,
        monitorTypeNumData,
        monitorTypeData: ''
      }
    },
  mounted () {
    this.GetStepLine()
    this.GetData()
  },
  created () {
    this.getTime()
    this.getBackTime()
    getOrgTree().then(res => {
      this.monitordata = res
      console.log('this.monitordata: ', this.monitordata)
      this.treekey = this.monitordata[0].monitorId
      this.treekey1 = this.monitordata[2].monitorId
      this.treekey2 = this.monitordata[3].monitorId
      switch (parseInt(this.monitordata[0].deviceType)) {
        case 1:
          this.monitorDesc = '对该楼的东侧空调室外机使用情况进行实时监测，监测空调室外机的运转情况，结合空调使用房间的员工工作时间段进行控制空调室外机的开关或者调节适合当前办公区域以及环境的温度。其中，能效比（COP）是空调系统进行制冷运行时实际制冷量与实际输入功率之比，是反映系统节能情况的量化依据。'
        break
        case 3:
          this.monitorDesc = '对该楼层的电能使用情况进行实时监测，同时系统根据监测点返回的数据进行诊断分析，分析公司每层电能使用对比情况，对电能使用进行系统性优化。'
        break
        case 5:
          this.monitorDesc = '对顶楼的环境情况进行实时监测，监测室外环境变化，对于公司的能源使用具有指导性意义，同时有利于节能减排，符合系统诊断的初衷。'
        break
      }
      switch (parseInt(this.monitordata[2].deviceType)) {
        case 1:
          this.monitorDesc1 = '对该楼的东侧空调室外机使用情况进行实时监测，监测空调室外机的运转情况，结合空调使用房间的员工工作时间段进行控制空调室外机的开关或者调节适合当前办公区域以及环境的温度。其中，能效比（COP）是空调系统进行制冷运行时实际制冷量与实际输入功率之比，是反映系统节能情况的量化依据。'
        break
        case 3:
          this.monitorDesc1 = '对该楼层的电能使用情况进行实时监测，同时系统根据监测点返回的数据进行诊断分析，分析公司每层电能使用对比情况，对电能使用进行系统性优化。'
        break
        case 5:
          this.monitorDesc1 = '对顶楼的环境情况进行实时监测，监测室外环境变化，对于公司的能源使用具有指导性意义，同时有利于节能减排，符合系统诊断的初衷。'
        break
      }
      switch (parseInt(this.monitordata[3].deviceType)) {
        case 1:
          this.monitorDesc2 = '对该楼的东侧空调室外机使用情况进行实时监测，监测空调室外机的运转情况，结合空调使用房间的员工工作时间段进行控制空调室外机的开关或者调节适合当前办公区域以及环境的温度。其中，能效比（COP）是空调系统进行制冷运行时实际制冷量与实际输入功率之比，是反映系统节能情况的量化依据。'
        break
        case 3:
          this.monitorDesc2 = '对该楼层的电能使用情况进行实时监测，同时系统根据监测点返回的数据进行诊断分析，分析公司每层电能使用对比情况，对电能使用进行系统性优化。'
        break
        case 5:
          this.monitorDesc2 = '对顶楼的环境情况进行实时监测，监测室外环境变化，对于公司的能源使用具有指导性意义，同时有利于节能减排，符合系统诊断的初衷。'
        break
      }
      this.linetest()
      this.linetest1()
      this.linetest2()
      this.compareDate()
      this.GetmonitorDta()
    })
  },
  methods: {
    GetData () {
      GetMonitorNum().then(response => {
        this.monitorTypeData = response.result
        for (let i = 0; i < this.monitorTypeData.length; i++) {
          var monitordata2 = {}
          monitordata2.monitorType = this.monitorTypeData[i].deviceType
          monitordata2.monitorTypeNum = this.monitorTypeData[i].deviceTypeNum
          this.monitorTypeNumData.push(monitordata2)
        }
      })
    },
  // 获取当前时间
  getTime () {
        this.date = new Date().toLocaleString()
        this.dateString = this.date.substring(0, 9)
  },
   // 获取前一周时间
  getBackTime () {
        var myDate = new Date() // 获取今天日期
        myDate.setDate(myDate.getDate() - 6)
        var dateArray = []
        var dateTemp
        var flag = 1
        for (var i = 0; i < 7; i++) {
        dateTemp = '2020' + '/' + (myDate.getMonth() + 1) + '/' + myDate.getDate()
        dateArray.push(dateTemp)
        myDate.setDate(myDate.getDate() + flag)
        }
        this.backtime1 = dateArray[5]
        this.backtime2 = dateArray[4]
        this.backtime3 = dateArray[3]
  },
  // 电水气热能耗图
  GetStepLine () {
      step = new StepLine('qushicontainer', {
      // title: {
      //   visible: true,
      //   text: ''
      // },
      // description: {
      //   visible: true,
      //   text: ''
      // },
      padding: 'auto',
      forceFit: true,
      data: qushidata,
      xField: 'year',
      yField: 'value',
      label: {
        visible: true,
        type: 'point'
      },
      point: {
        visible: true,
        size: 5,
        shape: 'diamond',
        style: {
          fill: 'white',
          stroke: '#2593fc',
          lineWidth: 2
        }
      },
      legend: {
         position: 'right-top'
      },
      seriesField: 'type',
      responsive: true
     })
     step.render()
  },
  // 用能比较按日查询
  compareDate () {
      getAllPapr(this.backtime2, this.backtime1).then(res1 => {
      // console.log('res1', res1)
      var xaxis1 = []
      var yAxis1 = []
      res1.forEach(element => {
      xaxis1.push(element.dataTime.substring(0, 10))
      yAxis1.push(parseFloat(element.papR))
      })
      getAllPapr(this.backtime3, this.backtime2).then(res2 => {
      // console.log('res2', res2)
      var xaxis2 = []
      var yAxis2 = []
      res2.forEach(element => {
      xaxis2.push(element.dataTime.substring(0, 10))
      yAxis2.push(parseFloat(element.papR))
      })
      var dif = []
      for (let i = 0; i < yAxis1.length; i++) {
      dif.push((yAxis2[i] - yAxis1[i]).toFixed(2))
      }
      // console.log(xaxis1, xaxis2, yAxis1, yAxis2, dif)

      var colors = ['#5793f3', '#d14a61', '#675bba']

      var option = {
          color: colors,
          tooltip: {
          trigger: 'none',
          axisPointer: {
          type: 'cross'
          }
          },
          legend: {
          data: ['用电量1', '用电量2']
          },
          grid: {
            top: 70,
            bottom: 50
          },
          xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: colors[1]
                    }
                },
                axisPointer: {
                    label: {
                        formatter: function (params) {
                            return '用电量  ' + params.value +
                                (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                        }
                    }
                },
                data: xaxis2
            },
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                axisLine: {
                    onZero: false,
                    lineStyle: {
                        color: colors[0]
                    }
                },
                axisPointer: {
                    label: {
                        formatter: function (params) {
                            return '用电量  ' + params.value +
                                (params.seriesData.length ? '：' + params.seriesData[0].data : '')
                        }
                    }
                },
                data: xaxis1
            }
          ],
          yAxis: [
            {
                type: 'value'
            }
          ],
          series: [
            {
                name: '用电量1',
                type: 'line',
                xAxisIndex: 1,
                smooth: true,
                data: yAxis1
            },
            {
                name: '用电量2',
                type: 'line',
                smooth: true,
                data: yAxis2
            }
          ]
      }
      myChart = echarts.init(this.$refs.container3, 'light')
      myChart.setOption(option)
      })
    })
  },
  // 监测点随机三个能耗图
  linetest () {
    getLineData(this.treekey, this.dateString).then(response => {
      this.curvedata = response
      var data = []
      for (let i = 0; i < response.length; i++) {
        data.push({
                time: response[i].dataTime.substring(11, 16), type: '用电量', value: parseFloat(response[i].papR)
            })
      }
      this.papr = data
      linePlot = new Line('KWH', {
      description: {
        visible: true,
        text: '日曲线变化图'
      },
      padding: 'auto',
      forceFit: true,
      data: data,
      xField: 'time',
      yField: 'value',
      yAxis: {
        min: 200
        // tickInterval: 10
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
  linetest1 () {
    getLineData(this.treekey1, this.dateString).then(response => {
      this.curvedata = response
      var data = []
      for (let i = 0; i < response.length; i++) {
      data.push({
            time: response[i].dataTime.substring(11, 16), type: '光照强度', value: parseFloat(response[i].illuminance)
        })
      }
      this.papr = data
      linePlot = new Line('KWH1', {
      description: {
        visible: true,
        text: '日曲线变化图'
      },
      padding: 'auto',
      forceFit: true,
      data: data,
      xField: 'time',
      yField: 'value',
      yAxis: {
        min: 200
        // tickInterval: 10
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
  linetest2 () {
    getLineData(this.treekey2, this.dateString).then(response => {
      this.curvedata = response
      var data = []
      for (let i = 0; i < response.length; i++) {
        data.push({
                time: response[i].dataTime.substring(11, 16), type: '用电量', value: parseFloat(response[i].papR)
            })
      }
      this.papr = data
      linePlot = new Line('KWH2', {
      description: {
        visible: true,
        text: '日曲线变化图'
      },
      padding: 'auto',
      forceFit: true,
      data: data,
      xField: 'time',
      yField: 'value',
      yAxis: {
        min: 200
        // tickInterval: 10
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
  // 获取监测点能耗日数据
  GetmonitorDta () {
     getTodaydata(getDateStr(0), getDateStr(-1), getDateStr(-2)).then(response => {
        this.todaydate = response.result
        for (let i = 0; i < (this.todaydate.length) / 2; i++) {
          var monitordata = {}
          monitordata.monitorName = this.todaydate[i].monitorName
          monitordata.monitorEnergy = this.todaydate[i].monitorday
          this.monitorenergyData.push(monitordata)
        }
        for (let i = (this.todaydate.length) / 2; i < this.todaydate.length; i++) {
          var monitordata1 = {}
          monitordata1.monitorName1 = this.todaydate[i].monitorName
          monitordata1.monitorEnergy1 = this.todaydate[i].monitorday
          this.monitorenergyData1.push(monitordata1)
        }
     })
  }
  }
  }
</script>

<style lang="less" scoped>
.part3{text-indent: 40px;}
</style>
