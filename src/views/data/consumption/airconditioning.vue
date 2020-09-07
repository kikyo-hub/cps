<template>
  <div>
    <a-card :loading="loading" :bordered="false">
      <div class="salesCard">
        <a-tabs default-active-key="1" size="large" :tab-bar-style="{marginBottom: '24px', paddingLeft: '16px'}">
          <div class="extra-wrapper" slot="tabBarExtraContent">
            <div class="extra-item">
              <h3 style="font-size:24px">用电量</h3>
            </div>
          </div>
          <a-tab-pane tab="昨日" key="1">
            <a-row>
              <a-col :xl="16" :lg="12" :md="12" :sm="24" :xs="24">
                <bar row-key="10" size="small" :data="barData" title="耗电变化/kW·h" pagination="{ pageSize: 5 }"/>
              </a-col>
              <a-col :xl="8" :lg="12" :md="12" :sm="24" :xs="24">
                <div class="extra-item">
                  <h3>总耗电：1146kW·h</h3>
                </div>
                <v-chart :force-fit="true" :height="405" :data="pieData" :scale="pieScale">
                  <v-tooltip :showTitle="false" dataKey="item*percent" />
                  <v-axis />
                  <!-- position="right" :offsetX="-140" -->
                  <v-legend dataKey="item"/>
                  <v-pie position="percent" color="item" :vStyle="pieStyle" />
                  <v-coord type="theta" :radius="0.75" :innerRadius="0.6" />
                </v-chart>
              </a-col>
            </a-row>
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-card>
  </div>
</template>

<script>
import { ChartCard, MiniArea, MiniBar, MiniProgress, RankList, Bar, Trend, NumberInfo, MiniSmoothArea } from '@/components'
import { mixinDevice } from '@/utils/mixin'
const barData = []
const barData2 = []
const barData3 = []
const barData4 = []
const barData5 = []
const DataSet = require('@antv/data-set')

const sourceData = []
const sourceData2 = []
const sourceData3 = []
const sourceData4 = []
const sourceData5 = []

const pieScale = [{
  dataKey: 'percent',
  min: 0,
  formatter: '.0%'
}]

const dv = new DataSet.View().source(sourceData)
const dv2 = new DataSet.View().source(sourceData2)
const dv3 = new DataSet.View().source(sourceData3)
const dv4 = new DataSet.View().source(sourceData4)
const dv5 = new DataSet.View().source(sourceData5)
const pieData = dv.rows
const pieData2 = dv2.rows
const pieData3 = dv3.rows
const pieData4 = dv4.rows
const pieData5 = dv5.rows

export default {
  name: 'Analysis',
  mixins: [mixinDevice],
  components: {
    ChartCard,
    MiniArea,
    MiniBar,
    MiniProgress,
    RankList,
    Bar,
    Trend,
    NumberInfo,
    MiniSmoothArea
  },
  data () {
    return {
      loading: true,

      barData,
      barData2,
      barData3,
      barData4,
      barData5,
      //
      pieScale,
      pieData,
      pieData2,
      pieData3,
      pieData4,
      pieData5,
      sourceData,
      sourceData2,
      sourceData3,
      sourceData4,
      sourceData5,
      pieStyle: {
        stroke: '#fff',
        lineWidth: 1
      }
    }
  },
mounted: function () {
this.getdata()
this.getpieData()
  },
  created () {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
  },

 methods: {
      getdata () {
      this.$http.get('/testdata/DayList').then(response => {
      this.barData = response.result
})
      this.$http.get('/testdata/WeekList').then(response => {
      this.barData2 = response.result
})
      this.$http.get('/testdata/MonthList').then(response => {
      this.barData3 = response.result
})
      this.$http.get('/testdata/YearList').then(response => {
      this.barData4 = response.result
})
      this.$http.get('/testdata/List').then(response => {
      this.barData5 = response.result
})
      },
      getpieData () {
      this.$http.get('/testdata/Daypie').then(response => {
      var sourceData = response.result
      var dv = new DataSet.View().source(sourceData)
      dv.transform({
        type: 'percent',
        field: 'count',
        dimension: 'item',
        as: 'percent'
      })
      this.pieData = dv.rows
      })

      this.$http.get('/testdata/Weekpie').then(response => {
      var sourceData = response.result
      var dv = new DataSet.View().source(sourceData)
      dv.transform({
        type: 'percent',
        field: 'count',
        dimension: 'item',
        as: 'percent'
      })
      this.pieData2 = dv.rows
      })

      this.$http.get('/testdata/Monthpie').then(response => {
      var sourceData = response.result
      var dv = new DataSet.View().source(sourceData)
      dv.transform({
        type: 'percent',
        field: 'count',
        dimension: 'item',
        as: 'percent'
      })
      this.pieData3 = dv.rows
      })

      this.$http.get('/testdata/Yearpie').then(response => {
      var sourceData = response.result
      var dv = new DataSet.View().source(sourceData)
      dv.transform({
        type: 'percent',
        field: 'count',
        dimension: 'item',
        as: 'percent'
      })
      this.pieData4 = dv.rows
      })

      this.$http.get('/testdata/pie').then(response => {
      var sourceData = response.result
      var dv = new DataSet.View().source(sourceData)
      dv.transform({
        type: 'percent',
        field: 'count',
        dimension: 'item',
        as: 'percent'
      })
      this.pieData5 = dv.rows
      })
      }
}
}
</script>

<style lang="less" scoped>
.ant-pro-components-tag-select {
  /deep/ .ant-pro-tag-select .ant-tag {
    margin-right: 24px;
    padding: 0 8px;
    font-size: 14px;
  }
}

.list-articles-trigger {
  margin-left: 12px;
}
</style>
