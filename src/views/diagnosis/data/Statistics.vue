<template>
  <div>
    <a-card>
      <!-- <span slot="extra"><a-form layout="inline">
        <a-form-item label="选择日期">
          <a-date-picker style="width: 80%" placeholder="请选择日期"/>
        </a-form-item>
        <a-form-item><a-button type="primary">查询</a-button></a-form-item>
      </a-form>
      </span> -->
      <a-row :gutter="8">
        <a-col :span="4">
          <Stree @test="test"></Stree>
        </a-col>
        <a-col :span="20">
          <!-- <a-tabs type="card" @change="callback">
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
          <div ref="container" style="width:1300px;height:500px;"></div> -->
          <ComprehensiveEnergy></ComprehensiveEnergy>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>
<script>
import echarts from 'echarts'
import Stree from '../consumption/components/STree'
import ComprehensiveEnergy from '@/views/data/EnergyAnalysis/ComprehensiveEnergy'
var myChart

export default {
    components: {
    Stree,
    ComprehensiveEnergy
  },
    data () {
        return {
			title: '日平均用电和用水',
			data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
			xaxis: ['0:00', '2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
            data2: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
            xaxis2: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        }
    },
    mounted () {
        this.chart()
    },
    methods: {
        test (e) {
            console.log('监听子组件事件', e)
    //         setTimeout(() => {
    //   this.loading = !this.loading
    // }, 5000)
    // console.log('父')
        },
        callback (key) {
            if (key === '1') {
                myChart.setOption({
                    title: {
                        text: '日用电用水量统计'
                    },
                    xAxis: {
            data: this.xaxis
        }
                })
            } else {
                myChart.setOption({
                    title: {
                        text: '月用电用水量统计'
                    },
                    xAxis: {
            data: this.xaxis2
        }
                })
            }
        },
		chart () {
            // var myChart = echarts.init('container')
            // var echarts = require('echarts')
             myChart = echarts.init(this.$refs.container, 'light')
			myChart.setOption({
                title: {
        text: '日用电用水量统计',
        subtext: '数据来自XXXX',
        left: '12%',
        align: 'right'
    },
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
        }
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
            name: '用水量',
            // min: 0,
            // max: 250,
            // interval: 50,
            axisLabel: {
                formatter: '{value} t'
            }
        },
        {
            type: 'value',
            name: '用电量',
            // min: 0,
            // max: 25,
            // interval: 5,
            axisLabel: {
                formatter: '{value} kwh'
            }
        }
    ],
    series: [
        {
            name: '用水量',
            type: 'bar',
            barGap: 0,
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
            // color: [ 'yellow' ],
            emphasis: {
            itemStyle: {
                // 高亮时点、柱的颜色。
                // color: 'red'
            },
            label: {
                // show: true,
                // 高亮时标签的文字。
                // formatter: '用水量'
            }
            },
            data: this.data
        },
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
            // color: [ 'aqua' ],
            yAxisIndex: 1, // 选择y轴
            data: this.data2
        }
    ]
})
		}
    }
}
</script>
