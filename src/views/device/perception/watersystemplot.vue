<template>
  <a-drawer
    title="给水系统监测详情"
    placement="right"
    width="1664"
    :closable="false"
    :visible="visible"
    :after-visible-change="afterVisibleChange"
    @close="onCancel"
    @ok="handleSubmit"
    @cancel="onCancel">
    <a-row :gutter="24">
      <a-col :md="18" :sm="24">
        <a-card :bordered="false" :style="{ marginBottom: '24px' }">
          <span slot="extra">
            <a-form layout="inline">
              <a-form-item label="选择监控日期">
                <a-date-picker style="width: 100%" placeholder="请选择日期" @change="change"/>
              </a-form-item>
            </a-form>
          </span>
          <div ref="container1" style="width:1000px;height:500px;"></div>
        </a-card>
      </a-col>
      <a-col :md="6" :sm="24" style="padding: 16px">
        <a-card :bordered="false" title="设备运行状态" :style="{ marginBottom: '24px'}">
          <div ref="container2" style="width:300px;height:500px;"></div>
        </a-card>
      </a-col>
    </a-row>
  </a-drawer>
</template>
<script>
import echarts from 'echarts'
// import pick from 'lodash.pick'
//  import { GetLightLineData, GetAirPieData } from '@/api/device/devicemonitor'
var myChart
var myChart2

  const data = []

const piedata = [
    {
      type: '离线数量',
      value: 12
    },
    {
      type: '运行数量',
      value: 25
    },
    {
      type: '空闲数量',
      value: 18
    }
  ]
export default {
  name: 'Watersystemplot',
  props: {
    record: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      visible: false,
      data,
      piedata,
      labelCol: {
        xs: { span: 11 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      form: this.$form.createForm(this)
    }
  },
  mounted () {
  //  this.line()
  //  this.donut()
  },
  methods: {
    showDrawer (record) {
      this.visible = true
      console.log('record', record)
      this.line()
      this.donut()
      // setTimeout(() => {
      // if (record) {
      //   this.form.setFieldsValue(pick(record, ['monotorName', 'deviceType', 'floorNO', 'equipAddress', 'equipStatus', 'status']))
      // }
      // }, 100)
    },
     onCancel () {
      this.visible = false

      this.form.resetFields()
    },
    handleSubmit () {
      const { form: { validateFields } } = this
      // this.visible = false
      validateFields((errors, values) => {
        if (!errors) {
          this.visible = false
          console.log('values', values)
        }
      })
    },
    line () {
      // this.visible = true
    var colors = ['#5793f3', '#d14a61', '#675bba']
    var option = {
    color: colors,
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    grid: {
        right: '20%'
    },
    toolbox: {
        feature: {
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
        }
    },
    legend: {
        data: ['蒸发量', '降水量', '平均温度']
    },
    xAxis: [
        {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
        }
    ],
    yAxis: [
        {
            type: 'value',
            name: '蒸发量',
            min: 0,
            max: 250,
            position: 'right',
            axisLine: {
                lineStyle: {
                    color: colors[0]
                }
            },
            axisLabel: {
                formatter: '{value} ml'
            }
        },
        {
            type: 'value',
            name: '降水量',
            min: 0,
            max: 250,
            position: 'right',
            offset: 80,
            axisLine: {
                lineStyle: {
                    color: colors[1]
                }
            },
            axisLabel: {
                formatter: '{value} ml'
            }
        },
        {
            type: 'value',
            name: '温度',
            min: 0,
            max: 25,
            position: 'left',
            axisLine: {
                lineStyle: {
                    color: colors[2]
                }
            },
            axisLabel: {
                formatter: '{value} °C'
            }
        }
    ],
    series: [
        {
            name: '蒸发量',
            type: 'bar',
            data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3]
        },
        {
            name: '降水量',
            type: 'bar',
            yAxisIndex: 1,
            data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3]
        },
        {
            name: '平均温度',
            type: 'line',
            yAxisIndex: 2,
            data: [2.0, 2.2, 3.3, 4.5, 6.3, 10.2, 20.3, 23.4, 23.0, 16.5, 12.0, 6.2]
        }
    ]
}
      myChart = echarts.init(this.$refs.container1, 'light')
      myChart.setOption(option)
    console.log(1111111111111111)
    },
    donut () {
    var option = {
    tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
    },
    legend: {
        orient: 'vertical',
        left: 10,
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
    },
    series: [
        {
            name: '访问来源',
            type: 'pie',
            radius: ['50%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '30',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
                { value: 335, name: '直接访问' },
                { value: 310, name: '邮件营销' },
                { value: 234, name: '联盟广告' },
                { value: 135, name: '视频广告' },
                { value: 1548, name: '搜索引擎' }
            ]
        }
    ]
}
      myChart2 = echarts.init(this.$refs.container2, 'light')
      myChart2.setOption(option)
    },
    change (date, dateString) {
    //   console.log(date, dateString)
      this.dateString = dateString
        // linePlot.changeData(this.data)
    }
  }
}
</script>
