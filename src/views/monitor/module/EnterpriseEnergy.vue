<template>
  <div>
    <a-card :bordered="true">
      <a-table
        ref="table"
        style="margin-bottom: 24px"
        row-key="time"
        :columns="goodsColumns1"
        :data-source="loadGoodsData1"
        :pagination="{pageSize:5}"
        bordered
        size="small"
      >
        <span slot="creatorTitle"><a-icon type="team" />创建人员</span>
        <span slot="monitorDescTitle"><a-icon type="star" />描述信息</span>
        <span slot="deviceTypeTitle"><a-icon type="bug" />用能类型</span>
        <span slot="diagnosisTypeDescTitle"><a-icon type="cluster" />诊断点类型 </span>
        <span slot="timeTitle"><a-icon type="clock-circle" />时间</span>
        <span slot="buildingNoTitle"><a-icon type="calculator" />计算值</span>
        <span slot="floorNoTitle"><a-icon type="check-square" />标准值</span>
        <span slot="difference"><a-icon type="minus-circle" />差值</span>
      </a-table>
      <chart></chart>
    </a-card>
  </div>
</template>
<script>
import chart from './chart'
const standard = [
    { key: '0', name: '行业标准' },
    { key: '1', name: '安徽省公共建筑节能设计标准标准' },
    { key: '2', name: '民用建筑能耗标准' }
]
// import echarts from 'echarts'
const goodsColumns1 = [
  {
    dataIndex: 'deviceTypeName',
    slots: { title: 'deviceTypeTitle' },
    scopedSlots: { customRender: 'deviceTypeName' },
    key: 'deviceTypeName',
    align: 'center'
  },
  {
    dataIndex: 'time',
    slots: { title: 'timeTitle' },
    scopedSlots: { customRender: 'time' },
    key: 'time',
    align: 'center'
  },
  {
    dataIndex: 'BUILDING_NO',
    slots: { title: 'buildingNoTitle' },
    scopedSlots: { customRender: 'BUILDING_NO' },
    key: 'BUILDING_NO',
    align: 'center'
  },
  {
    dataIndex: 'FLOOR_NAME',
    slots: { title: 'floorNoTitle' },
    scopedSlots: { customRender: 'FLOOR_NAME' },
    key: 'FLOOR_NAME',
    align: 'center'
  },

  {
    dataIndex: 'differenceValue',
    slots: { title: 'difference' },
    scopedSlots: { customRender: 'differenceValue' },
    key: 'differenceValue',
    align: 'center'
  }
]
export default {
  props: {
    energyType: {
      type: String,
      default: '电能'
    }
  },
    components: {
        chart
    },
    data () {
        return {
            goodsColumns1,
            loadGoodsData1: [],
            standard
        }
    },
    created () {
const loadGoodsData = []
for (let i = 0; i < 5; i++) {
    loadGoodsData.push(
        {
        deviceTypeName: this.energyType,
        time: `8月 ${i + 10} 号`,
        BUILDING_NO: '13.11',
        FLOOR_NAME: '12',
        differenceValue: '1.11'
    }
    )
}
this.loadGoodsData1 = loadGoodsData
    }
}
</script>
