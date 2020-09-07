<template>
  <div>
    <a-row :gutter="24">
      <a-col :md="18" :sm="24">
        <a-card :bordered="false" title="数据实时展示" :style="{ marginBottom: '24px' }">
          <span slot="extra">
            <a-form layout="inline">
              <a-form-item label="选择监控日期">
                <a-date-picker style="width: 100%" placeholder="请选择日期" @change="change"/>
              </a-form-item>
            </a-form>
          </span>
          <div id="canvas" style="width:100%"></div>
        </a-card>
      </a-col>
      <a-col :md="6" :sm="24" style="padding: 16px">
        <a-card :bordered="false" title="设备运行状态" :style="{ marginBottom: '24px'}">
          <div id="donut"></div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
 import { Line, Donut } from '@antv/g2plot'
//  import { GetLightLineData, GetAirPieData } from '@/api/device/devicemonitor'
 var linePlot

  const data = []
  for (let i = 0; i < 24; i += 1) {
          data.push({
          x: `${i }:00`,
          type: '实时负荷',
          y: Math.floor(Math.random() * 1000) + 1000
  })
  data.push({
          x: `${i }:00`,
          type: '餐厅用水负荷',
          y: Math.floor(Math.random() * 1000) + 1000
  })
  data.push({
    x: `${i }:00`,
    type: '卫生间用水负荷',
    y: Math.floor(Math.random() * 1000) + 1000
})
}

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
  data () {
    return {
      data,
      piedata
    }
  },
  mounted () {
   this.line()
   this.donut()
  },
  methods: {
    line () {
           linePlot = new Line('canvas', {
      padding: [20, 100, 30, 80],
      data: this.data,
      xField: 'x',
      yField: 'y',
      seriesField: 'type',
      animation: {
      appear: {
          animation: 'clipingWithData'
        }
      },
      smooth: true
    })
      linePlot.render()
    },
    donut () {
     const donutPlot = new Donut('donut', {
      data: this.piedata,
      legend: {
      position: 'bottom-center'
  },
      forceFit: true,
      radius: 0.8,
      angleField: 'value',
      colorField: 'type'
    })
      donutPlot.render()
    },
    change (date, dateString) {
    //   console.log(date, dateString)
      this.dateString = dateString
        linePlot.changeData(this.data)
    }
  }
}
</script>
