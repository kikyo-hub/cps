<template>
  <a-card>
    <a-card :bordered="false" title="楼栋信息">
      <template v-if="building !== null">
        <a-dropdown style="margin-left: 10px" slot="extra">
          <a class="ant-dropdown-link" @click="e => e.preventDefault()">
            {{ building.buildingName }}
            <a-icon type="home" />
          </a>
          <a-menu slot="overlay" @click="handleBuiChange">
            <a-menu-item v-for="item in allbuildingdata" :key="item">
              <p>{{ item }}</p>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </template>
      <room-information
        :editable="false"
        :showtitle="false"
        :floorRoomData="floorRoomData"
        :floorColor="floorColor"
        @floorClick="floorClick"
        @roomClick="roomClick"
      ></room-information>
    </a-card>
    <a-form layout="inline" @keyup.enter.native="searchQuery">
      <a-card :bordered="true" title="能耗对标">
        <span slot="tab">行业平均</span>
        <!-- :pagination="pagination" -->
        <a-table
          ref="table"
          style="margin-bottom: 24px"
          row-key="monitorId"
          :columns="goodsColumns1"
          :data-source="loadGoodsData1"
          :pagination="{pageSize:5}"
          bordered
        >
          <span slot="monitorIdTitle">
            <a-icon type="idcard" />监测点编号
          </span>
          <span slot="creatorTitle">
            <a-icon type="team" />创建人员
          </span>
          <span slot="monitorNameTitle">
            <a-icon type="bars" />监测点名称
          </span>
          <span slot="monitorDescTitle">
            <a-icon type="star" />描述信息
          </span>
          <span slot="deviceTypeTitle">
            <a-icon type="bug" />用能设备类型
          </span>
          <span slot="equipAddressTitle">
            <a-icon type="reconciliation" />设备地址
          </span>
          <span slot="diagnosisTypeDescTitle">
            <a-icon type="cluster" />诊断点类型
          </span>
          <span slot="buildingNoTitle">
            <a-icon type="calculator" />计算值
          </span>
          <span slot="floorNoTitle">
            <a-icon type="check-square" />标准值
          </span>
          <span slot="difference">
            <a-icon type="minus-circle" />差值
          </span>
        </a-table>
      </a-card>
    </a-form>
  </a-card>
</template>

<script>
import { STable } from '@/components'
import { Collapse } from 'ant-design-vue'
import { GetEnterpriseData } from '@/api/archives/enterprise'
import RoomInformation from '@/views/components/RoomInformation'

const ACollapsePanel = Collapse.Item
const loadGoodsData = []
const loadGoodsData1 = []

const goodsColumns1 = [
  {
    // title: '监测点ID',
    dataIndex: 'monitorId',
    slots: { title: 'monitorIdTitle' },
    scopedSlots: { customRender: 'monitorId' },
    key: 'monitorId'
  },
  {
    // title: '监测点名称',
    dataIndex: 'monitorName',
    slots: { title: 'monitorNameTitle' },
    scopedSlots: { customRender: 'monitorName' },
    key: 'monitorName'
  },
  {
    // title: '用能设备类型',
    dataIndex: 'deviceTypeName',
    slots: { title: 'deviceTypeTitle' },
    scopedSlots: { customRender: 'deviceTypeName' },
    key: 'deviceTypeName',
    align: 'center'
  },
  {
    // title: '设备地址',
    dataIndex: 'equipAddress',
    slots: { title: 'equipAddressTitle' },
    scopedSlots: { customRender: 'equipAddress' },
    key: 'equipAddress',
    align: 'center'
  },
  {
    // title: '所属楼栋',
    dataIndex: 'BUILDING_NO',
    slots: { title: 'buildingNoTitle' },
    scopedSlots: { customRender: 'BUILDING_NO' },
    key: 'BUILDING_NO',
    align: 'center'
  },
  {
    // title: '所属楼层',
    dataIndex: 'FLOOR_NAME',
    slots: { title: 'floorNoTitle' },
    scopedSlots: { customRender: 'FLOOR_NAME' },
    key: 'FLOOR_NAME',
    align: 'center'
  },

  {
    // title: '创建时间',
    dataIndex: 'differenceValue',
    slots: { title: 'difference' },
    scopedSlots: { customRender: 'differenceValue' },
    key: 'differenceValue',
    align: 'center'
  }
]

export default {
  inject: ['reload'],
  components: {
    STable,
    ACollapse: Collapse,
    ACollapsePanel,
    RoomInformation
  },
  data () {
    return {
      show: true,
      floorColor: [],
      // loading: true,
      buildingdata: [],
      goodsColumns1,
      loadGoodsData,
      loadGoodsData1,
      building: null,
      buildingNo: '',
      allbuildingdata: [],
      queryParam: {},
      floorRoomData: []
    }
  },
  created () {
    this.getdata()
  },
  mounted () {},
  methods: {
    handleBuiChange (e) {
      var filterdata = this.buildingdata.filter((element) => element.buildingName === e.key)
      this.building = filterdata[0]
      this.floorRoomData = this.building.floors
      this.loadGoodsData1 = this.building.monitors
      this.buildingNo = this.building.buildingNo
      this.handeleColor(this.floorRoomData)
    },
    floorClick (monitors) {
      this.loadGoodsData1 = monitors
    },
    roomClick (monitors) {
      this.loadGoodsData1 = monitors
    },
    handeleColor (data) {
      var arr = []
      for (let i = 0; i < data.length; i++) {
        var ele = {}
        ele.index = i
        ele.color = '#2F54EB'
        ele.roomcolor = []
        for (let x = 0; x < data[i].rooms.length; x++) {
          var ele2 = {}
          ele2.index = x
          ele2.color = '#2db7f5'
          ele.roomcolor.push(ele2)
        }
        arr.push(ele)
      }
      this.floorColor = arr
    },
    getdata () {
      // 获取楼栋及诊断点数据
      // this.loading = true
      GetEnterpriseData().then((response) => {
        this.buildingdata = response.result.Buildings
        var arr = []
        this.buildingdata.forEach((element) => {
          arr.push(element.buildingName)
        })
        this.allbuildingdata = arr
        this.building = response.result.Buildings[0]
        this.floorRoomData = response.result.Buildings[0].floors
        this.loadGoodsData1 = response.result.Buildings[0].monitors
        this.buildingNo = response.result.Buildings[0].buildingNo
        this.handeleColor(this.floorRoomData)
      })
    }
  },
  watch: {
    // 方法1
    $route: function (to, from) {
      // 监听路由是否变化
      if (this.$route.params.id) {
      }
    }
  }
}
</script>

<style lang="less" scoped>
.title {
  color: rgba(0, 0, 0, 0.85);
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 16px;
}
</style>
