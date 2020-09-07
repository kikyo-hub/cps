<template>
  <a-card>
    <div ref="chart" style="width:90%;height:300px"></div>
    <!-- <div ref="chart2" style="width:90%;height:1300px"></div> -->
  </a-card>
</template>
<script>
import echarts from 'echarts'
var myChart
var myChart2
export default {
    data () {
        return {}
    },
    mounted () {
        this.chart()
        // this.chart2()
        // this.chart3()
    },
    methods: {
        chart () {
            var option = {
    grid: {
        top: '5%',
        left: '5%'
    },
    xAxis: {
        data: ['8.10', '8.11', '8.12', '8.13', '8.14']
    },
    yAxis: {
        type: 'value'
    },
    series: [{
        data: [12, 20, -15, 8, -7],
        type: 'line',
        symbol: 'triangle',
        symbolSize: 20,
        lineStyle: {
            color: 'green',
            width: 4,
            type: 'dashed'
        },
        itemStyle: {
            borderWidth: 3,
            borderColor: 'yellow',
            color: 'blue'
        }
    }]
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
            for (let i = 1; i < 10; i++) {
                data1.push({ name: `G1-${i}楼` })
                for (let j = 1; j < 10; j++) {
                    data2.push({ name: `G1-${i}0${j}` })
                }
            }
            for (let i = 1; i < 6; i++) {
                data11.push({ name: `G2-${i}楼` })
                for (let j = 1; j < 9; j++) {
                    data22.push({ name: `G2-${i}0${j}` })
                }
            }
            data = [{ name: '水' }, { name: 'G1' }, { name: 'G2' }, ...data1, ...data11, ...data2, ...data22]
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
}],
            z: 10,
            data: data,
            links: [{ 'source': '水', 'target': 'G1', 'value': (Math.random() * 9000).toFixed(2) },
            { 'source': '水', 'target': 'G2', 'value': (Math.random() * 5000).toFixed(2) },
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
myChart2 = echarts.init(this.$refs.chart2)
myChart2.setOption(option)
        },
        chart3 () {
            var data = []
            var data1 = []
            var data11 = []
            var data2 = []
            var data22 = []
            var data3 = []
            for (let i = 1; i < 10; i++) {
                data1.push({ name: `G1-${i}楼` })
                for (let j = 1; j < 10; j++) {
                    data2.push({ name: `G1-${i}0${j}` })
                }
            }
            for (let i = 1; i < 6; i++) {
                data11.push({ name: `G2-${i}楼` })
                for (let j = 1; j < 9; j++) {
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
            { 'source': '水', 'target': 'G2', 'value': (Math.random() * 1500).toFixed(2) },
            { 'source': '电', 'target': 'G1', 'value': (Math.random() * 2000).toFixed(2) },
            { 'source': '电', 'target': 'G2', 'value': (Math.random() * 1500).toFixed(2) },
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
myChart2 = echarts.init(this.$refs.chart2)
myChart2.setOption(option)
        }
    }
}
</script>
