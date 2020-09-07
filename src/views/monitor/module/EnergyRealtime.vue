<template>
  <div>
    <a-card >
      <div ref="monitorcontainer1" style="width:90%;height:300px;"></div>
    </a-card>
    <a-row :gutter="20">
      <a-col :span="8">
        <a-card>
          <div ref="monitorcontainer2" style="width:90%;height:300px;"></div>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card>
          <div ref="monitorcontainer3" style="width:90%;height:300px;"></div>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card>
          <div ref="monitorcontainer4" style="width:80%;height:300px;"></div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import echarts from 'echarts'
var myChart
var myChart2
var myChart3
var myChart4

export default {
  components: {
  },
  props: {
      energyType: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      loading: false
    }
  },
  mounted () {
    this.chart()
    this.chart2()
    this.chart3()
    this.chart4()
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
      var xAxis = []
for (let i = 0; i < 24; i++) {
  xAxis.push(this.changeHourMinutestr(60 * i))
}
var yAxis = []
for (let i = 0; i < 24; i++) {
  yAxis.push((Math.random() * 1000).toFixed(2))
}
var yMax = 1000
var dataShadow = []
for (var i = 0; i < 24; i++) {
    dataShadow.push(yMax)
}
var option = {
    title: {
        text: '实时能耗',
        textStyle: {
          fontWeight: 'lighter',
          fontSize: '16'
        }
    },
    grid: {
        left: '5%'
    },
    //     tooltip: {
    //     trigger: 'axis',
    //     axisPointer: {
    //         type: 'line'
    //     }
    // },
    xAxis: {
        data: xAxis,
        axisLabel: {
            inside: false,
            textStyle: {
                color: '#999'
            }
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: false
        },
        z: 10
    },
    yAxis: {
        axisLine: {
            show: false
        },
        axisTick: {
            show: false
        },
        axisLabel: {
          formatter: '{value}' + this.energyType.unit,
            textStyle: {
                color: '#999'
            }
        }
    },
    dataZoom: [
        {
            type: 'inside'
        }
    ],
    series: [
        { // For shadow
            name: 'shadow',
            type: 'bar',
            itemStyle: {
                color: 'rgba(0,0,0,0.05)'
            },
            barGap: '-100%',
            barCategoryGap: '40%',
            data: dataShadow,
            animation: false
        },
        {
            name: 'data',
            type: 'bar',
            itemStyle: {
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1,
                    [
                        { offset: 0, color: '#83bff6' },
                        { offset: 0.5, color: '#188df0' },
                        { offset: 1, color: '#188df0' }
                    ]
                )
            },
            emphasis: {
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0, 0, 0, 1,
                        [
                            { offset: 0, color: '#2378f7' },
                            { offset: 0.7, color: '#2378f7' },
                            { offset: 1, color: '#83bff6' }
                        ]
                    )
                }
            },
            data: yAxis
        }
    ]
}
myChart = echarts.init(this.$refs.monitorcontainer1, 'light')
myChart.setOption(option)
    },
    chart2 () {
        var data1 = []
        var data2 = []
        var data3 = []
        var data4 = []
        for (let i = 0; i < 12; i++) {
            data1.push((Math.random() * 1000).toFixed(2))
            data2.push((Math.random() * 1000).toFixed(2))
            data3.push((Math.random() * 1000).toFixed(2))
            data4.push((Math.random() * 1000).toFixed(2))
        }
//         var a = 5
// for (var i = 1; i <= a; i++) {
//     eval('var a' + i + '=' + i)
// }
      var option = {
        title: {
        text: '年度能耗',
        textStyle: {
          fontWeight: 'lighter',
          fontSize: '16'
        }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    legend: {
        data: this.energyType.chart
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [
        {
            type: 'category',
            data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLabel: {
          formatter: '{value}' + this.energyType.unit,
            textStyle: {
                color: '#999'
            }
        }
        }
    ],
    series: [
        {
            name: this.energyType.chart[0],
            type: 'bar',
            // barWidth: 15,
            barCategoryGap: '40%',
            stack: '能耗',
            data: data1
        },
        {
            name: this.energyType.chart[1],
            type: 'bar',
            stack: '能耗',
            data: data2
        },
        {
            name: this.energyType.chart[2],
            type: 'bar',
            stack: '能耗',
            data: data3
        },
        {
            name: this.energyType.chart[3],
            type: 'bar',
            stack: '能耗',
            data: data4
        }
    ]
}
myChart2 = echarts.init(this.$refs.monitorcontainer2, 'light')
myChart2.setOption(option)
    },
    chart3 () {
        var option = {
    title: {
        text: '月度能耗',
        textStyle: {
          fontWeight: 'lighter',
          fontSize: '16'
        },
        left: 'left'
    },
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b} : {c} ({d}%)'
    },
    legend: {
        // orient: 'vertical',
        left: 'center',
        data: this.energyType.chart
    },
    series: [
        {
            name: '用能占比',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                { value: (Math.random() * 100).toFixed(2), name: this.energyType.chart[0] },
                { value: (Math.random() * 200).toFixed(2), name: this.energyType.chart[1] },
                { value: (Math.random() * 200).toFixed(2), name: this.energyType.chart[2] },
                { value: (Math.random() * 400).toFixed(2), name: this.energyType.chart[3] }
            ],
            emphasis: {
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
    },
    chart4 () {
              var xAxis = []
for (let i = 0; i < 24; i++) {
  xAxis.push(this.changeHourMinutestr(60 * i))
}
var yAxis1 = []
var yAxis2 = []
var yAxis3 = []
var yAxis4 = []
for (let i = 0; i < 24; i++) {
  yAxis1.push((Math.random() * 100).toFixed(2))
  yAxis2.push((Math.random() * 200).toFixed(2))
  yAxis3.push((Math.random() * 500).toFixed(2))
  yAxis4.push((Math.random() * 1000).toFixed(2))
}
        var option = {
    title: {
        text: '日度能耗',
        textStyle: {
          fontWeight: 'lighter',
          fontSize: '16'
        }
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: this.energyType.chart
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: xAxis
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: this.energyType.chart[0],
            type: 'line',
            smooth: true,
            data: yAxis1
        },
        {
            name: this.energyType.chart[1],
            type: 'line',
            smooth: true,
            data: yAxis2
        },
        {
            name: this.energyType.chart[2],
            type: 'line',
            smooth: true,
            data: yAxis3
        },
        {
            name: this.energyType.chart[3],
            type: 'line',
            smooth: true,
            data: yAxis4
        }
    ]
}
myChart4 = echarts.init(this.$refs.monitorcontainer4, 'light')
myChart4.setOption(option)
    }
  }
}
</script>
<style scoped>

</style>
