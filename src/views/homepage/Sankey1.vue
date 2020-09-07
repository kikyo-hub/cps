<template>
  <div class="box">
    <a-row>
      <a-col :span="6" v-for="item in energy" :key="item.name">
        <a-card :body-style="{padding: '24px 24px'}" :bordered="true" style="height:140px" :hoverable="true">
          <a-row :gutter="[0,0]">
            <a-card-meta>
              <div slot="title">{{ '今日' + item.name }}</div>
              <a-avatar class="card-avatar" slot="avatar" :src="item.avatar" size="large"/>
            </a-card-meta>
          </a-row>
          <a-row :gutter="[0,0]">
            <a-col :xl="12" :lg="12" :md="8" :sm="8" :xs="8">
              <a-statistic
                title="今日"
                :value="Math.random() * 100"
                :precision="2"
                :suffix="item.unit"
                :value-style="{ color: 'red' }"
              >
                <template #prefix>
                  <a-icon type="arrow-down" />
                </template>
              </a-statistic>
            </a-col>
            <a-col :xl="12" :lg="12" :md="8" :sm="8" :xs="8">
              <a-statistic
                title="昨日"
                :value="Math.random() * 200"
                :precision="2"
                :suffix="item.unit"
                :value-style="{ color: '#1296db'}"
              >
              </a-statistic>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
    <a-row>
      <a-col :span="12">
        <a-card>
          <div ref="chart" style="width:100%;height:700px;"></div>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card>
          <div ref="chart2" style="width:90%;height:700px;"></div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import echarts from 'echarts'
import { Statistic } from 'ant-design-vue'
var myChart
var myChart2
const energy = [
    { name: '用电', unit: 'kW.h', avatar: require('@/assets/用电.svg') },
    { name: '用水', unit: 'm³', avatar: require('@/assets/用水.svg') },
    { name: '用气', unit: 'm³', avatar: require('@/assets/气.svg') },
    { name: '用热', unit: 'kJ', avatar: require('@/assets/热.svg') }
]
export default {
    components: {
    AStatistic: Statistic
  },
  data () {
    return {
        name: 'G1',
        energy
    }
    },
    created () {
        },
    mounted () {
        this.chart2()
        this.chart3()
    },
    methods: {
      chart () {
            var data = []
            var data1 = []
            var data11 = []
            var data2 = []
            var data22 = []
            var data3 = []
            for (let i = 1; i < 8; i++) {
                data1.push({ name: `G1-${i}楼` })
                for (let j = 1; j < 8; j++) {
                    data2.push({ name: `G1-${i}0${j}` })
                }
            }
            for (let i = 1; i < 8; i++) {
                data11.push({ name: `G2-${i}楼` })
                for (let j = 1; j < 8; j++) {
                    data22.push({ name: `G2-${i}0${j}` })
                }
            }
            data = [{ name: '水',
                      itemStyle: {
                      normal: {
                         color: 'blue',
                     borderColor: '#f18bbf'
                        }
                    } }, { name: '电',
itemStyle: {
                      normal: {
                         color: '#f18bbf',
                     borderColor: '#f18bbf'
                        }
                    } }, { name: '气',
itemStyle: {
                      normal: {
                         color: '#0078D7',
                     borderColor: '#f18bbf'
                        }
                    } }, { name: '热',
itemStyle: {
                      normal: {
                         color: 'red',
                     borderColor: '#f18bbf'
                        }
                    } }, { name: 'G1' }, { name: 'G2' }, ...data1, ...data11, ...data2, ...data22]
            data1.forEach(element => {
                data3.push({ 'source': 'G1', 'target': element.name, 'value': (Math.random() * 1000).toFixed(2) })
                var str = parseInt(element.name.slice(3, 4))
                data2.forEach(element2 => {
                    if (parseInt(element2.name.slice(3, 4)) === str) {
                        data3.push({ 'source': element.name, 'target': element2.name, 'value': (Math.random() * 100).toFixed(2) })
                    }
                })
            })
            data11.forEach(element => {
                data3.push({ 'source': 'G2', 'target': element.name, 'value': (Math.random() * 1000).toFixed(2) })
                var str = parseInt(element.name.slice(3, 4))
                data22.forEach(element2 => {
                    if (parseInt(element2.name.slice(3, 4)) === str) {
                        data3.push({ 'source': element.name, 'target': element2.name, 'value': (Math.random() * 100).toFixed(2) })
                    }
                })
            })
            var option = {
    series: [
        {
            type: 'sankey',
            left: 50.0,
            top: 20.0,
            right: 150.0,
            bottom: 25.0,
            layoutIterations: 32,
        // orient: 'vertical',
        focusNodeAdjacency: true,
            levels: [{
    depth: 0,
    itemStyle: {
        color: '#13c2c2'
    },
    lineStyle: {
        color: 'source',
        opacity: 0.6
    }
}, {
    depth: 1,
    itemStyle: {
        color: '#b3cde3'
    },
    lineStyle: {
        color: 'source',
        opacity: 0.6
    }
},
{
    depth: 2,
    itemStyle: {
        color: 'green'
    },
    lineStyle: {
        color: 'source',
        opacity: 0.6
    }
},
{
    depth: 3,
    itemStyle: {
        color: 'yellow'
    },
    lineStyle: {
        color: 'source',
        opacity: 0.6
    }
}],
            z: 10,
            data: data,
            links: [{ 'source': '水', 'target': 'G1', 'value': (Math.random() * 2000).toFixed(2) },
            { 'source': '水', 'target': 'G2', 'value': (Math.random() * 200).toFixed(2) },
            { 'source': '电', 'target': 'G1', 'value': (Math.random() * 2000).toFixed(2) },
            { 'source': '电', 'target': 'G2', 'value': (Math.random() * 1700).toFixed(2) },
            { 'source': '气', 'target': 'G1', 'value': (Math.random() * 2000).toFixed(2) },
            { 'source': '气', 'target': 'G2', 'value': (Math.random() * 1500).toFixed(2) },
            { 'source': '热', 'target': 'G1', 'value': (Math.random() * 2000).toFixed(2) },
            { 'source': '热', 'target': 'G2', 'value': (Math.random() * 1500).toFixed(2) },
            ...data3],
            lineStyle: {
                color: 'source',
                curveness: 0.5
            },
            itemStyle: {
                color: '#1f77b4',
                borderColor: '#1f77b4'
            },
            label: {
                color: 'rgba(0,0,0,0.7)',
                fontFamily: 'Arial',
                fontSize: 10
            }
        }],
    tooltip: {
        trigger: 'item'
    }
}
myChart = echarts.init(this.$refs.chart)
myChart.setOption(option)
        },
        chart2 () {
            var data = []
            var data1 = []
            var data11 = []
            var data2 = []
            var data22 = []
            var data3 = []
            for (let i = 1; i < 8; i++) {
                data1.push({ name: `G1-${i}楼` })
                for (let j = 1; j < 8; j++) {
                    data2.push({ name: `G1-${i}0${j}` })
                }
            }
            for (let i = 1; i < 8; i++) {
                data11.push({ name: `G2-${i}楼` })
                for (let j = 1; j < 8; j++) {
                    data22.push({ name: `G2-${i}0${j}` })
                }
            }
            data = [{ name: '水',
                      itemStyle: {
                      normal: {
                         color: 'blue',
                     borderColor: '#f18bbf'
                        }
                    } }, { name: '电',
itemStyle: {
                      normal: {
                         color: '#f18bbf',
                     borderColor: '#f18bbf'
                        }
                    } }, { name: '气',
itemStyle: {
                      normal: {
                         color: '#0078D7',
                     borderColor: '#f18bbf'
                        }
                    } }, { name: '热',
itemStyle: {
                      normal: {
                         color: 'red',
                     borderColor: '#f18bbf'
                        }
                    } }, { name: 'G1' }, { name: 'G2' }, ...data1, ...data11]
            data1.forEach(element => {
                data3.push({ 'source': 'G1', 'target': element.name, 'value': (Math.random() * 1000).toFixed(2) })
                // var str = parseInt(element.name.slice(3, 4))
                // data2.forEach(element2 => {
                //     if (parseInt(element2.name.slice(3, 4)) === str) {
                //         data3.push({ 'source': element.name, 'target': element2.name, 'value': (Math.random() * 100).toFixed(2) })
                //     }
                // })
            })
            data11.forEach(element => {
                data3.push({ 'source': 'G2', 'target': element.name, 'value': (Math.random() * 1000).toFixed(2) })
                // var str = parseInt(element.name.slice(3, 4))
                // data22.forEach(element2 => {
                //     if (parseInt(element2.name.slice(3, 4)) === str) {
                //         data3.push({ 'source': element.name, 'target': element2.name, 'value': (Math.random() * 100).toFixed(2) })
                //     }
                // })
            })
            var option = {
    series: [
        {
            type: 'sankey',
            left: 50.0,
            top: 20.0,
            right: 150.0,
            bottom: 25.0,
            layoutIterations: 32,
            draggable: false,
        // orient: 'vertical',
        focusNodeAdjacency: true,
            levels: [{
    depth: 0,
    itemStyle: {
        color: '#13c2c2'
    },
    lineStyle: {
        color: 'source',
        opacity: 0.6
    }
}, {
    depth: 1,
    itemStyle: {
        color: '#b3cde3'
    },
    lineStyle: {
        color: 'source',
        opacity: 0.6
    }
},
{
    depth: 2,
    itemStyle: {
        color: 'green'
    },
    lineStyle: {
        color: 'source',
        opacity: 0.6
    }
},
{
    depth: 3,
    itemStyle: {
        color: 'yellow'
    },
    lineStyle: {
        color: 'source',
        opacity: 0.6
    }
}],
            z: 10,
            data: data,
            links: [{ 'source': '水', 'target': 'G1', 'value': (Math.random() * 2000).toFixed(2) },
            { 'source': '水', 'target': 'G2', 'value': (Math.random() * 200).toFixed(2) },
            { 'source': '电', 'target': 'G1', 'value': (Math.random() * 2000).toFixed(2) },
            { 'source': '电', 'target': 'G2', 'value': (Math.random() * 1700).toFixed(2) },
            { 'source': '气', 'target': 'G1', 'value': (Math.random() * 2000).toFixed(2) },
            { 'source': '气', 'target': 'G2', 'value': (Math.random() * 1500).toFixed(2) },
            { 'source': '热', 'target': 'G1', 'value': (Math.random() * 2000).toFixed(2) },
            { 'source': '热', 'target': 'G2', 'value': (Math.random() * 1500).toFixed(2) },
            ...data3],
            lineStyle: {
                color: 'source',
                curveness: 0.5
            },
            itemStyle: {
                color: '#1f77b4',
                borderColor: '#1f77b4'
            },
            label: {
                color: 'rgba(0,0,0,0.7)',
                fontFamily: 'Arial',
                fontSize: 10
            }
        }],
    tooltip: {
        trigger: 'item'
    }
}
myChart = echarts.init(this.$refs.chart)
myChart.setOption(option)
myChart.on('click', params => {
    if (params.dataType === 'node' && params.dataIndex > 3) {
        this.name = params.name
        this.chart3()
    }
	})
        },
        chart3 () {
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
        text: `${this.name}能耗详情`,
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
        data: ['电能', '水能', '气能', '热能']
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
            data: ['2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00']
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLabel: {
        //   formatter: '{value}' + this.energyType.unit,
            textStyle: {
                color: '#999'
            }
        }
        }
    ],
    series: [
        {
            name: '电能',
            type: 'bar',
            // barWidth: 15,
            // barCategoryGap: '40%',
            data: data1
        },
        {
            name: '水能',
            type: 'bar',
            data: data2
        },
        {
            name: '气能',
            type: 'bar',
            data: data3
        },
        {
            name: '热能',
            type: 'bar',
            data: data4
        }
    ]
}
myChart2 = echarts.init(this.$refs.chart2)
myChart2.setOption(option)
    }
    }
}
</script>

<style>

.box{
  width:100%;
  height:100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

.box img {
    max-width: 100%;
    max-height: 100%;
  }

</style>
