<template>
  <div>
    <a-card :bordered="false" title="单设备用水监控" :style="{ marginBottom: '24px' }">
      <div>
        <a-form layout="inline">
          <a-row :gutter="48">
            <a-col :md="10" :sm="24">
              <a-form-item label="选择用水设备">
                <a-select placeholder="请选择" default-value="0" style="width:250%">
                  <a-select-option value="0">电热水器</a-select-option>
                  <a-select-option value="1">空调用水</a-select-option>
                  <a-select-option value="2">清洁用水</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="10" :sm="24">
              <a-form-item label="选择监控日期">
                <a-date-picker style="width: 140%" placeholder="请选择日期"/>
              </a-form-item>
            </a-col>
            <a-col :md="4" :sm="24">
              <a-form-item>
                <a-button type="primary">查询</a-button>
                <a-button style="margin-left: 8px" type="primary">重置</a-button>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
      </div>
      <div class="salesCard">
        <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}">
          <div class="extra-wrapper" slot="tabBarExtraContent">
            <div class="extra-item">
            </div>
            <!-- <a-range-picker :style="{width: '256px'}" /> -->
          </div>
          <a-tab-pane loading="true" tab="本日用水" key="1">
            <a-row>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <bar :data="barData" title="实时用水" />
                <!-- <mini-area /> -->
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <rank-list title="用水量时间排行" :list="rankList"/>
              </a-col>
            </a-row>
          </a-tab-pane>
          <a-tab-pane tab="本周用水" key="2">
            <a-row>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <bar :data="barData2" title="每日用水" />
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <rank-list title="用水量时间排行" :list="rankList2"/>
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>
    <a-card :bordered="false" title="年度总用水监控" >
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="10" :sm="24">
            <a-form-item label="选择年份">
              <a-select placeholder="请选择" default-value="2019年度" style="width:250%" @change="handleChange">
                <a-select-option value="2015年度">2015年度</a-select-option>
                <a-select-option value="2016年度">2016年度</a-select-option>
                <a-select-option value="2017年度">2017年度</a-select-option>
                <a-select-option value="2018年度">2018年度</a-select-option>
                <a-select-option value="2019年度">2019年度</a-select-option>
                <a-select-option value="2020年度">2020年度</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="10" :sm="24">
            <a-form-item label="选择季度">
              <a-select placeholder="请选择" default-value="第一季度" style="width:250%" @change="handleChange2">
                <a-select-option value="第一季度">第一季度</a-select-option>
                <a-select-option value="第二季度">第二季度</a-select-option>
                <a-select-option value="第三季度">第三季度</a-select-option>
                <a-select-option value="第四季度">第四季度</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="4" :sm="24">
            <a-form-item>
              <a-button type="primary">查询</a-button>
              <a-button style="margin-left: 8px" type="primary">重置</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>

      <a-row :gutter="24">
        <a-col :md="10" :sm="24">
          <h3>{{ year }}</h3>
          <div>
            <div>
              <v-chart :force-fit="true" :height="405" :data="pieData" :scale="pieScale">
                <v-tooltip :showTitle="false" dataKey="item*percent" />
                <v-axis />
                <!-- position="right" :offsetX="-140" -->
                <v-legend dataKey="item"/>
                <v-pie position="percent" color="item" :vStyle="pieStyle" />
                <v-coord type="theta" :radius="0.75" :innerRadius="0.6" />
              </v-chart>
            </div>
          </div>
        </a-col>
        <a-col :md="10" :sm="24">
          <h3>{{ quarter }}</h3>
          <bar :data="barData3" title="总用水量"/>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>
<script>
import { ChartCard, MiniArea, MiniBar, MiniProgress, RankList, Bar, Trend, NumberInfo, MiniSmoothArea } from '@/components'
import { GetMeterDayData, GetMeterWeekData, GetMeterYearData, GetWaterData } from '@/api/energy/energy'
const barData = []
const barData2 = []
const barData3 = []

const rankList = []
const rankList2 = []
const DataSet = require('@antv/data-set')
for (let i = 0; i < 7; i++) {
  rankList.push({
    name: (i) + '：00',
    total: 1234.56 - i * 100
  })
  rankList2.push({
    name: `第${i + 1}天`,
    total: 1234.56 - i * 100
  })
}
const pieScale = [{
  dataKey: 'percent',
  min: 0,
  formatter: '.0%'
}]

export default {
    components: {
    ChartCard,
    MiniArea,
    MiniBar,
    MiniProgress,
    RankList,
    Bar,
    Trend,
    NumberInfo,
    MiniSmoothArea
  },
  data () {
    return {
        barData,
        barData2,
        barData3,
        rankList,
        rankList2,
        pieScale,
        pieData: [],
        // sourceData,
        year: '2019年度',
        quarter: '第一季度',
        pieStyle: {
           stroke: '#fff',
           lineWidth: 1
      }
    }
  },
created: function () {
      // this.getdata()
      // this.getpieData()
      GetMeterDayData().then(response => {
        this.barData = response.result
      })
      GetMeterWeekData().then(response => {
        this.barData2 = response.result
      })
       GetWaterData().then(response => {
        this.barData3 = response.result
      })
      GetMeterYearData().then(response => {
         console.log(response.result)
        var sourceData = response.result
        var dv = new DataSet.View().source(sourceData)
      dv.transform({
        type: 'percent',
        field: 'count',
        dimension: 'item',
        as: 'percent'
      })
      this.pieData = dv.rows
      })
  },
  methods: {
      handleChange (value, Option) {
       this.year = value
       console.log(Option)
      },
      handleChange2 (value) {
       this.quarter = value
      }
//       getdata () {
// this.$http.get('/dashboard/energymonitoring').then(response => {
//   this.barData = response.result
// })
// this.$http.get('/dashboard/energy').then(response => {
//   this.barData2 = response.result
// })
// this.$http.get('/dashboard/aner').then(response => {
//   this.barData3 = response.result
// })
//       },
//       getpieData () {
//         this.$http.get('/dashboard/ene').then(response => {
//   // console.log(response.result)
//   var sourceData = response.result
//       var dv = new DataSet.View().source(sourceData)
//       dv.transform({
//         type: 'percent',
//         field: 'count',
//         dimension: 'item',
//         as: 'percent'
//       })
//       this.pieData = dv.rows
// })
//       }
  }
}
</script>
