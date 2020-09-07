<template>
  <div class="part3" id="pdfCentent">
    <p align="left" style="font-size:30px">第三章 企业能源数据分析</p>
    <p align="center" style="font-size:25px"> 图3.1 xx 有限公司各能源消耗示意图</p>
    <p style="margin-top:5px"></p>
    <a-row :gutter="[16,8]">
      <a-col :span="20">
        <div id="qushicontainer"></div>
      </a-col>
    </a-row>
    <p style="margin-top:5px"></p>
    <p align="center" style="font-size:25px"> 图3.2 xx 有限公司各能源消耗对比图</p>
    <a-card :bordered="false">
      <div ref="container3" style="width:90%;height:350px;"></div>
    </a-card>
    <!-- <p style="margin-top:5px"></p>
    <p align="left" style="font-size:28px">第一节 电数据</p>
    <p align="left" style="font-size:25px">一、客户用电概况</p>
    <p style="font-size:25px">xx 有限公司 2020 年xx月份用电情况：</p>
    <p align="center" style="font-size:25px"> 表3.1 xx 有限公司 2020 年xx月份用电周数据</p>
    <p style="font-size:25px">xx 有限公司 2020 年xx月份用电日数据：</p>
    <p align="center" style="font-size:25px"> 表3.2 xx 有限公司 2020 年xx月份用电日数据</p>
    <p style="font-size:25px">二、客户用电分析</p>
    <p align="left" style="font-size:28px">第二节 水数据</p>
    <p align="left" style="font-size:25px">一、客户用水概况</p>
    <p style="font-size:25px">xx 有限公司 2020 年xx月份用水情况：</p>
    <p align="center" style="font-size:25px">表3.3 xx 有限公司 2020 年xx月份用水周数据</p>
    <p style="font-size:25px">xx 有限公司 2020 年xx月份用水日数据：</p>
    <p align="center" style="font-size:25px">表3.4 xx 有限公司 2020 年xx月份用水日数据</p>
    <p align="left" style="font-size:25px">二、客户用水分析</p>
    <p align="left" style="font-size:28px">第三节 气数据</p>
    <p style="font-size:25px">一、客户用气概况</p>
    <p style="font-size:25px">xx 有限公司 2020 年xx月份用气情况：</p>
    <p align="center" style="font-size:25px">表3.5 xx 有限公司 2020 年xx月份用气周数据</p>
    <p style="font-size:25px">xx 有限公司 2020 年xx月份用气日数据：</p>
    <p align="center" style="font-size:25px">表3.6 xx 有限公司 2020 年xx月份用气日数据</p>
    <p align="left" style="font-size:25px">二、客户用气分析</p>
    <p align="left" style="font-size:28px">第四节 热数据</p>
    <p align="left" style="font-size:25px">一、客户用热概况</p>
    <p style="font-size:25px">xx 有限公司 2020 年xx月份用热情况：</p>
    <p align="center" style="font-size:25px">表3.7 xx 有限公司 2020 年xx月份用热周数据</p>
    <p style="font-size:25px">xx 有限公司 2020 年xx月份用热日数据：</p>
    <p align="center" style="font-size:25px">表3.8 xx 有限公司 2020 年xx月份用热日数据</p>
    <p align="left" style="font-size:25px">二、客户用热分析</p> -->
  </div>
</template>

<script>
import { StepLine } from '@antv/g2plot'
import echarts from 'echarts'

const qushidata = [
  { year: '1月', type: '电', value: 70 },
  { year: '1月', type: '水', value: 30 },
  { year: '1月', type: '气', value: 4 },
  { year: '1月', type: '热', value: 5 },
  { year: '2月', type: '电', value: 80 },
  { year: '2月', type: '水', value: 45 },
  { year: '2月', type: '气', value: 5 },
  { year: '2月', type: '热', value: 6 },
  { year: '3月', type: '电', value: 85 },
  { year: '3月', type: '水', value: 35 },
  { year: '3月', type: '气', value: 4.5 },
  { year: '3月', type: '热', value: 5.5 },
  { year: '4月', type: '电', value: 90 },
  { year: '4月', type: '水', value: 50 },
  { year: '4月', type: '气', value: 6 },
  { year: '4月', type: '热', value: 7 },
  { year: '5月', type: '电', value: 99 },
  { year: '5月', type: '水', value: 49 },
  { year: '5月', type: '气', value: 5.9 },
  { year: '5月', type: '热', value: 6.9 },
  { year: '6月', type: '电', value: 100 },
  { year: '6月', type: '水', value: 50 },
  { year: '6月', type: '气', value: 7 },
  { year: '6月', type: '热', value: 8 },
  { year: '7月', type: '电', value: 140 },
  { year: '7月', type: '水', value: 70 },
  { year: '7月', type: '气', value: 7 },
  { year: '7月', type: '热', value: 8 },
  { year: '8月', type: '电', value: 150 },
  { year: '8月', type: '水', value: 90 },
  { year: '8月', type: '气', value: 9 },
  { year: '8月', type: '热', value: 12 },
  { year: '9月', type: '电', value: 130 },
  { year: '9月', type: '水', value: 90 },
  { year: '9月', type: '气', value: 13 },
  { year: '9月', type: '热', value: 19 },
  { year: '10月', type: '电', value: 130 },
  { year: '10月', type: '水', value: 100 },
  { year: '10月', type: '气', value: 21 },
  { year: '10月', type: '热', value: 13 },
  { year: '11月', type: '电', value: 130 },
  { year: '11月', type: '水', value: 110 },
  { year: '11月', type: '气', value: 23 },
  { year: '11月', type: '热', value: 15 },
  { year: '12月', type: '电', value: 110 },
  { year: '12月', type: '水', value: 80 },
  { year: '12月', type: '气', value: 13 },
  { year: '12月', type: '热', value: 15 }
]
var myChart3

export default {
    name: 'ReportContentPart301',
    data () {
      return {
        qushidata
      }
    },
  mounted () {
    this.GetStepLine()
    this.chart()
  },
  methods: {
    GetStepLine () {
      const step = new StepLine(document.getElementById('qushicontainer'), {
      title: {
        visible: true,
        text: ''
      },
      description: {
        visible: true,
        text: ''
      },
      padding: 'auto',
      forceFit: true,
      data: qushidata,
      xField: 'year',
      yField: 'value',
      label: {
        visible: true,
        type: 'point'
      },
      point: {
        visible: true,
        size: 5,
        shape: 'diamond',
        style: {
          fill: 'white',
          stroke: '#2593fc',
          lineWidth: 2
        }
      },
      legend: {
         position: 'right-top'
      },
      seriesField: 'type',
      responsive: true
    })
    step.render()
  },
  chart () {
           var option = {
    title: {
        text: '用能对比',
        subtext: '数据来自XXXX',
        left: '12%',
        align: 'right'
    },
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
                    { offset: 0, color: '#675bba' },
                    { offset: 1, color: 'pink' }
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
            data: [-120, -132, -101, -134, -190]
        }
    ]
}
             myChart3 = echarts.init(this.$refs.container3, 'light')
			myChart3.setOption(option)
        }
  }
}
</script>

<style lang="less" scoped>
.part3{text-indent: 50px;}
</style>
