<template>
  <div>
    <a-card title="用能对比">
      <span slot="extra"><a-form layout="inline">
        <a-form-item label="选择日期">
          <a-date-picker style="width: 80%" placeholder="请选择日期"/>
        </a-form-item>
        <a-form-item><a-button type="primary">查询</a-button></a-form-item>
      </a-form>
      </span>
      <a-row :gutter="8">
        <a-col :span="4">
          <Stree @test="test"></Stree>
        </a-col>
        <a-col :span="20">
          <a-tabs type="card">
            <a-tab-pane key="1" tab="日数据" forceRender>
              <a-row>
                <a-col :span="18"><div ref="container3" style="width:1100px;height:500px;"></div></a-col>
                <a-col :span="6"><div ref="container2" style="width:450px;height:500px;"></div></a-col>
              </a-row>
            </a-tab-pane>
            <a-tab-pane key="2" tab="周数据" forceRender>
              <a-row>
                <a-col><div ref="container" style="width:1300px;height:500px;"></div></a-col>
              </a-row>
            </a-tab-pane>
          </a-tabs>
          <span slot="extra"><a-form layout="inline">
            <a-form-item label="选择日期">
              <a-date-picker style="width: 80%" placeholder="请选择日期"/>
            </a-form-item>
            <a-form-item><a-button type="primary">查询</a-button></a-form-item>
          </a-form>
          </span>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>
<script>
import echarts from 'echarts'
import Stree from '../consumption/components/STree'
var myChart
var myChart2
var myChart3

export default {
    components: {
    Stree
  },
    data () {
        return {
        }
    },
    mounted () {
        this.chart()
        this.chart2()
        this.chart3()
    },
    methods: {
        test (e) {
            console.log('监听子组件事件', e)
        },
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
            barWidth: 20,
            itemStyle: {
            barBorderRadius: 15,
            color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    { offset: 0, color: 'purple' },
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
            stack: '1',
            // color: [ 'aqua' ],
            label: { normal: { show: true, position: 'right' } },
            data: [320, 302, 341, 374, 390, 450, 420]
        },
        {
            name: '上周',
            type: 'bar',
            // color: [ '#32C5E9' ],
            barWidth: 20,
            itemStyle: {
            barBorderRadius: 15,
            color: new echarts.graphic.LinearGradient(
                0, 0, 0, 1,
                [
                    { offset: 0, color: 'yellow' },
                    { offset: 1, color: 'green' }
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
    title: {
        text: '用电量占比',
        left: 'center'
    },
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
myChart3 = echarts.init(this.$refs.container3, 'light')
			myChart3.setOption(option)
    }
    }
}
</script>
