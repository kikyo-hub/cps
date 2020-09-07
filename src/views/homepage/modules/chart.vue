<template>
  <div class="box">
    <a-row>
      <a-col :span="24">
        <a-card>
          <a-card-meta><template slot="title"><router-link :to="{ name: 'enterprise' }"><a>用能监控</a></router-link></template></a-card-meta>
          <div ref="chart" style="width:85%;height:300px;"></div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import echarts from 'echarts'
import { Statistic } from 'ant-design-vue'
var myChart
export default {
        components: {
    AStatistic: Statistic
  },
  data () {
    return {
    }
    },
    created () {
        },
    mounted () {
        this.chart2()
    },
    methods: {
         chart2 () {
            var data = []
            var data1 = []
            var data11 = []
            // var data2 = []
            // var data22 = []
            var data3 = []
            var data4 = ['动力系统', '空调系统', '消防系统', '其它系统', '客控系统']
            for (let i = 0; i < 5; i++) {
                data1.push({ name: `G1-${data4[i]}` })
                // for (let j = 1; j < 8; j++) {
                //     data2.push({ name: `G1-${i}0${j}` })
                // }
            }
            for (let i = 0; i < 5; i++) {
                data11.push({ name: `G2-${data4[i]}` })
                // for (let j = 1; j < 8; j++) {
                //     data22.push({ name: `G2-${i}0${j}` })
                // }
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
                data3.push({ 'source': 'G1', 'target': element.name, 'value': (Math.random() * 800).toFixed(2) })
                // var str = parseInt(element.name.slice(3, 4))
                // data2.forEach(element2 => {
                //     if (parseInt(element2.name.slice(3, 4)) === str) {
                //         data3.push({ 'source': element.name, 'target': element2.name, 'value': (Math.random() * 100).toFixed(2) })
                //     }
                // })
            })
            data11.forEach(element => {
                data3.push({ 'source': 'G2', 'target': element.name, 'value': (Math.random() * 500).toFixed(2) })
                // var str = parseInt(element.name.slice(3, 4))
                // data22.forEach(element2 => {
                //     if (parseInt(element2.name.slice(3, 4)) === str) {
                //         data3.push({ 'source': element.name, 'target': element2.name, 'value': (Math.random() * 100).toFixed(2) })
                //     }
                // })
            })
            // console.log(data, data3)
            var option = {
    series: [
        {
            type: 'sankey',
            left: 0.0,
            top: 0.0,
            right: 100.0,
            bottom: 2.0,
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
            links: [{ 'source': '水', 'target': 'G1', 'value': (Math.random() * 600).toFixed(2) },
            { 'source': '水', 'target': 'G2', 'value': (Math.random() * 400).toFixed(2) },
            { 'source': '电', 'target': 'G1', 'value': (Math.random() * 800).toFixed(2) },
            { 'source': '电', 'target': 'G2', 'value': (Math.random() * 700).toFixed(2) },
            { 'source': '气', 'target': 'G1', 'value': (Math.random() * 1000).toFixed(2) },
            { 'source': '气', 'target': 'G2', 'value': (Math.random() * 500).toFixed(2) },
            { 'source': '热', 'target': 'G1', 'value': (Math.random() * 1000).toFixed(2) },
            { 'source': '热', 'target': 'G2', 'value': (Math.random() * 800).toFixed(2) },
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
    console.log(params)
    if (params.dataType === 'node' && params.dataIndex > 3) {
        if (params.name === 'G1' || params.name === 'G2') {
           this.$router.push({ name: 'building' })
        } else {
            this.$router.push({ name: 'aircondition_system' })
        }
    }
	})
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
