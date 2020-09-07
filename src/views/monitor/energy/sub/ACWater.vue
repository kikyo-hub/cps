<template>
  <div>
    <a-row :gutter="24">
      <a-col :md="18" :sm="24">
        <a-card :bordered="false" title="中央空调用水统计" :style="{ marginBottom: '24px' }">
          <span v-if="show" slot="extra">
            <a-form layout="inline">
              <a-form-item label="选择展示模式">
                <a-select placeholder="请选择" default-value="0" style="width:100%" @change="handleChange">
                  <a-select-option value="0">一周</a-select-option>
                  <a-select-option value="1">一月</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="选择星期">
                <a-week-picker style="width: 60%" placeholder="请选择星期" @change="change"/>
              </a-form-item>
            </a-form>
          </span>
          <span v-else slot="extra">
            <a-form layout="inline">
              <a-form-item label="选择展示模式">
                <a-select placeholder="请选择" default-value="1" style="width:100%" @change="handleChange">
                  <a-select-option value="0">一周</a-select-option>
                  <a-select-option value="1">一月</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="选择月份">
                <a-month-picker style="width: 60%" placeholder="请选择月份" @change="change1"/>
              </a-form-item>
            </a-form>
          </span>
          <div id="acwater"></div>
        </a-card>
      </a-col>
      <a-col :md="6" :sm="24">
        <a-card :bordered="false" title="空调用水占比" :style="{ marginBottom: '24px' }">
          <div id="acwater2"></div>
        </a-card>
      </a-col>
    </a-row>
    <a-row>
      <a-col :md="24" :sm="24">
        <a-table :columns="columns" :data-source="data"></a-table>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { Line, Pie } from '@antv/g2plot'
import { GetACWaterLineData, GetACWaterPieData } from '@/api/energy/energy'
var linePlot
const columns = [
  {
    title: '公司名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '用水设备',
    dataIndex: 'equipment',
    key: 'equipment'
  },
  {
    title: '周用水',
    dataIndex: 'waterw',
    key: 'waterw'
  },
  {
    title: '月用水',
    dataIndex: 'waterm',
    key: 'waterm'
  }
]
const data = [
  {
    key: '1',
    name: '中天电子',
    equipment: '中央空调',
    waterw: '46t',
    waterm: '231t'
  }
]
export default {
data () {
    return {
        show: true,
        columns,
        data
    }
},
mounted () {
    this.getacwaterlinedata()
    this.getacwaterpiedata()
},
methods: {
    getacwaterlinedata () {
        GetACWaterLineData('week').then(response => {
            var data = response.result
            const maxValue = Math.max.apply(
  [],
  data.map((d) => d.value)
)
         linePlot = new Line('acwater', {
  forceFit: true,
  padding: 'auto',
  data,
  xField: 'date',
  yField: 'value',
  yAxis: {
    nice: true
  },
  label: {
    visible: false
  },
  markerPoints: [
    {
      visible: true,
      data: [{ value: maxValue }],
      label: {
        visible: true,
        formatter: () => '最大值'
      },
      style: {
        normal: { fill: 'rgba(255, 0, 0, 0.65)' }
      },
      animation: {
        endState: { size: 4, opacity: 0.3 },
        animateCfg: {
          duration: 1500,
          easing: 'easeLinear',
          repeat: true,
          delay: 1200
        }
      }
    }
  ]
})

linePlot.render()
        })
    },
    getacwaterpiedata () {
        var data = []
        GetACWaterPieData().then(response => {
            data = response.result
            const piePlot = new Pie('acwater2', {
  forceFit: true,
  radius: 0.8,
  data,
  angleField: 'value',
  colorField: 'type',
  label: {
    visible: true,
    type: 'inner'
  }
})
piePlot.render()
    })
    },
    change (date, dateString) {
        GetACWaterLineData('week').then(response => {
            console.log(response.result)
        var data = response.result
        linePlot.changeData(data)
      })
    },
    handleChange (value) {
        if (value === '0') {
            this.show = true
        } else {
            this.show = false
        }
    },
    change1 (date, dateString) {
        GetACWaterLineData('month').then(response => {
            console.log(response.result)
        var data = response.result
        linePlot.changeData(data)
      })
    }
}
}
</script>
