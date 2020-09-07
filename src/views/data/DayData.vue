<template>
  <a-card>
    <a-row :gutter="8">
      <a-col :span="4">
        <s-tree
          :dataSource="monitorTree"
          :search="false"
          :openKeys.sync="openKeys"
          @click="handleClick"
          style="min-height:666px;max-height:666px;overflowY:scroll;"></s-tree>
      </a-col>
      <a-col :span="20">
        <a-row>
          <a-col :span="24">
            <div ref="dayEnergyContainer" style="height:350px;margin-top:-10px"></div>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="24">
            <s-table
              ref="table"
              row-key="dataTime"
              size="default"
              :columns="columns"
              :data="loadData"
            >
            </s-table>
          </a-col>
        </a-row>
      </a-col>
    </a-row>
  </a-card>
</template>

<script>
import { STable } from '@/components'
import STree from '@/components/Tree/Tree'
import { GetMonitorDayEnergy, GetMonitorTree, GetMonitorCurveEnergy } from '@/api/data/MonitorPointDetailed'
import echarts from 'echarts'

export default {
  components: {
    STable,
    STree
  },
  data () {
    return {
      monitorTree: [],
      openKeys: ['101'],
      columns: [
        {
          title: '通信地址',
          dataIndex: 'devAddress',
          key: 'devAddress',
          align: 'center'
        },
        {
          title: '数据时间',
          dataIndex: 'dataTime',
          key: 'dataTime',
          align: 'center'
        },
        {
          title: '日正向有功总能示值',
          dataIndex: 'tPapR',
          key: 'tPapR',
          align: 'center'
        },
        {
          title: '当日用电量',
          dataIndex: 'thisDayPapR',
          key: 'thisDayPapR',
          align: 'center'
        }
      ],
      queryParam: {
        devAddress: ''
      },
      loadData: parameter => {
        // console.log('请求参数', JSON.stringify(this.queryParam))
        return GetMonitorDayEnergy(Object.assign(parameter, this.queryParam)).then(response => {
          // console.log('response', JSON.stringify(response, null, 2))
          return response.result
        })
      },
      dayChart: [],
      DXdata: [],
      DYdata: [],
      da: []
    }
  },
  mounted: function () {
    this.getMonitorTree()
    // this.getXXX()
  },
  methods: {
    getXXX () {
      GetMonitorCurveEnergy({ pageNo: 1, pageSize: 100 }).then(response => {
        console.table(response.result.data)
      })
    },
    handleClick (e) {
      // this.$message.warning(e.key)
      this.queryParam.devAddress = e.key
      this.$refs.table.refresh(true)
      this.createChart(this.queryParam.devAddress)
    },
    getMonitorTree () {
      GetMonitorTree().then(response => {
        // console.log(JSON.stringify(response.result, null, 2))
        this.monitorTree.push({
          'title': '监测点',
          'key': '101',
          'children': []
        })
        this.monitorTree[0].children = response.result
        this.queryParam.devAddress = this.monitorTree[0].children[0].key
        this.queryParam.devAddress = '000000147889' // 临时默认到9层 数据好看 以后删除本条
        this.$refs.table.refresh(true)
        this.createChart(this.queryParam.devAddress)
      })
    },
    createChart (devAddress) {
      GetMonitorDayEnergy({ 'pageNo': 1, 'pageSize': 10, 'devAddress': devAddress }).then(res => {
        this.da = res.result.data
        this.DXdata = []
        this.DYdata = []
        var dlength = this.da.length - 1
        for (let i = 0; i < this.da.length; i++) {
          this.DXdata.push(this.da[ dlength - i ].thisDataTime)
          this.DYdata.push(this.da[ dlength - i ].thisDayPapR)
        }
        this.chart()
      })
    },
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
            data: this.DXdata,
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
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                { offset: 0, color: '#14c8d4' },
                { offset: 1, color: '#43eec6' }
              ])
            },
            data: this.DYdata
          },
          {
            name: '用电趋势',
            type: 'line',
            smooth: true,
            data: this.DYdata
          }
        ]
      }
      this.dayChart = echarts.init(this.$refs.dayEnergyContainer, 'light')
      this.dayChart.setOption(option)
    }
  }
}
</script>

<style lang="less" >
</style>
