<template>
  <div class="box">
    <a-card>
      <a-row :gutter="2">
        <a-col :span="5">
          <a-row>
            <a-col :span="24">
              <a-card>
                <template v-slot:title>
                  <router-link :to="{ name: 'energy'}">
                    用能统计
                  </router-link>
                </template>
                <span slot="extra">
                  <a-radio-group default-value="0" size="small">
                    <a-radio-button value="0">日</a-radio-button>
                    <a-radio-button value="1">月</a-radio-button>
                  </a-radio-group>
                </span>
                <div v-for="item in energy" :key="item.name">
                  <span>{{ item.name }}</span>
                  <a-progress :percent="item.num" status="active" :strokeWidth="16" style="display:inline-block;width:70%" :format="() => (Math.random() * 1000).toFixed(2) + ' ' + item.unit" />
                  <br /><br />
                </div>
              </a-card>
            </a-col>
            <!-- <a-divider /> -->
            <a-col :span="24">
              <a-card>
                <template v-slot:title>
                  <router-link :to="{ name: 'diagnosis_report'}">
                    用电排行
                  </router-link>
                </template>
                <span slot="extra">
                  <a-radio-group default-value="0" size="small">
                    <a-radio-button value="0">日</a-radio-button>
                    <a-radio-button value="1">月</a-radio-button>
                  </a-radio-group>
                </span>
                <rank-list :list="rank"/>
              </a-card>
            </a-col>
          </a-row>
        </a-col>
        <a-col :span="14"><flow></flow>
        </a-col>
        <a-col :span="5">
          <a-card>
            <template v-slot:title>
              <router-link :to="{ name: 'benchmark'}">
                能效对标
              </router-link>
            </template>
            <span slot="extra">
              <a-radio-group default-value="0" size="small">
                <a-radio-button value="0">日</a-radio-button>
                <a-radio-button value="1">月</a-radio-button>
              </a-radio-group>
            </span>
            <a-list item-layout="horizontal" :data-source="data">
              <a-list-item slot="renderItem" slot-scope="item">
                <a-list-item-meta description="电/水/气/热" >
                  <a slot="title">{{ item.title }}</a>
                  <a-avatar
                    slot="avatar"
                    :src="item.avatar"
                  />
                </a-list-item-meta>
                {{ item.data }}
              </a-list-item>
            </a-list>
          </a-card>
          <!-- <a-divider /> -->
          <a-card>
            <template v-slot:title>
              <router-link :to="{ name: 'curve'}">
                监测设备
              </router-link>
            </template>
            <chart-card title="监测点实时功率">
              <!-- <a-tooltip title="实时电压" slot="action">
                    <a-icon type="info-circle-o" />
                  </a-tooltip> -->
              <div style="width:90%">
                <mini-area />
              </div>
            </chart-card>
          </a-card>
        </a-col>
      </a-row>
      <a-row>
        <!-- <chart></chart> -->
        <a-col :span="12">
          <a-card>
            <span slot="extra">
              <a-radio-group default-value="0" size="small">
                <a-radio-button value="0">日</a-radio-button>
                <a-radio-button value="1">月</a-radio-button>
              </a-radio-group>
            </span>
            <template v-slot:title>
              <router-link :to="{ name: 'meter'}">
                分项用电
              </router-link>
            </template>
            <div ref="monitorcontainer3" style="width:45%;height:200px;display:inline-block;"></div>
            <div ref="monitorcontainer2" style="width:45%;height:200px;display:inline-block;"></div>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card>
            <!-- <span slot="extra">
              <a-radio-group default-value="0" size="small">
                <a-radio-button value="0">周</a-radio-button>
                <a-radio-button value="1">月</a-radio-button>
              </a-radio-group>
            </span> -->
            <template v-slot:title>
              <router-link :to="{ name: 'meter'}">
                负荷曲线
              </router-link>
            </template>
            <div ref="monitorcontainer" style="width:90%;height:200px;"></div>
          </a-card>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import flow from './modules/flow'
import chart from './modules/chart'
import echarts from 'echarts'
import { MiniArea, ChartCard, RankList2 } from '@/components'
const energy = [
    { name: '电 能: ', unit: 'kW.h', num: 50 },
    { name: '水 能: ', unit: 'm³', num: 30 },
    { name: '气 能: ', unit: 'm³', num: 70 },
    { name: '热 能: ', unit: 'kJ', num: 20 }
]
const data = [
  { title: '人均能耗(/人)', avatar: require('@/assets/people.svg'), data: '11kW.h/13m³/15m³/17kJ' },
  { title: '面积能耗(/㎡)', avatar: require('@/assets/area.svg'), data: '11kW.h/13m³/15m³/17kJ' }
]
const rank = []
const systemlist = ['空调系统', '照明系统', '动力系统', '特殊用电']
for (let i = 0; i < 4; i++) {
  rank.push({ name: systemlist[i],
    total: 1234.56 - i * 100 + ' kWh' })
}
var myChart
var myChart2
var myChart3
export default {
    components: {
        flow,
        chart,
        MiniArea,
        ChartCard,
        RankList: RankList2
    },
  data () {
    return {
        energy,
        data,
        rank
    }
    },
    created () {
        },
    mounted () {
      this.chart3()
      this.chart2()
      this.chart()
    },
    methods: {
      changeHourMinutestr (str) {
    const hours = Math.floor(str / 60).toString()
    const minutes = (str % 60).toString()
    if (str !== '0' && str !== '' && str !== null) {
      return hours + ':' + (minutes.length < 2 ? '0' + minutes : minutes) + ''
    } else {
      return ''
    }
  },
      chart () {
        var data = []
        var xaxis = []
        for (let i = 0; i < 96; i++) {
          xaxis.push(this.changeHourMinutestr(15 * i))
          data.push((Math.random() * 2000).toFixed(2))
        }
        var option = {
          grid: {
        left: '3%',
        right: '3%',
        bottom: '3%',
        top: '3%',
        containLabel: true
    },
        tooltip: {
            trigger: 'axis'
        },
        xAxis: {
            data: xaxis
        },
        yAxis: {
            splitLine: {
                show: false
            },
            axisLabel: {
          formatter: '{value} kW'
        }
        },
        dataZoom: [ {
            type: 'inside'
        }],
        visualMap: {
            top: 0,
            right: 10,
            left: '20%',
            orient: 'horizontal',
            pieces: [{
                gt: 0,
                lte: 500,
                color: '#096'
            }, {
                gt: 500,
                lte: 1000,
                color: '#ffde33'
            }, {
                gt: 1000,
                lte: 1500,
                color: '#ff9933'
            }, {
                gt: 1500,
                lte: 2000,
                color: '#cc0033'
            }],
            outOfRange: {
                color: '#999'
            }
        },
        series: {
            name: '负荷',
            type: 'line',
            smooth: true,
            data: data,
            markLine: {
                silent: true,
                label: {
                  show: true,
                  position: 'insideEndTop'
                },
                data: [{
                    yAxis: 500
                }, {
                    yAxis: 1000
                }, {
                    yAxis: 1500
                }]
            }
        }
    }
    myChart = echarts.init(this.$refs.monitorcontainer, 'light')
myChart.setOption(option)
      },
      chart2 () {
        var option = {
    color: ['#3398DB'],
    tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    grid: {
        left: '0%',
        right: '3%',
        bottom: '0%',
        top: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: ['空调系统', '照明系统', '动力系统', '特殊用电'],
            axisTick: {
                alignWithLabel: true
            }
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLabel: {
          formatter: '{value} kWh'
        }
        }
    ],
    series: [
        {
            name: '用电量',
            type: 'bar',
            barWidth: '40%',
            data: [200, 334, 330, 220]
        }
    ]
}
myChart2 = echarts.init(this.$refs.monitorcontainer2, 'light')
myChart2.setOption(option)
      },
      chart3 () {
        var option = {
    tooltip: {
        trigger: 'item',
        formatter: '{b} : {c} kW.h ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: '0%',
        top: '20%',
        data: ['空调系统', '照明系统', '动力系统', '特殊用电']
    },
    series: [
        {
            name: '用能占比',
            type: 'pie',
            // label: {
            //    position: 'outside'
            //       },
                  label: {
                show: false
            },
            radius: '70%',
            center: ['50%', '50%'],
            data: [
                { value: (Math.random() * 100).toFixed(2), name: '空调系统' },
                { value: (Math.random() * 200).toFixed(2), name: '照明系统' },
                { value: (Math.random() * 200).toFixed(2), name: '动力系统' },
                { value: (Math.random() * 400).toFixed(2), name: '特殊用电' }
            ],
            emphasis: {
              label: {
                    show: true
                },
                itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
}
myChart3 = echarts.init(this.$refs.monitorcontainer3, 'light')
myChart3.setOption(option)
    }
    }
}
</script>

<style>

.box{
  width:100%;
  height:100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

</style>
