<template>
  <!-- <page-view> -->
  <div>
    <a-row>
      <a-col :span="24">
        <a-card title="楼栋信息" :bordered="false">
          <a slot="extra" @click="$refs.BuildingInsert.edit(building)">编辑</a>
          <detail-list>
            <template v-if="building !== null">
              <detail-list-item term="楼栋名称">
                <a-dropdown style="margin-left: 10px">
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
              </detail-list-item>
              <!-- <detail-list-item term="楼栋编号">{{ buildingdata[0].buildingNo }}</detail-list-item> -->
              <!-- <detail-list-item term="楼栋名称">{{ buildingdata[0].buildingName }}</detail-list-item> -->
              <detail-list-item term="楼栋面积">{{ building.buildingArea + '平方米' }}</detail-list-item>
              <detail-list-item term="楼栋层数">{{ building.floorCnt + '层' }}</detail-list-item>
              <!-- <detail-list-item term="楼栋地址">{{ building.buildingAddress }}</detail-list-item> -->
              <detail-list-item term="员工人数">{{ building.employees + '人' }}</detail-list-item>
              <detail-list-item term="楼栋类型">{{ building.building_category }}</detail-list-item>
              <detail-list-item term="建造时间">{{ building.buildingTime.substring(0,10) }}</detail-list-item>
            </template>
          </detail-list>
        </a-card>
      </a-col>
    </a-row>

    <a-divider style="margin-bottom: -10px" />
    <a-card>
      <room-information
        :editable="true"
        color="green"
        :floorRoomData="floorRoomData"
        :floorColor="floorColor"
        @floorClick="floorClick"
        @roomClick="roomClick"
        @deleteFloor="deleteFloor1"
        @deleteRoom="deleteRoom"
        @updateFloor="updateFloor"
        @updateRoom="updateRoom"
        @addFloor="addFloor"
        @addRoom="addRoom">
      </room-information>
      <a-form layout="inline">
        <a-card :bordered="true">
          <a-tabs defaultActiveKey="0" style="margin-top:-20px">
            <a-tab-pane key="0">
              <span slot="tab">监测点信息</span>
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
                  <a-icon type="switcher" />监测点编号
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
                  <a-icon type="home" />所属楼栋
                </span>
                <span slot="floorNoTitle">
                  <a-icon type="hdd" />所属楼层
                </span>
                <span slot="createTimeTitle">
                  <a-icon type="clock-circle" />监测点描述
                </span>
              </a-table>
            </a-tab-pane>
            <a slot="tabBarExtraContent" @click="allClick()">
              查看所有监测点
            </a>
            <!-- <a-tab-pane key="1">
              <span slot="tab">诊断点信息</span>
              <a-table
                ref="table"
                style="margin-bottom: 24px"
                row-key="DIAGNOSIS_ID"
                :columns="goodsColumns"
                :data-source="loadGoodsData"
                bordered
              >
                <span slot="diagnosisIdTitle">
                  <a-icon type="switcher" />诊断点编号
                </span>
                <span slot="creatorTitle">
                  <a-icon type="team" />创建人员
                </span>
                <span slot="diagnosisNameTitle">
                  <a-icon type="bars" />诊断点名称
                </span>
                <span slot="diagnosisRuleListTitle">
                  <a-icon type="star" />描述信息
                </span>
                <span slot="diagnosisTypeDescTitle">
                  <a-icon type="cluster" />诊断点类型
                </span>
                <span slot="createTimeTitle">
                  <a-icon type="clock-circle" />创建时间
                </span>
              </a-table>
            </a-tab-pane> -->
          </a-tabs>
        </a-card>
      </a-form>
    </a-card>
    <BuildingFormFloor ref="buildingformfloor" @refresh="getdata"/>
    <BuildingFormRoom ref="buildingformroom" @refresh="getdata" />
    <building-insert ref="BuildingInsert" @refresh="getdata"></building-insert>
  </div>
</template>

<script>
import { Collapse } from 'ant-design-vue'
import { PageView } from '@/layouts'
// import { getServiceList } from '@/api/user/manage'
import DetailList from '@/components/tools/DetailList'
import { GetEnterpriseData } from '@/api/archives/enterprise'
import BuildingInsert from '@/views/archives/modules/BuildingInsert'
// import buildingEditForm from './modules/buildingEditForm'
import BuildingFormFloor from './modules/BuildingFormFloor'
import BuildingFormRoom from './modules/BuildingFormRoom'
import RoomInformation from '@/views/components/RoomInformation'
import { deleteFloor, deleteRoom } from '@/api/archives/building'
const ACollapsePanel = Collapse.Item
const loadGoodsData = []
const loadGoodsData1 = []
const DetailListItem = DetailList.Item
const goodsColumns = [
  {
    // title: '诊断点ID',
    dataIndex: 'DIAGNOSIS_ID',
    slots: { title: 'diagnosisIdTitle' },
    scopedSlots: { customRender: 'DIAGNOSIS_ID' },
    key: 'DIAGNOSIS_ID'
  },
  {
    // title: '诊断点名称',
    dataIndex: 'DIAGNOSIS_NAME',
    slots: { title: 'diagnosisNameTitle' },
    scopedSlots: { customRender: 'DIAGNOSIS_NAME' },
    key: 'DIAGNOSIS_NAME'
  },
  {
    // title: '诊断点类型',
    dataIndex: 'DIAGNOSIS_TYPE',
    slots: { title: 'diagnosisTypeDescTitle' },
    scopedSlots: { customRender: 'DIAGNOSIS_TYPE' },
    key: 'DIAGNOSIS_TYPE',
    align: 'center'
  },
  {
    // title: '描述信息',
    dataIndex: 'diagnosisTypeDesc',
    slots: { title: 'diagnosisRuleListTitle' },
    scopedSlots: { customRender: 'diagnosisTypeDesc' },
    key: 'diagnosisTypeDesc',
    align: 'center'
  },
  {
    // title: '创建人员',
    dataIndex: 'creator',
    slots: { title: 'creatorTitle' },
    scopedSlots: { customRender: 'creator' },
    key: 'cerator',
    align: 'center'
  },
  {
    // title: '创建时间',
    dataIndex: 'createTime',
    slots: { title: 'createTimeTitle' },
    scopedSlots: { customRender: 'createTime' },
    key: 'createTime',
    align: 'center'
  }
]
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
  // {
  //   // title: '所属楼栋',
  //   dataIndex: 'BUILDING_NO',
  //   slots: { title: 'buildingNoTitle' },
  //   scopedSlots: { customRender: 'BUILDING_NO' },
  //   key: 'BUILDING_NO',
  //   align: 'center'
  // },
  // {
  //   // title: '所属楼层',
  //   dataIndex: 'FLOOR_NAME',
  //   slots: { title: 'floorNoTitle' },
  //   scopedSlots: { customRender: 'FLOOR_NAME' },
  //   key: 'FLOOR_NAME',
  //   align: 'center'
  // },
  {
    // title: '设备地址',
    dataIndex: 'equipAddress',
    slots: { title: 'equipAddressTitle' },
    scopedSlots: { customRender: 'equipAddress' },
    key: 'equipAddress',
    align: 'center'
  },
  // {
  //   // title: '创建人员',
  //   dataIndex: 'creator',
  //   slots: { title: 'creatorTitle' },
  //   scopedSlots: { customRender: 'creator' },
  //   key: 'cerator',
  //   align: 'center'
  // },
  {
    // title: '创建时间',
    dataIndex: 'monitorDesc',
    slots: { title: 'createTimeTitle' },
    scopedSlots: { customRender: 'monitorDesc' },
    key: 'monitorDesc',
    align: 'center'
  }
]

export default {
  inject: ['reload'],
  components: {
    PageView,
    DetailList,
    DetailListItem,
    ACollapse: Collapse,
    ACollapsePanel,
    BuildingInsert,
    BuildingFormFloor,
    BuildingFormRoom,
    RoomInformation
  },
  data () {
    return {
      show: true,
      floorColor: [],
      // loading: true,
      buildingdata: [],
      goodsColumns,
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
  mounted () {
  },
  methods: {
    deleteFloor1 (floor) {
      if (floor.monitors.length !== 0 || floor.rooms.length !== 0) {
        this.$message.warning('该楼层存在房间或者监测点，不能删除！')
      } else {
        deleteFloor(floor.floorNo).then(res => {
          if (res.result) {
              this.getdata()
        this.$message.warning('删除成功！')
            }
        })
      }
    },
    deleteRoom (room) {
      if (room.monitors.length !== 0) {
        this.$message.warning('该房间存在监测点，不能删除！')
      } else {
        deleteRoom(room.roomNo).then(res => {
          if (res.result) {
              this.getdata()
        this.$message.warning('删除成功！')
            }
        })
      }
    },
    updateFloor (floor) {
      this.$refs.buildingformfloor.update(floor)
    },
    updateRoom (room) {
      this.$refs.buildingformroom.update(room)
    },
    addFloor () {
    this.$refs.buildingformfloor.add(this.buildingNo)
  },
  addRoom (floorNo) {
    this.$refs.buildingformroom.add(floorNo)
  },
    handleBuiChange (e) {
      var filterdata = this.buildingdata.filter(element => element.buildingName === e.key)
      this.building = filterdata[0]
      this.floorRoomData = this.building.floors
      this.loadGoodsData1 = this.building.monitors
      this.buildingNo = this.building.buildingNo
      this.handeleColor(this.floorRoomData)
      // console.log('click', filterdata[0])
    },
    floorClick (monitors) {
      this.loadGoodsData1 = monitors
    },
    roomClick (monitors) {
      this.loadGoodsData1 = monitors
    },
    allClick () {
      this.loadGoodsData1 = this.building.monitors
      this.floorColor.forEach(element => {
        element.color = '#2F54EB'
        element.roomcolor.forEach(element2 => {
          element2.color = '#2db7f5'
        })
      })
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
      GetEnterpriseData().then(response => {
        this.buildingdata = response.result.Buildings
        var arr = []
        this.buildingdata.forEach(element => {
          arr.push(element.buildingName)
        })
        this.allbuildingdata = arr
      // this.loading = !this.loading
        if (this.$route.params.building === undefined || this.$route.params.building === null) {
        this.building = response.result.Buildings[0]
        this.floorRoomData = response.result.Buildings[0].floors
        this.loadGoodsData1 = response.result.Buildings[0].monitors
        this.buildingNo = response.result.Buildings[0].buildingNo
    this.handeleColor(this.floorRoomData)
        // console.log('无参', this.allbuildingdata)
        } else {
          var filterdata = this.buildingdata.filter(element => element.buildingName === this.$route.params.building)
      this.building = filterdata[0]
      this.floorRoomData = this.building.floors
      this.loadGoodsData1 = this.building.monitors
      this.buildingNo = this.building.buildingNo
      this.handeleColor(this.floorRoomData)
          // console.log('有参')
        }
      })
    }
  },
  computed: {
    // handeleColor1 () {
    //   var arr = []
    //   for (let i = 0; i < this.floorRoomData.length; i++) {
    //   var ele = {}
    //   ele.index = i
    //   ele.color = '#2F54EB'
    //   ele.roomcolor = []
    //   for (let x = 0; x < this.floorRoomData[i].rooms.length; x++) {
    //     var ele2 = {}
    //     ele2.index = x
    //     ele2.color = '#2db7f5'
    //     ele.roomcolor.push(ele2)
    //   }
    //   arr.push(ele)
    // }
    // return arr
    // }
  },
  watch: {
    // 方法1
    $route: function (to, from) {
      // 监听路由是否变化
      if (this.$route.params.id) {
        // 判断条件1  判断传递值的变化
        // 获取文章数据
        // GetBuiDiaData(this.$route.params.id).then(response => {
        //   this.buildingdata = response.result
        //   this.buildingdata[0].buildingTime = this.buildingdata[0].buildingTime.substring(0, 10)
        //   this.loadGoodsData = this.buildingdata[0].diagnosis
        //   this.firstbuildingName = this.buildingdata[0].buildingName
        // })
        // GetMonitorData(this.$route.params.id).then(response => {
        //   this.loadGoodsData1 = response.result
        //   for (let i = 0; i < this.loadGoodsData1.length; i += 1) {
        //      this.loadGoodsData1[i].createTime = this.loadGoodsData1[i].createTime.substring(0, 10)
        //   }
        // })
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
