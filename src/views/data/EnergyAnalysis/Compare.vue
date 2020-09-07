<template>
  <div>
    <a-card>
      <a-tabs type="card">
        <a-tab-pane key="1" tab="日数据" forceRender>
          <!-- <a-row>
            <a-col :span="18"><div ref="container3" style="width:1300px;height:500px;"></div></a-col>
            <a-col :span="6"><div ref="container2" style="width:450px;height:500px;"></div></a-col>
          </a-row> -->
        </a-tab-pane>
        <a-tab-pane key="2" tab="周数据" forceRender>
          <!-- <a-row>
            <a-col><div ref="container" style="width:1500px;height:500px;"></div></a-col>
          </a-row> -->
        </a-tab-pane>
        <span slot="tabBarExtraContent"><a-form layout="inline">
          <a-form-item label="选择日期">
            <a-date-picker style="width: 80%" placeholder="请选择日期"/>
          </a-form-item>
          <a-form-item><a-button type="primary">查询</a-button></a-form-item>
        </a-form>
        </span>
      </a-tabs>
      <a-row>
        <a-col :span="16"><div ref="container" style="width:1500px;height:400px;"></div></a-col>
        <!-- <a-col :span="6"><div ref="container2" style="width:450px;height:500px;"></div></a-col> -->
        <br>
        <a-col :span="22"><div ref="container3" style="width:1500px;height:350px;"></div></a-col>
      </a-row>
    </a-card>
  </div>
</template>
<script>
import echarts from 'echarts'
var myChart
var myChart2
var myChart3

export default {
    data () {
        return {
        }
    },
    mounted () {
        this.chart()
        // this.chart2()
        this.chart3()
    },
    methods: {
		chart () {
           var option = {
    // tooltip: {
    //     trigger: 'axis',
    //     axisPointer: {            // 坐标轴指示器，坐标轴触发有效
    //         type: 'line'        // 默认为直线，可选为：'line' | 'shadow'
    //     }
    // },
    title: {
        text: '用电量对比',
        subtext: '数据来自XXXX',
        left: '12%',
        align: 'right'
    },
    legend: {
        data: ['上周', '本周', '差额']
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
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
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
                    { offset: 0, color: '#675bba' },
                    { offset: 1, color: 'pink' }
                ]
            )
        },
            label: {
                show: true,
                position: 'inside'
            },
            data: [200, -170, -240, 244, 200, 220, -210]
        },
        {
            name: '本周',
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
            data: [320, 302, 341, 374, 390, 450, 420]
        },
        {
            name: '上周',
            type: 'bar',
            // color: [ '#32C5E9' ],
            barWidth: 13,
            itemStyle: {
            barBorderRadius: 15,
            color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    { offset: 0, color: 'blue' },
                    { offset: 1, color: '#d14a61' }
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
            data: [-120, -132, -101, -134, -190, -230, -210]
        }
    ]
}
             myChart = echarts.init(this.$refs.container, 'light')
			myChart.setOption(option)
        },
        chart2 () {
        var option = {
    // backgroundColor: '#2c343c',
    // legend: {
    //     data: ['第一季度', '第二季度', '第三季度', '第四季度']
    // },
    tooltip: {
        trigger: 'item',
        formatter: '{b} : {c}kwh ({d}%)'
    },

    visualMap: {
        show: false,
        min: 10,
        max: 600,
        inRange: {
            colorLightness: [0, 1]
        }
    },
    series: [
        {
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
            data: [
                { value: 365, name: '第一季度' },
                { value: 310, name: '第二季度' },
                { value: 274, name: '第三季度' },
                { value: 235, name: '第四季度' }
            ].sort(function (a, b) { return a.value - b.value }),
            roseType: 'radius',
            label: {
                // color: 'aqua'
            },
            labelLine: {
                // lineStyle: {
                //     color: 'rgba(255, 255, 255, 0.3)'
                // },
                smooth: 0.2,
                length: 10,
                length2: 20
            },

            animationType: 'scale',
            animationEasing: 'elasticOut',
            animationDelay: function (idx) {
                return Math.random() * 200
            }
        }
    ]
}
myChart2 = echarts.init(this.$refs.container2, 'light')
			myChart2.setOption(option)
    },
    chart3 () {
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
        data: ['昨日用电量', '今日用电量']
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
                        return '用电量  ' + params.value +
                            (params.seriesData.length ? '：' + params.seriesData[0].data : '') + 'kwh'
                    }
                }
            },
            data: ['6-2 0:00', '6-2 2:00', '6-2 4:00', '6-2 6:00', '6-2 8:00', '6-2 10:00', '6-2 12:00', '6-2 14:00', '6-2 16:00', '6-2 18:00', '6-2 20:00', '6-2 22:00']
        },
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
            axisPointer: {
                label: {
                    formatter: function (params) {
                        return '用电量  ' + params.value +
                            (params.seriesData.length ? '：' + params.seriesData[0].data : '') + 'kwh'
                    }
                }
            },
            data: ['6-1 0:00', '6-1 2:00', '6-1 4:00', '6-1 6:00', '6-1 8:00', '6-1 10:00', '6-1 12:00', '6-1 14:00', '6-1 16:00', '6-1 18:00', '6-1 20:00', '6-1 22:00']
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLabel: {
                formatter: '{value} kwh'
            }
        }
    ],
    series: [
        {
            name: '昨日用电量',
            type: 'line',
            xAxisIndex: 1,
            smooth: true,
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        },
        {
            name: '今日用电量',
            type: 'line',
            smooth: true,
            data: [3.9, 5.9, 11.1, 18.7, 48.3, 69.2, 231.6, 46.6, 55.4, 18.4, 10.3, 0.7]
        }
    ]
}
myChart3 = echarts.init(this.$refs.container3, 'light')
			myChart3.setOption(option)
    }
    }
}
</script>
