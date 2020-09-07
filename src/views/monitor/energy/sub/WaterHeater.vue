<template>
  <div>
    <a-row :gutter="24">
      <a-col :md="24" :sm="24">
        <a-card :bordered="false" title="热水器用水统计" :style="{ marginBottom: '24px' }">
          <span slot="extra">
            <a-form layout="inline">
              <a-form-item label="选择星期">
                <a-week-picker style="width: 60%" placeholder="请选择星期" @change="change"/>
              </a-form-item>
            </a-form>
          </span>
          <div id="container"></div>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :md="8" :sm="24">
        <a-card :bordered="false" title="热水器运行状态" :style="{ marginBottom: '24px' }">
          <span slot="extra">
            <a-form layout="inline">
              <a-form-item label="选择楼层">
                <a-select placeholder="请选择" default-value="0" style="width:150%">
                  <a-select-option value="0">一楼</a-select-option>
                  <a-select-option value="1">二楼</a-select-option>
                  <a-select-option value="2">三楼</a-select-option>
                </a-select>
              </a-form-item>
            </a-form>
          </span>
          <div id="donut2"></div>
        </a-card>
      </a-col>
      <a-col :md="16" :sm="24">
        <a-card :bordered="false" title="热水器年度用水" :style="{ marginBottom: '24px' }">
          <span slot="extra">
            <a-form layout="inline">
              <a-form-item label="选择年份">
                <a-select placeholder="请选择" default-value="0" style="width:120%">
                  <a-select-option value="0">2016</a-select-option>
                  <a-select-option value="1">2017</a-select-option>
                  <a-select-option value="2">2018</a-select-option>
                  <a-select-option value="3">2019</a-select-option>
                </a-select>
              </a-form-item>
            </a-form>
          </span>
          <a-row>
            <a-col :md="12" :sm="24"><div id="pie1"></div></a-col>
            <a-col :md="12" :sm="24"><div id="pie2"></div></a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
 import { StackedColumn, Donut, Pie } from '@antv/g2plot'
import { GetLightDountData, GetWaterHeaterData, GetWaterHeaterPieData1, GetWaterHeaterPieData2 } from '@/api/energy/energy'
var columnPlot
export default {
  data () {
    return {
        // data
    }
  },
  mounted () {
      this.stackedcolumn()
      this.donut()
      this.pie1()
      this.pie2()
  },
  methods: {
      stackedcolumn () {
        var data2 = []
        GetWaterHeaterData().then(response => {
          // console.log(response.result)
         data2 = response.result
           columnPlot = new StackedColumn('container', {
  forceFit: true,
  data: data2,
  xField: 'year',
  yField: 'value',
  stackField: 'type',
  color: ['#ae331b', '#f27957', '#dadada', '#609db7', '#1a6179'],
  xAxis: {
    title: {
      visible: false
    }
  },
  yAxis: {
    title: {
      visible: false
    }
  },
  connectedArea: {
    visible: true,
    triggerOn: false,
    lineStyle: {
      stroke: '#afb1b5',
      opacity: 0.8
    },
    areaStyle: {
      fill: '#e8e8e8',
      opacity: 0.5
    }
  }
})
columnPlot.render()
        })
      },
      donut () {
      var data1 = []
       GetLightDountData().then(response => {
        //  console.log(response.result)
   data1 = response.result
     const donutPlot = new Donut('donut2', {
      data: data1,
      legend: {
      position: 'bottom-center'
  },
      forceFit: true,
      radius: 0.8,
      angleField: 'value',
      colorField: 'type'
    })
      donutPlot.render()
      })
    },
    pie1 () {
      var data = []
      GetWaterHeaterPieData1().then(response => {
        console.log(response.result)
        data = response.result
        const piePlot = new Pie('pie1', {
          title: {
    visible: true,
    text: '公司总用水'
  },
  forceFit: true,
  radius: 0.8,
  data: data,
  angleField: 'value',
  colorField: 'type',
  label: {
    visible: true,
    type: 'outer'
  },
  legend: {
    position: 'bottom-center'
  }
})
piePlot.render()
      })
    },
    pie2 () {
      var data = []
      GetWaterHeaterPieData2().then(response => {
        console.log(response.result)
        data = response.result
        const piePlot = new Pie('pie2', {
          title: {
    visible: true,
    text: '楼层总用水'
  },
  forceFit: true,
  radius: 0.8,
  data: data,
  angleField: 'value',
  colorField: 'type',
  label: {
    visible: true,
    type: 'outer'
  },
  legend: {
    position: 'bottom-center'
  }
})
piePlot.render()
      })
    },
    change (date, dateString) {
      console.log(date, dateString)
      GetWaterHeaterData().then(response => {
        var data = response.result
        columnPlot.changeData(data)
      })
    }
  }
}
</script>
