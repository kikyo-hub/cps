<template>
  <div >
    <a-row>
      <a-col :span="24">
        <a-card title="客户信息" :bordered="false">
          <a slot="extra" @click="handleEdit(enterprisedata)">编辑</a>
          <detail-list>
            <template v-if="enterprisedata">
              <detail-list-item term="客户名称">{{ enterprisedata.name }}</detail-list-item>
              <detail-list-item term="客户编号">{{ enterprisedata.id }}</detail-list-item>
              <detail-list-item term="客户电话">{{ enterprisedata.tel }}</detail-list-item>
              <detail-list-item term="客户地址">{{ enterprisedata.address }}</detail-list-item>
              <detail-list-item term="信用等级">{{ enterprisedata.credit_rate }}</detail-list-item>
              <detail-list-item term="行业分类">{{ enterprisedata.pro_sort }}</detail-list-item>
              <detail-list-item term="客户类别">{{ enterprisedata.category }}</detail-list-item>
              <detail-list-item term="建档时间">{{ enterprisedata.create_date }}</detail-list-item>
            </template>
          </detail-list>
        </a-card>
      </a-col>
      <!-- <a-col :span="6">
        <img src="~@/assets/中天.jpg" class="logo" alt="logo" style="width:100%; height:218px">
      </a-col> -->
    </a-row>

    <a-divider style="margin-bottom: -2px"/>

    <div class="card-list" ref="content" style="margin-top: -20px">
      <template>
        <a-button class="new-btn" type="dashed" @click="$refs.enterprise.add()">
          <a-icon type="plus"/>
          新增楼栋信息
        </a-button>
      </template>
      <!-- <template v-else> -->
      <template v-if="onLine">
        <div class="map" style="margin-top: 10px">
          <baidu-map
            class="bm-view"
            :center="center"
            :zoom="zoom"
            @ready="handler"
            ak="kNbL9W1yGUaO1nbvZSS21B65yvLeRxGN">
            <!--比例尺控件-->
            <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
            <!--缩放控件-->
            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT" ></bm-navigation>
            <!--聚合动态添加的点坐标-->
            <bml-marker-clusterer
              :averageCenter="true"
            >
              <div
                v-for="(item, index) of markers"
                :key="index">
                <bm-marker
                  :position="{lng: item.longitude, lat: item.latitude}"
                  :dragging="true"
                  @click="infoWindowOpen(item)"
                  animation="BMAP_ANIMATION_BOUNCE">
                  <!--信息窗体-->
                  <bm-info-window :position="{lng: item.longitude, lat: item.latitude}" :show="item.show" @close="infoWindowClose(item)" @open="infoWindowOpen(item)">
                    <template v-if="buildings[index]">
                      <p><span class="left">楼栋名称：</span> <span class="right">
                        <!-- <router-view :key="$route.fullPath" /> -->
                        <router-link :to="{ name: 'building', params: { id:buildings[index].buildingNo } }">
                          <span>{{ buildings[index].buildingName }}</span>
                        </router-link> </span>
                      </p>
                      <p><span class="left">楼栋编号：</span><span class="right">{{ buildings[index].buildingNo }}</span></p>
                      <p><span class="left">楼栋总面积：</span><span class="right">{{ buildings[index].buildingArea }}</span></p>
                      <p><span class="left">包含公司数：</span><span class="right">{{ buildings[index].companyNumb }}</span></p>
                      <p><span class="left">楼栋位置：</span><span class="right">{{ buildings[index].buildingAddress }}</span></p>
                      <a-button type="primary" :size="size" style="margin-left: 80px" shape="round" @click="handleDelete(buildings[index].buildingNo)">
                        删除
                      </a-button>
                    </template>
                  </bm-info-window>
                </bm-marker>
              </div>
            </bml-marker-clusterer>
          </baidu-map>
        </div>
      </template>
      <template v-else>
        <a-form layout="inline">
          <a-card type="inner" title="楼栋详情" v-for="item in buildings" :key="item.buildingNo" :item="item">
            <span slot="extra">
              <template>
                <a @click="editData(item)">编辑</a>
                <a-divider type="vertical" />
                <a-dropdown>
                  <a class="ant-dropdown-link">
                    更多 <a-icon type="down"/>
                  </a>
                  <a-menu slot="overlay">
                    <a-menu-item>
                      <router-link :to="{ name: 'building', params: { id:item.buildingNo } }">
                        <span>详情</span>
                      </router-link>
                    </a-menu-item>
                    <a-menu-item>
                      <a-popconfirm title="确定删除吗?" @confirm="() => handleTabDelete(item.buildingNo)">
                        <a>删除</a>
                      </a-popconfirm>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </template>
            </span>
            <!-- <a slot="extra" @click="editData(enterprisedata1)">修改</a>
                <a slot="extra" @click="handleDelete(item.id)" style="margin-left:5px">删除</a> -->
            <detail-list size="small" :col="6">
              <template v-if="item">
                <detail-list-item term="楼栋名称">{{ item.buildingName }}</detail-list-item>
                <detail-list-item term="楼栋编号">{{ item.buildingNo }}</detail-list-item>
                <detail-list-item term="楼栋位置">{{ item.buildingAddress }}</detail-list-item>
                <detail-list-item term="楼栋总面积">{{ item.buildingArea }}</detail-list-item>
                <detail-list-item term="GPS经度">{{ item.longitude }}</detail-list-item>
                <detail-list-item term="GPS纬度">{{ item.latitude }}</detail-list-item>
                <detail-list-item term="楼栋总层数">{{ item.floorCnt }}</detail-list-item>
                <detail-list-item term="包含公司数">{{ item.companyNumb }}</detail-list-item>
                <detail-list-item term="楼栋管家">{{ item.buildingSteward }}</detail-list-item>
                <detail-list-item term="建造时间" >{{ item.buildingTime }}</detail-list-item>
              </template>
            </detail-list>
          </a-card>
        </a-form>
      </template>
    </div>
    <EnterpriseInsert ref="enterprise" @ok="handleOk"/>
  </div>
</template>

<script>
import { STable } from '@/components'
import DetailList from '@/components/tools/DetailList'
import { GetEnterpriseData, DeleteBuildingNo } from '@/api/archives/enterprise'
import EnterpriseInsert from './modules/EnterpriseInsert'
import EnterpriseEdit from './modules/EnterpriseEdit'
import EnterpriseEditForm from './modules/EnterpriseEditForm'
// 百度地图引入
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BmScale from 'vue-baidu-map/components/controls/Scale'
import BmNavigation from 'vue-baidu-map/components/controls/Navigation'
import BmMarkerClusterer from 'vue-baidu-map/components/extra/MarkerClusterer'
import BmMarker from 'vue-baidu-map/components/overlays/Marker'
import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow'
import BmPointCollection from 'vue-baidu-map/components/overlays/PointCollection'
import { BmlMarkerClusterer } from 'vue-baidu-map'
// import BmContextMenu from 'vue-baidu-map/components/context-menu/Menu.vue'

const DetailListItem = DetailList.Item
export default {
  inject: ['reload'],
  components: {
    DetailList,
    DetailListItem,
    STable,
    EnterpriseInsert,
   // 百度地图引入
    BaiduMap,
    BmScale,
    BmNavigation,
    BmMarkerClusterer,
    BmMarker,
    BmInfoWindow,
    BmPointCollection,
    BmlMarkerClusterer
  },
  data () {
    return {
      enterprisedata: { enterprisedata: '' },
      parameter: {},
      loading: true,
      buildings: [],
      center: { lng: 0, lat: 0 },
      zoom: 3,
      postionMap: { // 获取地图坐标
            lng: '',
            lat: ''
          },
      markers: [],
      size: 'small',
      // 网络状态检测
      onLine: navigator.onLine
    }
  },
  created () {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
  },
  mounted: function () {
    this.getData()
    window.addEventListener('online', this.updateOnlineStatus) // 网络由异常到正常时触发
    window.addEventListener('offline', this.updateOnlineStatus) // 网络由正常常到异常时触发
  },
  methods: {
    flushCom: function () {
      // router是路由实例,例如:var router = new Router({})
      // router.go(n)是路由的一个方法，意思是在history记录中前进或者后退多少步，0就表示还是当前，类似window.history.go(n)
      // this.$router.go(-1)
      // this.$router.go(0)
      },
    getData () {
      GetEnterpriseData(1).then(response => {
        this.enterprisedata = response.result
        this.buildings = this.enterprisedata.Buildings
        console.log(this.buildings)
        for (let i = 0; i < this.buildings.length; i += 1) {
           this.buildings[i].buildingTime = this.buildings[i].buildingTime.substring(0, 10)
            // 赋值给地图信息窗口
           var data = { longitude: '', latitude: '' }
           data.longitude = this.buildings[i].longitude
           data.latitude = this.buildings[i].latitude
           data.show = false
           this.markers.push(data)
        }
      })
    },
    // getPartTime (val) {
    //             // let ti = val.split(' ');
    //              var timearr = val.replace(' ', ':').replace(/:/g, '-').split('-')
    //              var timestr = timearr[0] + '年' + Number(timearr[1]) + '月' + timearr[1] + '日'
    //             return timestr
    //         },
    editData (record) {
      this.$dialog(EnterpriseEdit,
      {
        record
      },
      {
        title: '楼栋信息修改',
        width: 700,
        centered: true,
        maskClosable: false
      })
    },
    handleEdit (record) {
      this.$dialog(EnterpriseEditForm,
      {
        record
      },
      {
        title: '客户信息修改',
        width: 700,
        centered: true,
        maskClosable: false
      })
    },
    handleDelete (id) {
        DeleteBuildingNo(id).then(response => {
        this.$message.info('删除成功!')
        this.reload()
        console.log(JSON.stringify(response))
      // GetEnterpriseData(1).then(response => {
      //   this.deletedata = response.result
      //   this.buildings = this.deletedata.Buildings
      //   console.log('build', this.buildings)
      //   for (let i = 0; i < this.buildings.length; i += 1) {
      //      this.buildings[i].buildingTime = this.buildings[i].buildingTime.substring(0, 10)
      //   }
      // })
      })
    },
    handleTabDelete (id) {
        DeleteBuildingNo(id).then(response => {
        this.$message.info('删除成功!')
        // this.reload()
        console.log(JSON.stringify(response))
      GetEnterpriseData(1).then(response => {
        this.deletedata = response.result
        this.buildings = this.deletedata.Buildings
        console.log('build', this.buildings)
        for (let i = 0; i < this.buildings.length; i += 1) {
           this.buildings[i].buildingTime = this.buildings[i].buildingTime.substring(0, 10)
        }
      })
      })
    },
    handleChange (value, key, column) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.key)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    handleOk () {
      this.reload()
      // GetEnterpriseData(1).then(response => {
      //   this.Wdata = response.result
      //   this.buildings = this.Wdata.Buildings
      //   for (let i = 0; i < this.buildings.length; i += 1) {
      //      this.buildings[i].buildingTime = this.buildings[i].buildingTime.substring(0, 10)
      //       // 赋值给地图信息窗口
      //      var data = { longitude: '', latitude: '' }
      //      data.longitude = this.buildings[i].longitude
      //      data.latitude = this.buildings[i].latitude
      //      data.show = false
      //      this.markers.push(data)
      //   }
      // })
    },

    // 改变onLine值
    updateOnlineStatus (e) {
        const { type } = e
        this.onLine = type === 'online'
        console.log(this.onLine)
        console.log('网络异常', e)
      },

    // 百度地图展示方法
    infoWindowClose (item) {
        item.show = false
            },
    infoWindowOpen (item) {
        item.show = true
  //     setTimeout(() => {
  //    this.infoWindow.show = true
  //  }, 100)
    },
    // 地图初始化
    handler ({ BMap, map }) {
      // console.log('百度地图：', BMap, map)
      GetEnterpriseData(1).then(response => {
        this.enterprisedata = response.result
        this.buildings = this.enterprisedata.Buildings
        // 赋值中心点经纬度
        this.center.lng = this.buildings[0].longitude
        this.center.lat = this.buildings[0].latitude
      })
      this.zoom = 18
    }
  }
}
</script>

<style lang="less" scoped>
  .title {
    color: rgba(0,0,0,.85);
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 16px;
  }
.editable-row-operations a {
  margin-right: 8px;
}
.bm-view {
  width: 100%;
  height: 500px;
}
/deep/.BMap_cpyCtrl {
   display: none;
 }
/deep/.anchorBL {
   display: none;
}
</style>
