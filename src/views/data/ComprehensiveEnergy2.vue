<template>
  <div>
    <a-card :bordered="true">
      <!-- <Date></Date> -->
      <a-tabs type="card">
        <span slot="tabBarExtraContent">
          <a-radio-group default-value="0" @change="onChange">
            <a-radio-button value="0">时</a-radio-button>
            <a-radio-button value="1">日</a-radio-button>
            <a-radio-button value="2">周</a-radio-button>
            <a-radio-button value="3">月</a-radio-button>
          </a-radio-group>
        </span>
        <a-tab-pane key="1" tab="用能统计" forceRender>
          <div>
            <a-row>
              <a-form layout="inline">
                <!-- <a-col :span="4"></a-col> -->
                <a-col :span="10" v-show="hour">
                  <a-form-item label="选择时间">
                    <a-range-picker
                      show-time
                      :defaultValue="date1"
                      :format="dateFormat"
                    />
                  </a-form-item>
                  <a-form-item><a-button type="primary" icon="search" @click="queryHour()">查询</a-button></a-form-item>
                </a-col>
                <a-col :span="10" v-show="date">
                  <a-form-item label="选择日期">
                    <a-range-picker :defaultValue="date2" :format="dateFormat2" />
                  </a-form-item>
                  <a-form-item><a-button type="primary" icon="search" @click="queryDate()">查询</a-button></a-form-item>
                </a-col>
                <a-col :span="14" v-show="week">
                  <!-- <a-form-item label="选择开始星期">
                    <a-week-picker placeholder="选择开始星期" />
                  </a-form-item>
                  <a-form-item label="选择结束星期">
                    <a-week-picker placeholder="选择结束星期" />
                  </a-form-item> -->
                  <a-range-picker
                    :placeholder="['开始星期', '结束星期']"
                    format="YYYY-WW星期"
                    :mode="mode"
                  />
                  <a-form-item><a-button type="primary" icon="search" @click="queryWeek()">查询</a-button></a-form-item>
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
              <div ref="container" style="width:93%;height:350px;"></div></a-card>
            <a-card :bordered="true" title="用能占比">
              <div ref="container2" style="width:93%;height:350px;">
              </div>
            </a-card>
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
                    show-time />
                </a-form-item>
                <a-form-item >
                  <a-range-picker
                    show-time />
                </a-form-item>
                <a-form-item><a-button type="primary" icon="search" @click="queryHour()">查询</a-button></a-form-item>
              </a-col>
              <a-col :span="20" v-show="date">
                <a-form-item label="选择对比日期">
                  <a-range-picker :format="dateFormat2" />
                </a-form-item>
                <a-form-item>
                  <a-range-picker :format="dateFormat2" />
                </a-form-item>
                <a-form-item><a-button type="primary" icon="search" @click="queryDate()">查询</a-button></a-form-item>
              </a-col>
              <a-col :span="22" v-show="week">
                <a-form-item label="选择上次星期段">
                  <!-- <a-week-picker placeholder="选择开始星期" /> -->
                  <a-range-picker
                    :placeholder="['开始星期', '结束星期']"
                    format="YYYY-WW星期"
                    :mode="mode"
                  />
                </a-form-item>
                <!-- <a-form-item>
                  <a-week-picker placeholder="选择结束星期" />
                </a-form-item> -->
                <a-form-item label="选择本次星期段">
                  <!-- <a-week-picker placeholder="选择开始星期" /> -->
                  <a-range-picker
                    :placeholder="['开始星期', '结束星期']"
                    format="YYYY-WW星期"
                    :mode="mode"
                  />
                </a-form-item>
                <!-- <a-form-item>
                  <a-week-picker placeholder="选择结束星期" />
                </a-form-item> -->
                <a-form-item><a-button type="primary" icon="search" @click="queryWeek()">查询</a-button></a-form-item>
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
              <div ref="container3" style="width:90%;height:350px;">
              </div>
            </a-card>
            <a-card :bordered="true" title="差额曲线">
              <div ref="container4" style="width:90%;height:350px;"></div>
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
              <a-col :span="10" v-show="hour">
                <a-form-item label="选择时间">
                  <a-range-picker
                    show-time
                    :defaultValue="date1"
                    :format="dateFormat"
                  />
                </a-form-item>
                <a-form-item><a-button type="primary" icon="search" @click="queryHour()">查询</a-button></a-form-item>
              </a-col>
              <a-col :span="10" v-show="date">
                <a-form-item label="选择日期">
                  <a-range-picker :defaultValue="date2" :format="dateFormat2" />
                </a-form-item>
                <a-form-item><a-button type="primary" icon="search" @click="queryDate()">查询</a-button></a-form-item>
              </a-col>
              <a-col :span="16" v-show="week">
                <a-form-item label="选择开始星期">
                  <!-- <a-week-picker placeholder="选择开始星期" />
                </a-form-item>
                <a-form-item label="选择结束星期">
                  <a-week-picker placeholder="选择结束星期" /> -->
                  <a-range-picker
                    :placeholder="['开始星期', '结束星期']"
                    format="YYYY-WW星期"
                    :mode="mode"
                  />
                </a-form-item>
                <a-form-item><a-button type="primary" icon="search" @click="queryWeek()">查询</a-button></a-form-item>
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
            <div ref="container5" style="width:93%;height:500px;"></div>
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
              <a-col :span="10" v-show="hour">
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
              <a-col :span="14" v-show="week">
                <a-range-picker
                  :placeholder="['开始星期', '结束星期']"
                  format="YYYY-WW星期"
                  :mode="mode"
                />
                <a-form-item><a-button type="primary" icon="search" @click="queryWeek()">查询</a-button></a-form-item>
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
                          <a-col :xl="3" :lg="8" :md="8" :sm="8" :xs="8">
                            <!-- <div style="font-size:14px;font-weight:bolder">
                              <trend flag="up">
                                <p>地区标准 </p>
                              </trend>
                              <p>
                                <span>{{ 1 }}<span>   KW.H</span></span>
                              </p>
                            </div> -->
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
                          <a-col :xl="3" :lg="8" :md="8" :sm="8" :xs="8">
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
                          <a-col :xl="3" :lg="8" :md="8" :sm="8" :xs="8">
                            <a-statistic
                              title="公司用能"
                              :value="205.63"
                              :precision="2"
                              :value-style="{ color: '#00A8E8' }"
                              style="margin-right: 50px"
                            >
                            </a-statistic>
                          </a-col>
                          <a-col :xl="3" :lg="8" :md="8" :sm="8" :xs="8">
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
                          <a-col :xl="3" :lg="8" :md="8" :sm="8" :xs="8">
                            <a-statistic
                              title="尖时段KWH/费用元"
                              :value="156"
                              :precision="0"
                              :value-style="{ color: '#00A8E8' }"
                              style="margin-right: 50px"
                            >
                              <template #prefix>
                                <span> 100 /</span>
                              </template>
                            </a-statistic>
                          </a-col>
                          <a-col :xl="3" :lg="8" :md="8" :sm="8" :xs="8">
                            <a-statistic
                              title="峰时段KWH/费用元"
                              :value="123"
                              :precision="0"
                              :value-style="{ color: '#00A8E8' }"
                              style="margin-right: 50px"
                            >
                              <template #prefix>
                                <span> 100 /</span>
                              </template>
                            </a-statistic>
                          </a-col>
                          <a-col :xl="3" :lg="8" :md="8" :sm="8" :xs="8">
                            <a-statistic
                              title="平时段KWH/费用元"
                              :value="89"
                              :precision="0"
                              :value-style="{ color: '#00A8E8' }"
                              style="margin-right: 50px"
                            >
                              <template #prefix>
                                <span> 100 /</span>
                              </template>
                            </a-statistic>
                          </a-col>
                          <a-col :xl="3" :lg="8" :md="8" :sm="8" :xs="8">
                            <a-statistic
                              title="谷时段KWH/费用元"
                              :value="56"
                              :precision="0"
                              :value-style="{ color: '#00A8E8' }"
                              style="margin-right: 50px"
                            >
                              <template #prefix>
                                <span> 100 /</span>
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
            <div ref="container6" style="width:93%;height:350px;"></div>
          </a-card>
        </a-tab-pane>
      </a-tabs>
    </a-card>
  </div>
</template>
<script>
import { Trend } from '@/components'
import moment from 'moment'
import echarts from 'echarts'
import { Statistic } from 'ant-design-vue'
// import Date from './Calendar'

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
            dateFormat: 'YYYY/MM/DD HH:mm:ss',
            dateFormat2: 'YYYY/MM/DD',
            date1: [moment('2020/07/07 00:00:00', 'YYYY/MM/DD HH:mm:ss'), moment('2020/07/07 22:00:00', 'YYYY/MM/DD HH:mm:ss')],
            date2: [moment('2020/06/01', 'YYYY/MM/DD'), moment('2020/06/16', 'YYYY/MM/DD')],
            mode: ['week', 'week'],
            mode2: ['month', 'month'],
            title: '日平均用电和用水',
			data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
            xaxis: ['0:00', '2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
            xaxis2: ['6-1', '6-2', '6-3', '6-4', '6-5', '6-6', '6-7', '6-8', '6-9', '6-10', '6-11', '6-12', '6-13', '6-14', '6-15', '6-16'],
            xaxis3: ['11周', '12周', '13周', '14周', '15周', '16周', '17周'],
            xaxis4: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月'],
            data3: [499, 715, 306.4, 529.2, 644.0, 576.0, 335.6, 148.5, 616.4, 594.1, 495.6, 564.4, 342, 654, 766, 132],
            data4: [99, 115, 106.4, 129.2, 244.0, 176.0, 135.6, 148.5, 216.4, 194.1, 195.6, 64.4, 42, 154, 166, 132],
            data2: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
            data5: [1024, 1058, 1298, 1345, 1034, 942, 1245],
            data6: [324, 358, 298, 345, 434, 442, 500],
            data7: [4324, 3358, 4298, 5345, 3434, 4442, 3500, 4376, 3245, 5486],
            data8: [1324, 1358, 1298, 1345, 1434, 1442, 982, 1024, 1234, 985],
            // 用能统计曲线数据
            data9: [0.06, 0.08, 0.1, 0.11, 0.12, 0.14, 0.17, 0.13, 0.14, 0.16, 0.09, 0.05],
            data10: [0.08, 0.04, 0.13, 0.09, 0.12, 0.10, 0.15, 0.11, 0.14, 0.12, 0.13, 0.09],
            hour: true,
            date: false,
            week: false,
            month: false
        }
    },
    mounted () {
        this.chart()
        this.chart2()
        this.chart3()
        this.chart4()
        this.chart5()
        this.chart6()
    },
    methods: {
        moment,
        onChange (e) {
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
        this.week = true
        this.date = this.hour = this.month = false
         break
    case 3:
        this.month = true
        this.date = this.week = this.hour = false
         break
}
        },
        queryHour () {
            myChart.setOption({
                    // title: {
                    //     text: '时用电用水量统计'
                    // },
                    xAxis: {
            data: this.xaxis
        },
        series: [{
            name: '用水量',
            type: 'bar',
            data: this.data
        },
        {
            name: '用电量',
            type: 'bar',
            data: this.data2
        }]
                })
                myChart3.setOption({
                    legend: {
        data: ['2020/6/5 2:00~10:00', '2020/6/6 2:00~10:00', '差额']
    },
    yAxis: [
        {
            data: ['2:00', '4:00', '6:00', '8:00', '10:00']
        },
        {
            data: ['2:00', '4:00', '6:00', '8:00', '10:00']
        }
    ],
        series: [
        {
            name: '差额',
            type: 'bar',
            data: [200, -170, -240, 244, 200]
        },
        {
            name: '2020/6/6 2:00~10:00',
            type: 'bar',
            data: [320, 302, 341, 374, 390]
        },
        {
            name: '2020/6/5 2:00~10:00',
            type: 'bar',
            data: [-120, -132, -101, -134, -190]
        }
    ]
                })
                myChart5.setOption({
                    // title: {
                    //     text: '时用能趋势'
                    // },
                    xAxis: {
            data: ['0:00', '2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00']
        },
        series: [
        {
            name: '用电量',
            type: 'bar',
            data: [100.0, 144.9, 157.0, 123.2, 125.6, 276.7, 235.6, 262.2, 332.6, 220.0, 226.4, 103.3]
        },
        {
            name: '用电趋势',
            type: 'line',
            data: [100.0, 144.9, 157.0, 123.2, 125.6, 276.7, 235.6, 262.2, 332.6, 220.0, 226.4, 103.3]
        }
    ]
                })
        },
        queryDate () {
            myChart.setOption({
                    // title: {
                    //     text: '日用电用水量统计'
                    // },
                    xAxis: {
            data: this.xaxis2
        },
        series: [{
            name: '用水量',
            type: 'bar',
            data: this.data3
        },
        {
            name: '用电量',
            type: 'bar',
            data: this.data4
        }]
                })
                myChart3.setOption({
                    legend: {
        data: ['2020/6/4~2020/6/9', '2020/6/10~2020/6/15', '差额']
    },
                    yAxis: [
        {
            data: ['6/4', '6/5', '6/6', '6/7', '6/8', '6/9']
        },
        {
            data: ['6/10', '6/11', '6/12', '6/13', '6/14', '6/15']
        }
    ],
        series: [
        {
            name: '差额',
            type: 'bar',
            data: [-100, 300, -70, -140, 144, 150]
        },
        {
            name: '2020/6/10~2020/6/15',
            type: 'bar',
            data: [200, 220, 202, 241, 174, 290]
        },
        {
            name: '2020/6/4~2020/6/9',
            type: 'bar',
            data: [-300, -80, -102, -91, -154, -90]
        }
    ]
                })
                myChart5.setOption({
                    // title: {
                    //     text: '日用能趋势'
                    // },
                    xAxis: {
            data: ['6-1', '6-2', '6-3', '6-4', '6-5', '6-6', '6-7', '6-8', '6-9', '6-10', '6-11', '6-12', '6-13', '6-14', '6-15', '6-16']
        },
        series: [
        {
            name: '用电量',
            type: 'bar',
            data: [499, 715, 306.4, 529.2, 644.0, 576.0, 335.6, 148.5, 616.4, 594.1, 495.6, 564.4, 342, 654, 766, 132]
        },
        {
            name: '用电趋势',
            type: 'line',
            data: [499, 715, 306.4, 529.2, 644.0, 576.0, 335.6, 148.5, 616.4, 594.1, 495.6, 564.4, 342, 654, 766, 132]
        }
    ]
                })
        },
        queryWeek () {
            myChart.setOption({
                    // title: {
                    //     text: '周用电用水量统计'
                    // },
                    xAxis: {
            data: this.xaxis3
        },
        series: [{
            name: '用水量',
            type: 'bar',
            data: this.data5
        },
        {
            name: '用电量',
            type: 'bar',
            data: this.data6
        }]
                })
                myChart3.setOption({
                    legend: {
        data: ['2020 第10周~13周', '2020 第14周~17周', '差额']
    },
                    yAxis: [
        {
            data: ['第10周', '第11周', '第12周', '第13周']
        },
        {
            data: ['第14周', '第15周', '第16周', '第17周']
        }
    ],
        series: [
        {
            name: '差额',
            type: 'bar',
            data: [300, -70, -140, 144]
        },
        {
            name: '2020 第14周~17周',
            type: 'bar',
            data: [220, 202, 241, 174]
        },
        {
            name: '2020 第10周~13周',
            type: 'bar',
            data: [-80, -102, -91, -154]
        }
    ]
                })
                myChart5.setOption({
                    // title: {
                    //     text: '周用能趋势'
                    // },
                    xAxis: {
            data: ['第14周', '第15周', '第16周', '第17周', '第18周', '第19周']
        },
        series: [
        {
            name: '用电量',
            type: 'bar',
            data: [1220, 1202, 1541, 1174, 1256, 1564]
        },
        {
            name: '用电趋势',
            type: 'line',
            data: [1220, 1202, 1541, 1174, 1256, 1564]
        }
    ]
                })
        },
        queryMonth () {
            myChart.setOption({
                    // title: {
                    //     text: '月用电用水量统计'
                    // },
                    xAxis: {
            data: this.xaxis4
        },
        series: [{
            name: '用水量',
            type: 'bar',
            data: this.data7
        },
        {
            name: '用电量',
            type: 'bar',
            data: this.data8
        }]
                })
                myChart3.setOption({
                    legend: {
        data: ['2020 第1月~3月', '2020 第4月~7月', '差额']
    },
                    yAxis: [
        {
            data: ['第1月', '第1月', '第2月', '第3月']
        },
        {
            data: ['第4月', '第5月', '第6月', '第7月']
        }
    ],
        series: [
        {
            name: '差额',
            type: 'bar',
            data: [100, -170, -100, 114]
        },
        {
            name: '2020 第4月~7月',
            type: 'bar',
            data: [200, 202, 201, 134]
        },
        {
            name: '2020 第1月~3月',
            type: 'bar',
            data: [-180, -202, -91, -124]
        }
    ]
                })
                myChart5.setOption({
                    // title: {
                    //     text: '周用能趋势'
                    // },
                    xAxis: {
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月']
        },
        series: [
        {
            name: '用电量',
            type: 'bar',
            data: [4324, 3358, 4298, 5345, 3434, 4442, 3500, 4376, 3245, 5486]
        },
        {
            name: '用电趋势',
            type: 'line',
            data: [4324, 3358, 4298, 5345, 3434, 4442, 3500, 4376, 3245, 5486]
        }
    ]
                })
        },
        chart () {
             myChart = echarts.init(this.$refs.container, 'light')
			myChart.setOption({
    //             title: {
    //     text: '时用电用水量统计',
    //     subtext: '数据来自XXXX',
    //     left: '12%',
    //     align: 'right'
    // },
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
            dataView: { show: true, readOnly: false },
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
            data: this.xaxis,
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
                formatter: '{value} t'
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
            data: this.data
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
            data: this.data2
        }
    ]
})
        },
        chart2 () {
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
        data: ['用电量占比', '用水量占比']
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
                    color: '#d14a61'
                }
            },
            axisPointer: {
                label: {
                    formatter: function (params) {
                        return params.value +
                            (params.seriesData.length ? '占比：' + params.seriesData[0].data : '') + '%'
                    }
                }
            },
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
            name: '用电量占比',
            type: 'line',
            smooth: true,
            data: [0.03, 0.06, 0.10, 0.11, 0.13, 0.07, 0.12, 0.15, 0.09, 0.10, 0.06, 0.02]
        },
        {
            name: '用水量占比',
            type: 'line',
            smooth: true,
            data: [0.01, 0.05, 0.12, 0.13, 0.11, 0.12, 0.15, 0.09, 0.10, 0.06, 0.04, 0.03]
        }
    ]
}
myChart2 = echarts.init(this.$refs.container2, 'light')
			myChart2.setOption(option)
    },
        chart3 () {
           var option = {
    // tooltip: {
    //     trigger: 'axis',
    //     axisPointer: {            // 坐标轴指示器，坐标轴触发有效
    //         type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
    //     }
    // },
    // title: {
    //     text: '用能对比',
    //     subtext: '数据来自XXXX',
    //     left: '12%',
    //     align: 'right'
    // },
    legend: {
        data: ['2020/6/5 2:00~10:00', '2020/6/6 2:00~10:00', '差额']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
    {
        type: 'value',
        axisLabel: {
            formatter: function (value) {
                return (Math.abs(value) + 'kwh')
            }
        }
    }
],
    yAxis: [
        {
            type: 'category',
            axisTick: {
                show: false
            },
            data: ['2:00', '4:00', '6:00', '8:00', '10:00']
        },
        {
            type: 'category',
            axisTick: {
                show: false
            },
            data: ['2:00', '4:00', '6:00', '8:00', '10:00']
        }
    ],
    series: [
        {
            name: '差额',
            type: 'bar',
            // color: [ '#9FE6B8' ],
            barWidth: 13,
            itemStyle: {
            barBorderRadius: 15,
            color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    { offset: 0, color: '#49A09D' },
                    { offset: 1, color: '#348AC7' }
                ]
            )
        },
            label: {
                show: true,
                position: 'inside'
            },
            data: [200, -170, -240, 244, 200]
        },
        {
            name: '2020/6/6 2:00~10:00',
            type: 'bar',
            barWidth: 13,
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
            stack: '1',
            // color: [ 'aqua' ],
            label: { normal: { show: true, position: 'right' } },
            data: [320, 302, 341, 374, 390]
        },
        {
            name: '2020/6/5 2:00~10:00',
            type: 'bar',
            // color: [ '#32C5E9' ],
            barWidth: 13,
            itemStyle: {
            barBorderRadius: 15,
            color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    { offset: 0, color: '#4CB8C4' },
                    { offset: 1, color: '#3CD3AD' }
                ]
            )
        },
            stack: '1',
            label: { normal: { show: true,
            position: 'left',
            formatter: function (value) {
                console.log(value)
                return (Math.abs(value.data))
                } } },
            data: [-120, -132, -101, -134, -190]
        }
    ]
}
             myChart3 = echarts.init(this.$refs.container3, 'light')
			myChart3.setOption(option)
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
           var option = {
            //    title: {
            //             text: '时用能趋势'
            //         },
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
            data: ['0:00', '2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
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
            data: [100.0, 144.9, 157.0, 123.2, 125.6, 276.7, 235.6, 262.2, 332.6, 220.0, 226.4, 103.3]
        },
        {
            name: '用电趋势',
            type: 'line',
            smooth: true,
            data: [100.0, 144.9, 157.0, 123.2, 125.6, 276.7, 235.6, 262.2, 332.6, 220.0, 226.4, 103.3]
        }
    ]
}
             myChart5 = echarts.init(this.$refs.container5, 'light')
			myChart5.setOption(option)
        },
        chart6 () {
          var option = {
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['实际用电']
    },
    // toolbox: {
    //     show: true,
    //     feature: {
    //         dataView: { readOnly: false },
    //         magicType: { type: ['line', 'bar'] },
    //         restore: {},
    //         saveAsImage: {}
    //     }
    // },
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
