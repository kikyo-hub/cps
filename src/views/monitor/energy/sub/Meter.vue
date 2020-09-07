<template>
  <div>
    <a-card >
      <div class="salesCard">
        <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}">
          <!-- <div class="extra-wrapper" slot="tabBarExtraContent">
            <div class="extra-item">
            </div>
          </div> -->
          <a-tab-pane loading="true" tab="本日用电" key="1">
            <a-row>
              <a-form layout="inline">
                <a-row :gutter="48">
                  <a-col :md="10" :sm="24">
                    <a-form-item label="选择用电设备">
                      <a-select placeholder="请选择" style="width:250px" @change="equip">
                        <a-select-option v-for="item in typeData" :key="item.value">
                          {{ item.label }}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :md="10" :sm="24">
                    <a-form-item label="选择监控日期">
                      <a-date-picker style="width: 140%" placeholder="请选择日期" @change="handleChange"/>
                    </a-form-item>
                  </a-col>
                  <a-col :md="4" :sm="24">
                    <a-form-item>
                      <a-button type="primary" @click="Clickmeter">查询</a-button>
                      <a-button style="margin-left: 8px" type="primary" @click="DataReturn">重置</a-button>
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-form>
            </a-row>
            <a-row :gutter="24">
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <div ref="monitorcontainer" style="height:350px;margin-top:15px"></div>
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <rank-list title="用电量时间排行" :list="rankList"/>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="本周用电" key="2">
            <a-row>
              <a-form layout="inline">
                <a-row :gutter="48">
                  <a-col :md="10" :sm="24">
                    <a-form-item label="选择用电设备">
                      <a-select placeholder="请选择" style="width:250px" @change="equip2">
                        <a-select-option v-for="item in typeData" :key="item.value">
                          {{ item.label }}
                        </a-select-option>
                      </a-select>
                    </a-form-item>
                  </a-col>
                  <a-col :md="10" :sm="24">
                    <a-form-item label="选择监控日期">
                      <a-range-picker
                        :format="dateFormat"
                        @change="handleChange2"
                      />
                    <!-- :defaultValue="date1"
                      @change="dateonChange1" -->
                    </a-form-item>
                  </a-col>
                  <a-col :md="4" :sm="24">
                    <a-form-item>
                      <a-button type="primary" @click="Clickmeterweek">查询</a-button>
                      <a-button style="margin-left: 8px" type="primary">重置</a-button>
                    </a-form-item>
                  </a-col>
                </a-row>
              </a-form>
            </a-row>
            <a-row>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <div ref="weekcontainer" style="height:350px;margin-top:-10px"></div>
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <rank-list title="用电量时间排行" :list="rankList2"/>
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>
  </div>
</template>
<script>
import { RankList } from '@/components'
// import { GetMeterDayData } from '@/api/energy/energy'
import echarts from 'echarts'
import { getDateStr, getTime } from '@/api/monitor/date'
import { getmeter, getmeterTodaydata, getmeterTodayrank, getmeterWeekdata, getmaterweekRank } from '@/api/monitor/items'
var monitorChart
var weekChart
const typeData = []

var rankList = [
  { name: '', total: 0 },
  { name: '', total: 0 },
  { name: '', total: 0 },
  { name: '', total: 0 },
  { name: '', total: 0 },
  { name: '', total: 0 },
  { name: '', total: 0 }
]
const rankList2 = [
  { name: '', total: 0 },
  { name: '', total: 0 },
  { name: '', total: 0 },
  { name: '', total: 0 },
  { name: '', total: 0 },
  { name: '', total: 0 },
  { name: '', total: 0 }
]

// const DataSet = require('@antv/data-set')

export default {
    components: {
    RankList
  },
  data () {
    return {
      rankList,
      rankList2,
      typeData,
      adress: '',
      adress2: '',
      date: '',
      dateString: '',
      dateFormat: 'YYYY/MM/DD 00:00:00'
    }
  },
  mounted () {
      this.Getmeter()
      this.GetmeterTodaydata()
      this.GetmaterRank()
      this.GetmeterWeekdata()
      this.GetmaterweekRank()
  },
  methods: {
      DataReturn () {
        this.GetmeterTodaydata()
        this.GetmaterRank()
      },
      Getmeter () {
        getmeter('空调').then(response => {
          this.typeData = response.result
          console.log('typeData', this.typeData)
        })
      },
      GetmeterTodaydata () {
        // var x = []
        var dataTime = []
        var ua = []
        var ub = []
        var uc = []
        var pAp = []
        getmeter('空调').then(response => {
        // console.log('typeData', getDateStr(0))
        getmeterTodaydata(getDateStr(0), response.result[0].value).then(response => {
          console.log('response.result', response.result)
          for (let i = 0; i < response.result.length; i++) {
          dataTime[i] = response.result[i].dataTime.substring(11, 16)
          ua[i] = response.result[i].ua
          ub[i] = response.result[i].ub
          uc[i] = response.result[i].uc
          pAp[i] = response.result[i].pap_r
          }
          // console.log('x', x)
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
              data: ['用电量', 'A相电压值', 'B相电压值', 'C相电压值']
          },
          xAxis: [
              {
                  type: 'category',
                  data: dataTime,
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
                  name: '电压值',
                  min: 200,
                  axisLabel: {
                      formatter: '{value} v'
                  }
              }
          ],
          series: [
              {
                  name: '用电量',
                  type: 'bar',
                  barWidth: 10,
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
                  data: pAp,
                  yAxisIndex: 0
              },
              {
                  name: 'A相电压值',
                  type: 'line',
                  smooth: true,
                  data: ua,
                  yAxisIndex: 1
              },
              {
                  name: 'B相电压值',
                  type: 'line',
                  smooth: true,
                  data: ub,
                  yAxisIndex: 1
              },
              {
                  name: 'C相电压值',
                  type: 'line',
                  smooth: true,
                  data: uc,
                  yAxisIndex: 1
              }
          ]
          }
          monitorChart = echarts.init(this.$refs.monitorcontainer, 'light')
          monitorChart.setOption(option)
        })
        })
      },
      GetmeterWeekdata () {
        var dataTime = []
        var pAp = []
        getmeter('空调').then(response => {
         getmeterWeekdata(getTime(1), getTime(8), response.result[0].value).then(response => {
           var res = response.result
           console.log('res1', res)
           for (let i = 0; i < response.result.length; i++) {
          dataTime[i] = response.result[i].dataTime.substring(11, 16)
          pAp[i] = response.result[i].pap_r.toFixed(2)
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
              data: ['用电量']
          },
          xAxis: [
              {
                  type: 'category',
                  data: dataTime,
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
                  barWidth: 10,
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
                  data: pAp,
                  yAxisIndex: 0
              }
          ]
          }
          weekChart = echarts.init(this.$refs.weekcontainer, 'light')
          weekChart.setOption(option)
         })
        })
      },
      GetmaterRank () {
        getmeter('空调').then(response => {
        getmeterTodayrank(getDateStr(0), response.result[0].value).then(response => {
          var res = response.result
          // console.log('res', res)
          for (let i = 0; i < 7; i++) {
               rankList[i].name = res[i].dataTime.substring(11, 16)
               rankList[i].total = res[i].pap_r
          }
          // console.log('rankList', rankList)
        })
        })
      },
      GetmaterweekRank () {
        getmeter('空调').then(response => {
        getmaterweekRank(getTime(1), getTime(8), response.result[0].value).then(response => {
          var res = response.result
          // console.log('res', res)
          for (let i = 0; i < res.length; i++) {
               rankList2[i].name = res[i].dataTime.substring(11, 16)
               rankList2[i].total = res[i].pap_r
          }
          // console.log('rankList', rankList)
        })
        })
      },
      handleChange (date, dateString) {
       this.date = dateString
       return this.date
      },
      handleChange2 (date, dateString) {
       this.dateString = dateString
       console.log(this.dateString[0], this.dateString[1])
      },
      equip (value) {
        this.adress = value
        return this.adress
      },
      equip2 (value) {
        this.adress2 = value
        return this.adress2
      },
      Clickmeter () {
        var dataTime = []
        var ua = []
        var ub = []
        var uc = []
        var pAp = []
        console.log(this.date, this.adress)
        getmeterTodayrank(this.date, this.adress).then(response => {
          var res = response.result
          console.log('res', res)
          if (res.length !== 0) {
            if (res.length > 7) {
          for (let i = 0; i < 7; i++) {
               rankList[i].name = res[i].dataTime.substring(11, 16)
               rankList[i].total = res[i].pap_r
          }
          } else {
           for (let i = 0; i < res.length; i++) {
               rankList[i].name = res[i].dataTime.substring(11, 16)
               rankList[i].total = res[i].pap_r
          }
          }
          } else {
          for (let i = 0; i < 7; i++) {
               rankList[i].total = 0
          }
         }
          console.log('rankList', rankList)
        })
        getmeterTodaydata(this.date, this.adress).then(response => {
          for (let i = 0; i < response.result.length - 1; i++) {
          dataTime[i] = response.result[i].dataTime.substring(11, 16)
          ua[i] = response.result[i].ua
          ub[i] = response.result[i].ub
          uc[i] = response.result[i].uc
          pAp[i] = response.result[i].pap_r
          }
          monitorChart.setOption({
           xAxis: [
        {
            type: 'category',
            data: dataTime,
            axisPointer: {
                type: 'shadow'
            }
        }
         ],
          series: [
        {
            name: '用电量',
            type: 'bar',
            barWidth: 10,
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
            data: pAp,
            yAxisIndex: 0
        },
        {
            name: 'A相电压值',
            type: 'line',
            smooth: true,
            data: ua,
            yAxisIndex: 1
        },
        {
            name: 'B相电压值',
            type: 'line',
            smooth: true,
            data: ub,
            yAxisIndex: 1
        },
        {
            name: 'C相电压值',
            type: 'line',
            smooth: true,
            data: uc,
            yAxisIndex: 1
        }
    ]
         })
        })
      },
      Clickmeterweek () {
         var dataTime = []
         var pAp = []
        getmeterWeekdata(this.dateString[0].substring(0, 10), this.dateString[1].substring(0, 10), this.adress2).then(response => {
           var res = response.result
           console.log('res22222', res)
           for (let i = 0; i < response.result.length; i++) {
          dataTime[i] = response.result[i].dataTime.substring(11, 16)
          pAp[i] = response.result[i].pap_r.toFixed(2)
          }
          weekChart.setOption({ xAxis: [
        {
            type: 'category',
            data: dataTime,
            axisPointer: {
                type: 'shadow'
            }
        }
         ],
          series: [
        {
            name: '用电量',
            type: 'bar',
            barWidth: 10,
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
            data: pAp
        }] })
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
