<template>
  <div>
    <a-card title="用能趋势">
      <a-tabs type="card">
        <a-tab-pane key="1" tab="日数据">
          <div id="voltage"></div>
        </a-tab-pane>
        <a-tab-pane key="2" tab="月数据">
          <div id="current"></div>
        </a-tab-pane>
      </a-tabs>
      <span slot="extra"><a-form layout="inline">
        <a-form-item label="选择日期">
          <a-date-picker style="width: 80%" placeholder="请选择日期"/>
        </a-form-item>
        <a-form-item><a-button type="primary">查询</a-button></a-form-item>
      </a-form>
      </span>
      <a-row>
        <a-col :span="24"><div ref="container" style="width:1700px;height:500px;"></div></a-col>
        <!-- <a-col :span="24"><div ref="container2" style="width:1700px;height:500px;"></div></a-col> -->
      </a-row>
    </a-card>
  </div>
</template>
<script>
import echarts from 'echarts'
var myChart
var myChart2

export default {
    data () {
        return {
        }
    },
    mounted () {
        this.chart()
        // this.chart2()
    },
    methods: {
		chart () {
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
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
             myChart = echarts.init(this.$refs.container, 'light')
			myChart.setOption(option)
        },
        chart2 () {
        var option = {
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    yAxis: {
        type: 'value',
        axisLabel: {
                formatter: '{value} kwh'
            }
    },
    series: [{
        data: [100.0, 144.9, 157.0, 123.2, 125.6, 276.7, 235.6, 262.2, 332.6, 220.0, 226.4, 103.3],
        type: 'line',
        itemStyle: {
                color: 'rgb(255, 70, 131)'
            },
            areaStyle: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgb(255, 158, 68)'
                }, {
                    offset: 1,
                    color: 'rgb(255, 70, 131)'
                }])
            },
        smooth: true
    }]
}
myChart2 = echarts.init(this.$refs.container2, 'light')
			myChart2.setOption(option)
    }
    }
}
</script>
