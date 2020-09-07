<template>
  <a-card>
    <router-link :to="{ name: 'energyconsumption'}">
      <a-row :gutter="[16,8]">
        <a-col :span="6">
          <a-card :body-style="{padding: '24px 24px'}" :bordered="true" style="height:140px" :hoverable="true">
            <a-row :gutter="[0,0]">
              <a-card-meta>
                <div slot="title">用电</div>
                <!-- <div>用电百分比:{{ monitorPercentag }}</div> -->
                <a-avatar class="card-avatar" slot="avatar" :src="avatar1" size="large"/>
                <div class="meta-cardInfo" slot="description">
                  <template>
                    <a-row :gutter="[0,0]">
                      <a-col :xl="8" :lg="8" :md="8" :sm="8" :xs="8">
                        <div style="font-size:14px;font-weight:bolder">
                          <div v-if="this.yesterdayEnergySum > this.todayEnergySum">
                            <trend flag="up">
                              <p>昨日</p>
                            </trend>
                          </div>
                          <div v-else>
                            <trend flag="down">
                              <p>昨日</p>
                            </trend>
                          </div>
                          <p>
                            <span>{{ yesterdayEnergySum }}<span>   kWh</span></span>
                          </p>
                        </div>
                      </a-col>
                      <a-col :xl="8" :lg="8" :md="8" :sm="8" :xs="8">
                        <div style="font-size:14px;font-weight:bolder">
                          <div v-if="yesterdayEnergySum < todayEnergySum">
                            <trend flag="up">
                              <p>今日</p>
                            </trend>
                          </div>
                          <div v-else>
                            <trend flag="down">
                              <p>今日</p>
                            </trend>
                          </div>
                          <p>
                            <span>{{ todayEnergySum }}<span>   kWh</span></span>
                          </p>
                        </div>
                      </a-col>
                      <a-col :xl="8" :lg="8" :md="8" :sm="8" :xs="8">
                        <div style="font-size:14px;font-weight:bolder">
                          <p>上周</p>
                          <span>{{ weekEnergySum }}<span>kWh</span></span>
                        </div>
                      </a-col>
                    </a-row>
                  </template>
                </div>
              </a-card-meta>
            </a-row>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card :body-style="{padding: '24px 24px'}" :bordered="true" style="height:140px" :hoverable="true">
            <a-row :gutter="[0,0]">
              <a-card-meta>
                <div slot="title">用水</div>
                <a-avatar class="card-avatar" slot="avatar" :src="avatar2" size="large"/>
                <div class="meta-cardInfo" slot="description">
                  <template>
                    <a-row :gutter="[0,0]">
                      <a-col :xl="8" :lg="8" :md="8" :sm="8" :xs="8">
                        <div style="font-size:14px;font-weight:bolder">
                          <trend flag="down">
                            <p>昨日</p>
                          </trend>
                          <p>
                            <span>-<span>   m³</span></span>
                          </p>
                        </div>
                      </a-col>
                      <a-col :xl="8" :lg="8" :md="8" :sm="8" :xs="8">
                        <div style="font-size:14px;font-weight:bolder">
                          <trend flag="up">
                            <p>今日</p>
                          </trend>
                          <p>
                            <span>-<span>   m³</span></span>
                          </p>
                        </div>
                      </a-col>
                      <a-col :xl="8" :lg="8" :md="8" :sm="8" :xs="8">
                        <div style="font-size:14px;font-weight:bolder">
                          <p>上周</p>
                          <span>-<span>   m³</span></span>
                        </div>
                      </a-col>
                    </a-row>
                  </template>
                </div>
              </a-card-meta>
            </a-row>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card :body-style="{padding: '24px 24px'}" :bordered="true" style="height:140px" :hoverable="true">
            <a-row :gutter="[0,0]">
              <a-card-meta>
                <div slot="title">用气</div>
                <a-avatar class="card-avatar" slot="avatar" :src="avatar3" size="large"/>
                <div class="meta-cardInfo" slot="description">
                  <template>
                    <a-row :gutter="[0,0]">
                      <a-col :xl="8" :lg="8" :md="8" :sm="8" :xs="8">
                        <div style="font-size:14px;font-weight:bolder">
                          <trend flag="down">
                            <p>昨日</p>
                          </trend>
                          <p>
                            <span>-<span>   m³</span></span>
                          </p>
                        </div>
                      </a-col>
                      <a-col :xl="8" :lg="8" :md="8" :sm="8" :xs="8">
                        <div style="font-size:14px;font-weight:bolder">
                          <trend flag="up">
                            <p>今日</p>
                          </trend>
                          <p>
                            <span>-<span>   m³</span></span>
                          </p>
                        </div>
                      </a-col>
                      <a-col :xl="8" :lg="8" :md="8" :sm="8" :xs="8">
                        <div style="font-size:14px;font-weight:bolder">
                          <p>上周</p>
                          <span>-<span>   m³</span></span>
                        </div>
                      </a-col>
                    </a-row>
                  </template>
                </div>
              </a-card-meta>
            </a-row>
          </a-card>
        </a-col>
        <a-col :span="6">
          <a-card :body-style="{padding: '24px 24px'}" :bordered="true" style="height:140px" :hoverable="true">
            <a-row :gutter="[0,0]">
              <a-card-meta>
                <div slot="title">用热</div>
                <a-avatar class="card-avatar" slot="avatar" :src="avatar4" size="large"/>
                <div class="meta-cardInfo" slot="description">
                  <template>
                    <a-row :gutter="[0,0]">
                      <a-col :xl="8" :lg="8" :md="8" :sm="8" :xs="8">
                        <div style="font-size:14px;font-weight:bolder">
                          <trend flag="up">
                            <p>昨日</p>
                          </trend>
                          <p>
                            <span>-<span>   KJ</span></span>
                          </p>
                        </div>
                      </a-col>
                      <a-col :xl="8" :lg="8" :md="8" :sm="8" :xs="8">
                        <div style="font-size:14px;font-weight:bolder">
                          <trend flag="down">
                            <p>今日</p>
                          </trend>
                          <p>
                            <span>-<span>   KJ</span></span>
                          </p>
                        </div>
                      </a-col>
                      <a-col :xl="8" :lg="8" :md="8" :sm="8" :xs="8">
                        <div style="font-size:14px;font-weight:bolder">
                          <p>上周</p>
                          <span>-<span>   KJ</span></span>
                        </div>
                      </a-col>
                    </a-row>
                  </template>
                </div>
              </a-card-meta>
            </a-row>
          </a-card>
        </a-col>
      </a-row>
    </router-link>
    <a-row :gutter="[16,8]">
      <a-col :span="24">
        <a-card :loading="loading" :bordered="false" :body-style="{padding: '0'}" style="height:400px">
          <div class="salesCard">
            <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}">
              <a-tab-pane key="2" forceRender>
                <span slot="tab">
                  <a-icon type="appstore" />
                  监测点
                </span>
                <a-row>
                  <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
                    <rank-list title="监测用能排行" :list="monitorRankList"/>
                  </a-col>
                  <a-col :xl="17" :lg="12" :md="12" :sm="24" :xs="24">
                    <div ref="monitorcontainer" style="height:350px;margin-top:-10px"></div>
                  </a-col>
                  <a-col :xl="1" :lg="12" :md="12" :sm="24" :xs="24">
                    <div class="extra-item">
                      <a @click="Getmonitorday">今日  </a>
                      <a @click="Getmonitorweek">上周</a>
                    </div>
                  </a-col>
                </a-row>
              </a-tab-pane>
            </a-tabs>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="[16,8]">
      <a-col :span="8">
        <a-card :bordered="false" title="用能比例" :style="{ marginBottom: '24px' }">
          <!-- <a-icon type="bars" /> -->
          <div id="ratecontainer" style="height:100%"></div>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card
          :loading="loading"
          class="antd-pro-pages-dashboard-analysis-salesCard"
          :bordered="false"
          title="用能现状"
          :style="{ height: '100%' }">
          <div id="xzcontainer" style="height:100%"></div>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card class="antd-pro-pages-dashboard-analysis-salesCard" :bordered="false" title="用能趋势" :style="{ height: '100%' }">
          <div id="qushicontainer" style="height:100%"></div>
        </a-card>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import { RankList, Trend } from '@/components'
import { mixinDevice } from '@/utils/mixin'
import { Donut, StepLine, Radar } from '@antv/g2plot'
import { getTime, getDateStr, Percentage } from '@/api/monitor/date'
import { getTodaydata, getmonitorweekData, getmonitorRank, getmonitorweekDc,
         getdiagnosisdayData, getdiagnosisdayRank, getdiagnosisweekData } from '@/api/monitor/energyAnalysis'
import echarts from 'echarts'
const pieStyle = { stroke: '#fff', lineWidth: 1 }
const style = { stroke: '#fff', lineWidth: 1 }
const adjust = [{ type: 'dodge', marginRatio: 1 / 32 }]
var diagnosisChart
var monitorChart
var donutPlot
var radarPlot
var data = []
const qushidata = [
  { year: '1月', type: '电', value: 0 },
  { year: '1月', type: '水', value: 0 },
  { year: '1月', type: '气', value: 0 },
  { year: '1月', type: '热', value: 0 },
  { year: '2月', type: '电', value: 0 },
  { year: '2月', type: '水', value: 0 },
  { year: '2月', type: '气', value: 0 },
  { year: '2月', type: '热', value: 0 },
  { year: '3月', type: '电', value: 0 },
  { year: '3月', type: '水', value: 0 },
  { year: '3月', type: '气', value: 0 },
  { year: '3月', type: '热', value: 0 },
  { year: '4月', type: '电', value: 0 },
  { year: '4月', type: '水', value: 0 },
  { year: '4月', type: '气', value: 0 },
  { year: '4月', type: '热', value: 0 },
  { year: '5月', type: '电', value: 0 },
  { year: '5月', type: '水', value: 0 },
  { year: '5月', type: '气', value: 0 },
  { year: '5月', type: '热', value: 0 },
  { year: '6月', type: '电', value: 0 },
  { year: '6月', type: '水', value: 0 },
  { year: '6月', type: '气', value: 0 },
  { year: '6月', type: '热', value: 0 },
  { year: '7月', type: '电', value: 0 },
  { year: '7月', type: '水', value: 0 },
  { year: '7月', type: '气', value: 0 },
  { year: '7月', type: '热', value: 0 },
  { year: '8月', type: '电', value: 0 },
  { year: '8月', type: '水', value: 0 },
  { year: '8月', type: '气', value: 0 },
  { year: '8月', type: '热', value: 0 },
  { year: '9月', type: '电', value: 0 },
  { year: '9月', type: '水', value: 0 },
  { year: '9月', type: '气', value: 0 },
  { year: '9月', type: '热', value: 0 },
  { year: '10月', type: '电', value: 0 },
  { year: '10月', type: '水', value: 0 },
  { year: '10月', type: '气', value: 0 },
  { year: '10月', type: '热', value: 0 },
  { year: '11月', type: '电', value: 0 },
  { year: '11月', type: '水', value: 0 },
  { year: '11月', type: '气', value: 0 },
  { year: '11月', type: '热', value: 0 },
  { year: '12月', type: '电', value: 0 },
  { year: '12月', type: '水', value: 0 },
  { year: '12月', type: '气', value: 0 },
  { year: '12月', type: '热', value: 0 }
]
var todaydate = []
var diagnosisdayData = []
var yesterdaydate
var dayEnergyx = []
var dayEnergyy = []
var todayEnergySum = 0
var yesterdayEnergySum = 0
var weekEnergySum = 0
var monitorPercentage = 0
const weekdata = [
  { item: '周一', user: '电', score: 0 },
  { item: '周一', user: '水', score: 0 },
  { item: '周一', user: '气', score: 0 },
  { item: '周一', user: '热', score: 0 },
  { item: '周二', user: '电', score: 0 },
  { item: '周二', user: '水', score: 0 },
  { item: '周二', user: '气', score: 0 },
  { item: '周二', user: '热', score: 0 },
  { item: '周三', user: '电', score: 0 },
  { item: '周三', user: '水', score: 0 },
  { item: '周三', user: '气', score: 0 },
  { item: '周三', user: '热', score: 0 },
  { item: '周四', user: '电', score: 0 },
  { item: '周四', user: '水', score: 0 },
  { item: '周四', user: '气', score: 0 },
  { item: '周四', user: '热', score: 0 },
  { item: '周五', user: '电', score: 0 },
  { item: '周五', user: '水', score: 0 },
  { item: '周五', user: '气', score: 0 },
  { item: '周五', user: '热', score: 0 },
  { item: '周六', user: '电', score: 0 },
  { item: '周六', user: '水', score: 0 },
  { item: '周六', user: '气', score: 0 },
  { item: '周六', user: '热', score: 0 },
  { item: '周日', user: '电', score: 0 },
  { item: '周日', user: '水', score: 0 },
  { item: '周日', user: '气', score: 0 },
  { item: '周日', user: '热', score: 0 }
]
var monitorRankList = [
  { name: '', total: 0 },
  { name: '', total: 0 },
  { name: '', total: 0 },
  { name: '', total: 0 },
  { name: '', total: 0 },
  { name: '', total: 0 },
  { name: '', total: 0 }
]
var diagnosisRankList = [
  { name: '', total: 0 },
  { name: '', total: 0 },
  { name: '', total: 0 },
  { name: '', total: 0 },
  { name: '', total: 0 },
  { name: '', total: 0 },
  { name: '', total: 0 }
]

export default {
  name: 'EnergyAnalysis',
  mixins: [mixinDevice],
  components: {
    RankList,
    Trend
  },
  data () {
    return {
      loading: false,
      avatar1: require('@/assets/elec.svg'),
      avatar2: require('@/assets/water.svg'),
      avatar3: require('@/assets/gas.svg'),
      avatar4: require('@/assets/heat.svg'),
      userEng: [],
      diagnosisbarData: [],
      DXdata: [],
      DYdata: [],
      DXdata1: [],
      DYdata1: [],
      diagnosisRankList,
      monitorRankList,
      //
      pieStyle,
      style,
      adjust,
      data,
      qushidata,
      datatt: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
      todaydate,
      yesterdaydate,
      dayEnergyx,
      dayEnergyy,
      todayEnergySum,
      yesterdayEnergySum,
      weekEnergySum,
      monitorPercentage,
      weekdata,
      diagnosisdayData
    }
  },
  created () {
    // setTimeout(() => {
    //   this.loading = !this.loading
    // }, 1000)
    // this.loading = !this.loading
  },
  mounted () {
    // this.getdata()
    this.Getdount()
    this.GetStepLine()
    this.Getradar()
    this.GetmonitorToday()
    this.GetmonitordayRank()
    this.GetdiagnosisdayData()
    this.GetdiagnosisdayRank()
  },
  methods: {
    Getmonitorweek () {
      this.GetmonitorweekRank()
      this.GetmonitorweekDc()
    },
    Getmonitorday () {
      this.GetmonitorTo()
      this.GetmonitordayRank()
    },
    Getdiagnosisday () {
      this.GetdiagnosisweekData()
      donutPlot.updateConfig({ data: data })
      donutPlot.render()
    },
    GetmonitorTo () {
    var data1 = []
    getTodaydata(getDateStr(0), getDateStr(-1), getDateStr(-2)).then(response => {
        this.todaydate = response.result
        // console.log('todaydate', this.todaydate)
        for (let i = 0; i < this.todaydate.length; i++) {
          this.dayEnergyx[i] = this.todaydate[i].monitorName
          this.dayEnergyy[i] = parseFloat(this.todaydate[i].monitorday)
          data1.push({
                  type: this.dayEnergyx[i],
                  value: this.todaydate[i].monitorday
                    })
      }
       console.log('data1', data1)
      monitorChart.setOption({
           xAxis: [
        {
            type: 'category',
            data: this.dayEnergyx,
            axisPointer: {
                type: 'shadow'
            }
        }
         ],
         series: [
        {
            name: '用电量',
            type: 'bar',
            barWidth: 20,
        itemStyle: {
            barBorderRadius: 15,
            color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    { offset: 0, color: '#14c8d4' },
                    { offset: 1, color: '#43eec6' }
                ]
            )
        },
            data: this.dayEnergyy
        },
        {
            name: '用电趋势',
            type: 'line',
            smooth: true,
            data: this.dayEnergyy
        }
    ]
         })
         donutPlot.updateConfig({ data: data1 })
         donutPlot.render()
     })
    },
    GetmonitorweekRank () {
      getmonitorRank(getTime(1), getTime(8)).then(response => {
       var RankList = response.result
       for (let i = 0; i < 7; i++) {
        this.monitorRankList[i].name = RankList[i].monitorName
        this.monitorRankList[i].total = RankList[i].monitorday
       }
      //  console.log('monitorRankList', RankList)
    })
    },
    GetmonitorweekDc () {
       var data1 = []
       getmonitorweekDc(getTime(8), getTime(1)).then(response => {
         this.todaydate = response.result
         for (let i = 0; i < this.todaydate.length; i++) {
          this.dayEnergyx[i] = this.todaydate[i].monitorName
          this.dayEnergyy[i] = (this.todaydate[i].monitorday)
          data1.push({
                  type: this.dayEnergyx[i],
                  value: this.dayEnergyy[i]
                    })
         }
         monitorChart.setOption({
           xAxis: [
        {
            type: 'category',
            data: this.dayEnergyx,
            axisPointer: {
                type: 'shadow'
            }
        }
         ],
         series: [
        {
            name: '用电量',
            type: 'bar',
            barWidth: 20,
        itemStyle: {
            barBorderRadius: 15,
            color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    { offset: 0, color: '#14c8d4' },
                    { offset: 1, color: '#43eec6' }
                ]
            )
        },
            data: this.dayEnergyy
        },
        {
            name: '用电趋势',
            type: 'line',
            smooth: true,
            data: this.dayEnergyy
        }
    ]
         })
         donutPlot.updateConfig({ data: data1 })
         donutPlot.render()
       })
    },
    GetmonitorToday () {
    var data1 = []
     getTodaydata(getDateStr(0), getDateStr(-1), getDateStr(-2)).then(response => {
        this.todaydate = response.result
        // console.log('todaydate', this.todaydate)
        this.todayEnergySum = 0
        this.yesterdayEnergySum = 0
        for (let i = 0; i < this.todaydate.length; i++) {
          this.dayEnergyx[i] = this.todaydate[i].monitorName
          this.dayEnergyy[i] = (this.todaydate[i].monitorday)
          data1.push({
                  type: this.dayEnergyx[i],
                  value: this.dayEnergyy[i]
                    })
          this.todayEnergySum = parseFloat(this.todayEnergySum) + parseFloat(this.dayEnergyy[i])
          this.yesterdayEnergySum = parseFloat(this.yesterdayEnergySum) + parseFloat(this.todaydate[i].yesterday)
      }
       this.yesterdayEnergySum = this.yesterdayEnergySum.toFixed(2)
       this.todayEnergySum = this.todayEnergySum.toFixed(2)
      // console.log('todaydate', this.todaydate)
      // console.log('yesterdayEnergySum', this.yesterdayEnergySum)
      // console.log('todayEnergySum', this.todayEnergySum)
      var option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    legend: {
        data: ['用电量', '用电趋势']
    },
    xAxis: [
        {
            type: 'category',
            data: this.dayEnergyx,
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '用电量',
            axisLabel: {
                formatter: '{value} kwh'
            }
        },
        {
            type: 'value',
            name: '用水量',
            axisLabel: {
                formatter: '{value} m³'
            }
        }
    ],
    series: [
        {
            name: '用电量',
            type: 'bar',
            barWidth: 20,
        itemStyle: {
            barBorderRadius: 15,
            color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    { offset: 0, color: '#14c8d4' },
                    { offset: 1, color: '#43eec6' }
                ]
            )
        },
            data: this.dayEnergyy
        },
        {
            name: '用电趋势',
            type: 'line',
            smooth: true,
            data: this.dayEnergyy
        }
        //  {
        //     name: '用水量',
        //     type: 'bar',
        //     barWidth: 20,
        //     itemStyle: {
        //     barBorderRadius: 15,
        //     color: new echarts.graphic.LinearGradient(
        //         0, 0, 0, 1,
        //         [
        //             { offset: 0, color: '#9FA5D5' },
        //             { offset: 1, color: '#E8F5C6' }
        //         ]
        //     )
        // },
        //     // color: [ 'aqua' ],
        //     yAxisIndex: 1, // 选择y轴
        //     data: this.dayEnergyy
        // },
        // {
        //     name: '用水趋势',
        //     type: 'line',
        //     smooth: true,
        //     data: this.dayEnergyy
        // }
    ]
}
    monitorChart = echarts.init(this.$refs.monitorcontainer, 'light')
		monitorChart.setOption(option)
    monitorChart.on('click', params => {
      this.monitorPercentag = Percentage(params.data, this.todayEnergySum)
      // console.log('monitorPercentage', this.monitorPercentag)
  //     donutPlot.updateConfig({ data: data1 })
  //     donutPlot.render()
  })
       })
    },
    GetmonitordayRank () {
    getmonitorRank(getDateStr(0), getDateStr(-1)).then(response => {
       var RankList = response.result
       for (let i = 0; i < 7; i++) {
         this.monitorRankList[i].name = RankList[i].monitorName
         this.monitorRankList[i].total = RankList[i].monitorday
       }
      //  console.log('monitorRankList', this.monitorRankList)
    })
    },
  GetdiagnosisdayRank () {
    getdiagnosisdayRank(getDateStr(0), getDateStr(-1)).then(response => {
      var res = response.result
      for (let i = 0; i < res.length; i++) {
        this.diagnosisRankList[i].name = res[i].diagnosisName
        this.diagnosisRankList[i].total = res[i].diagnosistoday
       }
    })
  },
  GetdiagnosisdayData () {
    getdiagnosisdayData(getDateStr(0), getDateStr(-1)).then(response => {
      this.diagnosisdayData = response.result
      // console.log('diagnosisdayData', this.diagnosisdayData)
      for (let i = 0; i < this.diagnosisdayData.length; i++) {
        this.DXdata.push(this.diagnosisdayData[i].diagnosisName)
        this.DYdata.push(this.diagnosisdayData[i].diagnosistoday)
        }
     var option = {
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    legend: {
        data: ['用电量', '用电趋势']
    },
    xAxis: [
        {
            type: 'category',
            data: this.DXdata,
            axisPointer: {
                type: 'shadow'
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '用电量',
            axisLabel: {
                formatter: '{value} kwh'
            }
        },
        {
            type: 'value',
            name: '用水量',
            axisLabel: {
                formatter: '{value} m³'
            }
        }
    ],
    series: [
        {
            name: '用电量',
            type: 'bar',
            barWidth: 20,
        itemStyle: {
            barBorderRadius: 15,
            color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    { offset: 0, color: '#14c8d4' },
                    { offset: 1, color: '#43eec6' }
                ]
            )
        },
            data: this.DYdata
        },
        {
            name: '用电趋势',
            type: 'line',
            smooth: true,
            data: this.DYdata
        }
        // {
        //     name: '用水量',
        //     type: 'bar',
        //     barWidth: 20,
        //     itemStyle: {
        //     barBorderRadius: 15,
        //     color: new echarts.graphic.LinearGradient(
        //         0, 0, 0, 1,
        //         [
        //             { offset: 0, color: '#9FA5D5' },
        //             { offset: 1, color: '#E8F5C6' }
        //         ]
        //     )
        // },
        //     // color: [ 'aqua' ],
        //     yAxisIndex: 1, // 选择y轴
        //     data: this.datatt
        // },
        // {
        //     name: '用水趋势',
        //     type: 'line',
        //     smooth: true,
        //     data: this.datatt
        // }
    ]
}
    diagnosisChart = echarts.init(this.$refs.diagnosiscontainer, 'light')
		diagnosisChart.setOption(option)
    diagnosisChart.on('click', function (params) {
    // console.log('params: ', params)
      // donutPlot.updateConfig({ data: data1 })
      // donutPlot.render()
	})
    })
        },
  Getdount () {
    getdiagnosisdayData(getDateStr(0), getDateStr(-1)).then(response => {
      var res = response.result
      console.log('res: ', res)
      for (let i = 0; i < res.length; i++) {
          data.push({
                  type: res[i].diagnosisName,
                  value: res[i].diagnosistoday
                    })
      }
     donutPlot = new Donut(document.getElementById('ratecontainer'), {
      theme: {
        backgroundStyle: {
          fill: 'azure'
        }
      },
      forceFit: true,
      radius: 0.6,
      padding: 'auto',
      data,
      color: ['#5a93fc', '#90b6fd', '#c8dbfe', '#DAE2F8', '#93EDC7', '#14c8d4', '#43eec6', '#2EBF91', '#CCE4D1', '#EAD6EE', '#A0F1EA', '#91EAE4', '#544A7D'],
      angleField: 'value',
      colorField: 'type',
      label: {
        visible: false,
        type: 'spider'
      },
      legend: {
        visible: true,
        position: 'right'
      }
    })
    donutPlot.render()
    })
  },
  GetStepLine () {
   const step = new StepLine(document.getElementById('qushicontainer'), {
      title: {
        visible: true,
        text: ''
      },
      description: {
        visible: true,
        text: ''
      },
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
  Getradar () {
    var week1 = []
          //  console.log('getTime(8)', getTime(8))
          //  console.log(getTime(1))
  getmonitorweekData(getTime(8), getTime(1)).then(response => {
    var res = response.result
    // console.log('res', res)
    for (let i = 0; i < 7; i++) {
      week1[i] = Math.abs(((res[i + 1].monitorday) - (res[i].monitorday))).toFixed(2)
      week1[i] = parseFloat(week1[i])
      this.weekdata[4 * i].score = week1[i]
      this.weekEnergySum = this.weekEnergySum + parseFloat(week1[i])
    }
    this.weekEnergySum = this.weekEnergySum.toFixed(1)
    // console.log('weekdata', this.weekdata)
    radarPlot = new Radar(document.getElementById('xzcontainer'), {
      title: {
        visible: true,
        text: ''
      },
      data: this.weekdata,
      angleField: 'item',
      radiusField: 'score',
      seriesField: 'user',
      radiusAxis: {
        grid: {
          line: {
            type: 'line'
          }
        }
      },
      line: {
        visible: true
      },
      point: {
        visible: true,
        shape: 'circle'
      },
      legend: {
        visible: true,
        position: 'bottom-center'
      }
    })
    radarPlot.render()
       })
      },
  GetdiagnosisweekData () {
    var week1 = []
  getdiagnosisweekData(getTime(8), getTime(1)).then(response => {
    var res = response.result
    for (let i = 0; i < 7; i++) {
      week1[i] = Math.abs(((res[i + 1].diagnosistoday) - (res[i].diagnosistoday))).toFixed(2)
      this.weekdata[4 * i].score = week1[i]
    }
    radarPlot.changeData(weekdata)
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
