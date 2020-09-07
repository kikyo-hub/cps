<template>
  <div>
    <a-card :bordered="true">
      <!-- <Date></Date> -->
      <a-tabs type="card">
        <span slot="tabBarExtraContent">
          <a-radio-group default-value="0" @change="onChange">
            <a-radio-button value="0">时</a-radio-button>
            <a-radio-button value="1">日</a-radio-button>
            <a-radio-button value="2">月</a-radio-button>
          </a-radio-group>
        </span>
        <a-tab-pane key="1" tab="用能统计" forceRender>
          <div>
            <a-row>
              <a-form layout="inline">
                <!-- <a-col :span="4"></a-col> -->
                <a-col :span="12" v-show="hour">
                  <a-form-item label="选择时间">
                    <a-range-picker
                      show-time
                      :defaultValue="date1"
                      :format="dateFormat"
                      @change="dateonChange1"
                    />
                  </a-form-item>
                  <a-form-item><a-button type="primary" icon="search" @click="queryHour()">查询</a-button></a-form-item>
                </a-col>
                <a-col :span="10" v-show="date">
                  <a-form-item label="选择日期">
                    <a-range-picker :defaultValue="date2" :format="dateFormat2" @change="dateonChange2"/>
                  </a-form-item>
                  <a-form-item><a-button type="primary" icon="search" @click="queryDate()">查询</a-button></a-form-item>
                </a-col>
                <a-col :span="10" v-show="month">
                  <a-form-item label="选择日期">
                    <a-range-picker
                      :placeholder="['开始月份', '结束月份']"
                      format="YYYY-MM"
                      :mode="mode2"
                    />
                    <a-form-item><a-button type="primary" icon="search" @click="queryMonth()">查询</a-button></a-form-item>
                  </a-form-item>
                </a-col>
                <!-- <a-col :span="2">
                  <a-form-item><a-button type="primary" icon="search">查询</a-button></a-form-item>
                </a-col> -->
              </a-form>
            </a-row>
            <!-- <a-row> -->
            <br>
            <a-card :bordered="true" title="用能统计">
              <div ref="container" style="width:100%;height:500px;"></div></a-card>
            <!-- <a-card :bordered="true" title="用能占比">
              <div ref="container2" style="width:91%;height:350px;">
              </div>
            </a-card> -->
            <!-- <div ref="container" style="width:91%;height:350px;"></div>
            <div ref="container2" style="width:91%;height:350px;"></div> -->
            <!-- </a-row> -->
            <!-- <br><br><br>
            <div ref="container" style="width:100%;height:500px;"></div> -->
          </div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="用能比较" forceRender>
          <a-row>
            <a-form layout="inline">
              <!-- <a-col :span="4"></a-col> -->
              <a-col :span="20" v-show="hour">
                <a-form-item label="选择对比时间">
                  <a-range-picker
                    :defaultValue="date3"
                    :format="dateFormat"
                    @change="dateonChange3"
                    show-time />
                </a-form-item>
                <a-form-item >
                  <a-range-picker
                    :defaultValue="date4"
                    :format="dateFormat"
                    @change="dateonChange4"
                    show-time />
                </a-form-item>
                <a-form-item><a-button type="primary" icon="search" @click="queryHour()">查询</a-button></a-form-item>
              </a-col>
              <a-col :span="20" v-show="date">
                <a-form-item label="选择对比日期">
                  <a-range-picker :format="dateFormat2" :defaultValue="date7" @change="dateonChange7" />
                </a-form-item>
                <a-form-item>
                  <a-range-picker :format="dateFormat2" :defaultValue="date8" @change="dateonChange8" />
                </a-form-item>
                <a-form-item><a-button type="primary" icon="search" @click="queryDate()">查询</a-button></a-form-item>
              </a-col>
              <a-col :span="20" v-show="month">
                <a-form-item label="选择对比日期">
                  <a-range-picker
                    :placeholder="['开始月份', '结束月份']"
                    format="YYYY-MM"
                    :mode="mode2"
                  />
                  <a-range-picker
                    :placeholder="['开始月份', '结束月份']"
                    format="YYYY-MM"
                    :mode="mode2"
                  />
                  <a-form-item><a-button type="primary" icon="search" @click="queryMonth()">查询</a-button></a-form-item>
                </a-form-item>
              </a-col>
              <!-- <a-col :span="2">
                  <a-form-item><a-button type="primary" icon="search">查询</a-button></a-form-item>
                </a-col> -->
            </a-form>
            <br><br><br>
            <a-card :bordered="true" title="用能对比">
              <div ref="container3" style="width:85%;height:350px;">
              </div>
            </a-card>
            <a-card :bordered="true" title="差额曲线">
              <div ref="container4" style="width:85%;height:350px;"></div>
            </a-card>
          </a-row>
          <!-- <br><br><br> -->
          <!-- <div ref="container3" style="width:90%;height:400px;"></div>
          <div ref="container4" style="width:90%;height:350px;"></div> -->
        </a-tab-pane>
        <a-tab-pane key="3" tab="用能趋势" forceRender>
          <a-row>
            <a-form layout="inline">
              <!-- <a-col :span="4"></a-col> -->
              <a-col :span="14" v-show="hour">
                <a-form-item label="选择时间">
                  <a-range-picker
                    show-time
                    :defaultValue="date1"
                    :format="dateFormat"
                    @change="dateonChange5"
                  />
                </a-form-item>
                <a-form-item><a-button type="primary" icon="search" @click="queryHour()">查询</a-button></a-form-item>
              </a-col>
              <a-col :span="10" v-show="date">
                <a-form-item label="选择日期">
                  <a-range-picker :defaultValue="date2" :format="dateFormat2" @change="dateonChange6" />
                </a-form-item>
                <a-form-item><a-button type="primary" icon="search" @click="queryDate()">查询</a-button></a-form-item>
              </a-col>
              <a-col :span="10" v-show="month">
                <a-form-item label="选择日期">
                  <a-range-picker
                    :placeholder="['开始月份', '结束月份']"
                    format="YYYY-MM"
                    :mode="mode2"
                  />
                  <a-form-item><a-button type="primary" icon="search" @click="queryMonth()">查询</a-button></a-form-item>
                </a-form-item>
              </a-col>
              <!-- <a-col :span="2">
                  <a-form-item><a-button type="primary" icon="search">查询</a-button></a-form-item>
                </a-col> -->
            </a-form>
          </a-row>
          <br><br>
          <a-card :bordered="true" title="用能趋势">
            <div ref="container5" style="width:90%;height:500px;"></div>
          </a-card>
        </a-tab-pane>
        <a-tab-pane key="4" tab="用能分析" forceRender>
          <a-row>
            <a-form layout="inline">
              <!-- <a-col :span="4"></a-col> -->
              <a-col :span="4">
                <a-form-item label="选择用能类型">
                  <a-select default-value="1" style="width:120%">
                    <a-select-option value="1">
                      电能
                    </a-select-option>
                    <a-select-option value="2">
                      水能
                    </a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="14" v-show="hour">
                <a-form-item label="选择时间">
                  <a-range-picker
                    show-time
                    :format="dateFormat"
                  />
                </a-form-item>
                <a-form-item><a-button type="primary" icon="search" @click="queryHour()">查询</a-button></a-form-item>
              </a-col>
              <a-col :span="10" v-show="date">
                <a-form-item label="选择日期">
                  <a-range-picker :format="dateFormat2" />
                </a-form-item>
                <a-form-item><a-button type="primary" icon="search" @click="queryDate()">查询</a-button></a-form-item>
              </a-col>
              <a-col :span="10" v-show="month">
                <a-form-item label="选择日期">
                  <a-range-picker
                    :placeholder="['开始月份', '结束月份']"
                    format="YYYY-MM"
                    :mode="mode2"
                  />
                  <a-form-item><a-button type="primary" icon="search" @click="queryMonth()">查询</a-button></a-form-item>
                </a-form-item>
              </a-col>
            </a-form>
          </a-row>
          <a-row :gutter="[16,8]">
            <a-col :span="24">
              <a-card :body-style="{padding: '24px 24px'}" :bordered="false" style="height:140px" :hoverable="true">
                <a-row :gutter="[0,0]">
                  <a-card-meta>
                    <div slot="title">用电</div>
                    <a-avatar class="card-avatar" slot="avatar" :src="avatar1" size="large"/>
                    <div class="meta-cardInfo" slot="description">
                      <template>
                        <a-row :gutter="[0,0]">
                          <a-col :xl="4" :lg="8" :md="8" :sm="8" :xs="8">
                            <a-statistic
                              title="地区标准"
                              :value="178.31"
                              :precision="2"
                              :value-style="{ color: '#cf1322' }"
                              style="margin-right: 50px"
                            >
                              <template #prefix>
                                <a-icon type="arrow-down" />
                              </template>
                            </a-statistic>
                          </a-col>
                          <a-col :xl="4" :lg="8" :md="8" :sm="8" :xs="8">
                            <a-statistic
                              title="国家标准"
                              :value="209.12"
                              :precision="2"
                              :value-style="{ color: '#3f8600' }"
                              style="margin-right: 50px"
                            >
                              <template #prefix>
                                <a-icon type="arrow-up" />
                              </template>
                            </a-statistic>
                          </a-col>
                          <a-col :xl="4" :lg="8" :md="8" :sm="8" :xs="8">
                            <a-statistic
                              title="公司用能"
                              :value="205.63"
                              :precision="2"
                              :value-style="{ color: '#00A8E8' }"
                              style="margin-right: 50px"
                            >
                            </a-statistic>
                          </a-col>
                          <a-col :xl="4" :lg="8" :md="8" :sm="8" :xs="8">
                            <a-statistic
                              title="用电量KWH/费用元"
                              :value="323"
                              :precision="0"
                              :value-style="{ color: '#00A8E8' }"
                              style="margin-right: 50px"
                            >
                              <template #prefix>
                                <span> 400 /</span>
                              </template>
                            </a-statistic>
                          </a-col>
                        </a-row>
                      </template>
                    </div>
                  </a-card-meta>
                </a-row>
              </a-card>
            </a-col>
          </a-row>
          <a-card :bordered="true" title="用电标准">
            <div ref="container6" style="width:90%;height:350px;"></div>
          </a-card>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>
<script>
import { Trend } from '@/components'
import { getAllPaprBy2H, getAllPapr } from '@/api/data/humidity'
import moment from 'moment'
import echarts from 'echarts'
import { Statistic } from 'ant-design-vue'
// import Date from './Calendar'
// 获取所有监测点一日用电量
// getAllPapr

var myChart
var myChart2
var myChart3
var myChart4
var myChart5
var myChart6

export default {
    components: {
    // Date
    Trend,
    AStatistic: Statistic
  },
    data () {
        return {
            avatar1: require('@/assets/elec.svg'),
            dateString: ['2020-08-07 14:00:00', '2020-08-08 12:00:00'],
            dateString2: ['2020/08/08', '2020/08/10'],
            dateString3: ['2020-08-08 00:00:00', '2020-08-08 10:00:00'],
            dateString4: ['2020-08-08 10:00:00', '2020-08-08 20:00:00'],
            dateString5: ['2020-08-07 14:00:00', '2020-08-08 12:00:00'],
            dateString6: ['2020/08/08', '2020/08/10'],
            dateString7: ['2020/07/24', '2020/07/26'],
            dateString8: ['2020/07/27', '2020/07/29'],
            e: '0',
            yAxis: [],
            dateFormat: 'YYYY/MM/DD HH:00:00',
            dateFormat2: 'YYYY/MM/DD',
            date1: [moment('2020-08-07 14:00:00', 'YYYY/MM/DD HH:mm:ss'), moment('2020-08-08 12:00:00', 'YYYY/MM/DD HH:mm:ss')],
            date2: [moment('2020/08/08', 'YYYY/MM/DD'), moment('2020/08/10', 'YYYY/MM/DD')],
            date3: [moment('2020-08-08 00:00:00', 'YYYY/MM/DD HH:mm:ss'), moment('2020-08-08 10:00:00', 'YYYY/MM/DD HH:mm:ss')],
            date4: [moment('2020-08-08 10:00:00', 'YYYY/MM/DD HH:mm:ss'), moment('2020-08-08 20:00:00', 'YYYY/MM/DD HH:mm:ss')],
            date7: [moment('2020-07-24', 'YYYY/MM/DD'), moment('2020-07-26', 'YYYY/MM/DD')],
            date8: [moment('2020-07-27', 'YYYY/MM/DD'), moment('2020-07-29', 'YYYY/MM/DD')],
            mode: ['week', 'week'],
            mode2: ['month', 'month'],
            title: '日平均用电和用水',
            hour: true,
            date: false,
            week: false,
            month: false,

            devaddress: null
        }
    },
    created () {
        this.chart()
        this.chart3()
    },
    mounted () {
        this.chart()
        // this.chart2()
        // this.chart3()
        // this.chart4()
        // this.chart5()
        this.chart6()
    },
    methods: {
      dateonChange1 (date, dateString) {
      this.dateString = dateString
    },
    dateonChange2 (date, dateString) {
      this.dateString2 = dateString
    },
    dateonChange3 (date, dateString) {
      this.dateString3 = dateString
    },
    dateonChange4 (date, dateString) {
      this.dateString4 = dateString
    },
    dateonChange5 (date, dateString) {
      this.dateString5 = dateString
    },
    dateonChange6 (date, dateString) {
      this.dateString6 = dateString
    },
    dateonChange7 (date, dateString) {
      this.dateString7 = dateString
    },
    dateonChange8 (date, dateString) {
      this.dateString8 = dateString
    },
        level () {
          return (moment(this.dateString[1], 'YYYY/MM/DD HH:mm:ss') - moment(this.dateString[0], 'YYYY/MM/DD HH:mm:ss')) / 1000 / 60 / 60 / 2 + 1
        },
        level3 () {
          return (moment(this.dateString3[1], 'YYYY/MM/DD HH:mm:ss') - moment(this.dateString3[0], 'YYYY/MM/DD HH:mm:ss')) / 1000 / 60 / 60 / 2 + 1
        },
        level5 () {
          return (moment(this.dateString5[1], 'YYYY/MM/DD HH:mm:ss') - moment(this.dateString5[0], 'YYYY/MM/DD HH:mm:ss')) / 1000 / 60 / 60 / 2 + 1
        },
        onChange (e) {
          this.e = e.target.value
            switch (parseInt(e.target.value)) {
    case 0:
        this.hour = true
        this.date = this.week = this.month = false
        break
    case 1:
        this.date = true
        this.hour = this.week = this.month = false
         break
    case 2:
        this.month = true
        this.date = this.week = this.hour = false
         break
}
        },
        queryHour () {
           getAllPaprBy2H(this.dateString[0], this.dateString[1], this.level()).then(res => {
            //  console.log('小时', res)
             var xaxis = []
        var yAxis = []
        res.forEach(element => {
          xaxis.push(element.dataTime.substring(11, 16))
          yAxis.push(parseFloat(element.papR))
        })
          this.yAxis = yAxis
            myChart.setOption({
                    xAxis: {
            data: xaxis
        },
        series: [{
            name: '用水量',
            type: 'bar',
            data: []
        },
        {
            name: '用电量',
            type: 'bar',
            data: yAxis
        }]
                })
//                 getAllPaprBy2H(this.dateString[0], this.dateString[1], this.level()).then(res => {
//                   // console.log(res)
//                   var xaxis1 = []
//         var yAxiss = []
//         res.forEach(element => {
//           xaxis1.push(element.dataTime.substring(11, 16))
//           yAxiss.push(parseFloat(element.papR))
//         })
//         var yaxis1 = []
//         for (let i = 0; i < yAxis.length; i++) {
//           yaxis1.push((parseFloat(this.yAxis[i]) / parseFloat(yAxiss[i]) * 100).toFixed(4))
//         }
//         myChart2.setOption({
//     xAxis: [
//         {
//             data: xaxis1
//         }
//     ],
//     series: [
//         {
//             name: '用电量占比',
//             type: 'line',
//             data: yaxis1
//         },
//         {
//             name: '用水量占比',
//             type: 'line',
//             data: []
//         }
//     ]
// })
//                 })
    //             myChart5.setOption({
    //                 xAxis: {
    //         data: xaxis
    //     },
    //     series: [
    //     {
    //         name: '用电量',
    //         type: 'bar',
    //         data: yAxis
    //     },
    //     {
    //         name: '用电趋势',
    //         type: 'line',
    //         data: yAxis
    //     }
    // ]
    //             })
           })
          this.chart3()
          this.chart5()
        },
        queryDate () {
          getAllPapr(this.dateString2[0], this.dateString2[1]).then(res => {
            // console.log('天', res)
            var xaxis = []
        var yAxis = []
        res.forEach(element => {
          xaxis.push(element.dataTime.substring(0, 10))
          yAxis.push(parseFloat(element.papR))
        })
        this.yAxis = yAxis
        // console.log(xaxis, yAxis)
            myChart.setOption({
                    // title: {
                    //     text: '日用电用水量统计'
                    // },
                    xAxis: {
            data: xaxis
        },
        series: [{
            name: '用水量',
            type: 'bar',
            data: []
        },
        {
            name: '用电量',
            type: 'bar',
            data: yAxis
        }]
                })
          })
          getAllPapr(this.dateString6[0], this.dateString6[1]).then(res => {
            var xaxis = []
        var yAxis = []
        res.forEach(element => {
          xaxis.push(element.dataTime.substring(0, 10))
          yAxis.push(parseFloat(element.papR))
        })
            var option = {
    xAxis: [
        {
            data: xaxis
        }
    ],
    series: [
        {
            name: '用电量',
            type: 'bar',
            barWidth: 20,
            data: yAxis
        },
        {
            name: '用电趋势',
            type: 'line',
            data: yAxis
        }
    ]
}
             myChart5 = echarts.init(this.$refs.container5, 'light')
			myChart5.setOption(option)
          })
          this.compareDate()
        },
        queryMonth () {
        },

        // 用能比较按日查询
        compareDate () {
           getAllPapr(this.dateString7[0], this.dateString7[1]).then(res1 => {
             console.log('res1', res1)
             var xaxis1 = []
        var yAxis1 = []
        res1.forEach(element => {
          xaxis1.push(element.dataTime.substring(0, 10))
          yAxis1.push(parseFloat(element.papR))
        })
             getAllPapr(this.dateString8[0], this.dateString8[1]).then(res2 => {
               console.log('res2', res2)
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
        console.log(xaxis1, xaxis2, yAxis1, yAxis2, dif)

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
             myChart3 = echarts.init(this.$refs.container3, 'light')
      myChart3.setOption(option)
       var option2 = {
         tooltip: {
        trigger: 'axis'
    },
    xAxis: {
        type: 'category',
        data: xaxis2
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: dif,
        type: 'bar'
    }]
}
myChart4 = echarts.init(this.$refs.container4, 'light')
			myChart4.setOption(option2)
             })
           })
        },
        chart () {
          getAllPaprBy2H('2020-08-07 14:00:00', '2020-08-08 12:00:00', '13').then(res => {
            console.log('统计', res)
            var xaxis = []
        var yAxis = []
        res.forEach(element => {
          xaxis.push(element.dataTime.substring(11, 16))
          yAxis.push(parseFloat(element.papR))
        })
        this.yAxis = yAxis
        // this.chart2()
            myChart = echarts.init(this.$refs.container, 'light')
			myChart.setOption({
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            crossStyle: {
                color: '#999'
            }
        }
    },
    // 工具箱
    toolbox: {
        feature: {
            dataView: { show: true,
                  readOnly: false,
                optionToContent: opt => {
 var axisData = opt.xAxis[0].data
    var series = opt.series
    var table = '<table border="1" cellspacing="0" style="width:50%;text-align:center;position:absolute;left:25%"><tbody><tr>' +
                 '<td>时间</td>' +
                 '<td>' + series[0].name + '</td>' +
                 '<td>' + series[1].name + '</td>' +
                 '</tr>'
    for (var i = 0, l = axisData.length; i < l; i++) {
        table += '<tr>' +
                 '<td>' + axisData[i] + '</td>' +
                 '<td>' + 0 + 'm³' + '</td>' +
                 '<td>' + series[1].data[i] + 'kwh' + '</td>' +
                 '</tr>'
    }
    table += '</tbody></table>'
    return table
}
                },
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true },
            saveAsImage: { show: true }
        },
        left: '82%'
    },
    legend: {
        data: ['用水量', '用电量']
    },
    xAxis: [
        {
            type: 'category',
            data: xaxis,
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
            name: '用水量',
            type: 'bar',
            barGap: 0,
            barWidth: 25,
            itemStyle: {
            barBorderRadius: 10,
            color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    { offset: 0, color: '#36D1DC' },
                    { offset: 1, color: '#5B86E5' }
                ]
            )
        },
            emphasis: {
            itemStyle: {
            }
            },
            yAxisIndex: 1, // 选择y轴
            data: []
        },
        {
            name: '用电量',
            type: 'bar',
            barWidth: 20,
            itemStyle: {
            barBorderRadius: 10,
            color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    { offset: 0, color: '#14c8d4' },
                    { offset: 1, color: '#43eec6' }
                ]
            )
        },
            // color: [ 'aqua' ],
            data: yAxis
        }
    ]
})
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
            data: xaxis,
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
            data: yAxis
        },
        {
            name: '用电趋势',
            type: 'line',
            smooth: true,
            data: yAxis
        }
    ]
}
             myChart5 = echarts.init(this.$refs.container5, 'light')
			myChart5.setOption(option)
          })
        },
        chart2 () {
          getAllPaprBy2H('2020-07-25 2:00:00', '2020-07-25 22:00:00', '13').then(res => {
            // console.log('占比', res)
            var xaxis = []
        var yAxis = []
        res.forEach(element => {
          xaxis.push(element.dataTime.substring(11, 16))
          yAxis.push(parseFloat(element.papR))
        })
        var yaxis1 = []
        for (let i = 0; i < yAxis.length; i++) {
          yaxis1.push((parseFloat(this.yAxis[i]) / parseFloat(yAxis[i]) * 100).toFixed(4))
        }
        // console.log('yaxis', yAxis)
        // console.log('this.yAxis', this.yAxis)
        // console.log('yaxis1', yaxis1)
        var colors = ['#5793f3', '#d14a61', '#675bba']

 var option = {
    color: colors,
    // title: {
    //     text: '用能占比',
    //     subtext: '数据来自XXXX',
    //     left: '12%',
    //     align: 'right'
    // },
    tooltip: {
      trigger: 'axis',
      // axisPointer: {
      //       type: 'cross',
      //       crossStyle: {
      //           color: '#999'
      //       }
      //   }
      formatter: function (params) {
            return params[0].seriesName + ': ' + params[0].value + '%'
        }
    },
    legend: {
        data: ['用电量占比', '用水量占比']
    },
    grid: {
        top: 70,
        bottom: 50
    },
    xAxis: [
        {
            data: xaxis
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLabel: {
                formatter: '{value} %'
            }
        }
    ],
    series: [
        {
            name: '用电量占比',
            type: 'line',
            smooth: true,
            data: yaxis1
        },
        {
            name: '用水量占比',
            type: 'line',
            smooth: true,
            data: []
        }
    ]
}
myChart2 = echarts.init(this.$refs.container2, 'light')
			myChart2.setOption(option)
          })
    },
        chart3 () {
 getAllPaprBy2H(this.dateString3[0], this.dateString3[1], this.level3()).then(res1 => {
             console.log('res1', res1)
             var xaxis1 = []
        var yAxis1 = []
        res1.forEach(element => {
          xaxis1.push(element.dataTime.substring(5, 16))
          yAxis1.push(parseFloat(element.papR))
        })
             getAllPaprBy2H(this.dateString4[0], this.dateString4[1], this.level3()).then(res2 => {
               console.log('res2', res2)
                var xaxis2 = []
        var yAxis2 = []
        res2.forEach(element => {
          xaxis2.push(element.dataTime.substring(5, 16))
          yAxis2.push(parseFloat(element.papR))
        })
        var dif = []
        for (let i = 0; i < yAxis1.length; i++) {
         dif.push((yAxis2[i] - yAxis1[i]).toFixed(2))
        }
        console.log(xaxis1, xaxis2, yAxis1, yAxis2, dif)

var colors = ['#5793f3', '#d14a61', '#675bba']

var option = {
    color: colors,

    tooltip: {
        trigger: 'item',
        axisPointer: {
            type: 'line'
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
                        return '用电量2  ' + params.value +
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
                        return '用电量1  ' + params.value +
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
             myChart3 = echarts.init(this.$refs.container3, 'light')
      myChart3.setOption(option)
       var option2 = {
         tooltip: {
        trigger: 'axis'
    },
    xAxis: {
        type: 'category',
        data: xaxis2
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: dif,
        type: 'bar'
    }]
}
myChart4 = echarts.init(this.$refs.container4, 'light')
			myChart4.setOption(option2)
             })
           })
        },
        chart4 () {
        var colors = ['#5793f3', '#d14a61', '#675bba']

 var option = {
    color: colors,
    // title: {
    //     text: '用能占比',
    //     subtext: '数据来自XXXX',
    //     left: '12%',
    //     align: 'right'
    // },
    tooltip: {
        // trigger: 'none',
        axisPointer: {
            // type: 'cross'
        }
    },
    legend: {
        data: ['差额']
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
                    color: '#5793f3'
                }
            },
            // axisPointer: {
            //     label: {
            //         formatter: function (params) {
            //             return params.value +
            //                 (params.seriesData.length ? '占比：' + params.seriesData[0].data : '') + '%'
            //         }
            //     }
            // },
            data: ['0:00', '2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00']
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLabel: {
            }
        }
    ],
    series: [
        {
            name: '差额',
            type: 'line',
            smooth: true,
            data: [0.03, 0.06, 0.10, 0.11, 0.13, 0.07, 0.12, 0.15, 0.09, 0.10, 0.06, 0.02]
        }
    ]
}
myChart4 = echarts.init(this.$refs.container4, 'light')
			myChart4.setOption(option)
    },
        chart5 () {
          getAllPaprBy2H(this.dateString5[0], this.dateString5[1], this.level5()).then(res => {
            // console.log(res)
            var xaxis = []
        var yAxis = []
        res.forEach(element => {
          xaxis.push(element.dataTime.substring(11, 16))
          yAxis.push(parseFloat(element.papR))
        })
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
            data: xaxis,
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
            data: yAxis
        },
        {
            name: '用电趋势',
            type: 'line',
            smooth: true,
            data: yAxis
        }
    ]
}
             myChart5 = echarts.init(this.$refs.container5, 'light')
			myChart5.setOption(option)
          })
        },
        chart6 () {
          var option = {
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['实际用电']
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['0:00', '2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
            formatter: '{value} KWH'
        }
    },
    series: [
        {
            name: '实际用电',
            type: 'line',
            smooth: true,
            data: [100.0, 144.9, 157.0, 123.2, 125.6, 276.7, 235.6, 262.2, 332.6, 220.0, 226.4, 103.3],
            markPoint: {
                data: [
                    { type: 'max', name: '最大值' },
                    { type: 'min', name: '最小值' }
                ]
            },
            markLine: {
                data: [
                    { yAxis: '206', name: '地方标准' },
                    { yAxis: '178', name: '国家标准' }
                ]
            }
        }
    ]
}
myChart6 = echarts.init(this.$refs.container6, 'light')
			myChart6.setOption(option)
        }
    }
}
</script>
