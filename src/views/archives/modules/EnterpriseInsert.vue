<template>
  <div>
    <a-modal title="设备信息" :width="640" :visible="visible" @ok="handleSubmit" @cancel="onCancel">
      <a-form :form="form">
        <!-- <a-form-item
        label="关联企业编号"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['enterpriseId', {rules:[{required: true, message: '请输入关联企业编号'}], initialValue: '1'}]" />
      </a-form-item> -->
        <a-form-item
          label="楼栋名称"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['buildingName', {rules:[{required: true, message: '请输入楼栋名称'}]}]" />
          <!-- <a-input v-model="record.buildingName" /> -->
        </a-form-item>
        <!-- <a-form-item
      label="楼栋编号"
      :labelCol="labelCol"
      :wrapperCol="wrapperCol"
    >
      <a-input v-decorator="['buildingNo', {rules:[{required: true, message: '请输入楼栋编号'}]}]" />
    </a-form-item> -->
        <!-- <a-form-item
        label="楼栋位置"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['buildingAddress', {rules:[{required: true, message: '请输入楼栋位置'}]}]" />
      </a-form-item> -->
        <a-form-item
          label="楼栋总面积"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['buildingArea', {rules:[{required: true, message: '请输入楼栋总面积'}]}]" />
          <!-- <a-input v-model="record.buildingArea" /> -->
        </a-form-item>
        <!-- <a-form-item
        label="GPS经度"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['buildingSteward', {rules:[{required: true, message: '请输入楼栋管家'}]}]" />
      </a-form-item>
      <a-form-item
        label="GPS纬度"
        :labelCol="labelCol"
        :wrapperCol="wrapperCol"
      >
        <a-input v-decorator="['buildingSteward', {rules:[{required: true, message: '请输入楼栋管家'}]}]" />
      </a-form-item> -->
        <a-form-item
          label="楼栋总层数"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input-number style="width: 100%" :min="1" :max="99" v-decorator="['floorCnt', {rules:[{required: true, message: '请输入楼栋总层数'}]}]" />
          <!-- <a-input v-model="record.floorCnt" /> -->
        </a-form-item>
        <a-form-item
          label="楼栋管家"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input v-decorator="['buildingSteward', {rules:[{required: true, message: '请输入楼栋管家'}]}]" />
          <!-- <a-input v-model="record.buildingSteward" /> -->
        </a-form-item>
        <a-form-item
          label="包含公司数"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-input-number style="width: 100%" :min="1" :max="99" v-decorator="['companyNumb', {rules:[{required: true, message: '请输入包含公司数'}]}]" />
          <!-- <a-input v-model="record.companyNumb" /> -->
        </a-form-item>
        <a-form-item
          label="建造时间"
          :labelCol="labelCol"
          :wrapperCol="wrapperCol"
        >
          <a-date-picker @change="onChange" style="width: 100%" v-decorator="['buildingTime', {rules:[{required: true, message: '请选择建造时间'}]}]" />
          <!-- <a-input v-model="record.buildingTime" /> -->
        </a-form-item>
      </a-form>
      <template>
        <div class="map" style="margin-top: 10px; margin-left: 20px">
          <baidu-map
            class="bm-view"
            :center="center"
            :zoom="zoom"
            @ready="handler"
            @click="getPoint"
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
                </bm-marker>
              </div>
            </bml-marker-clusterer>
          </baidu-map>
        </div>
      </template>
    </a-modal>
  </div>
</template>

<script>
import { AddDatas, GetEnterpriseData } from '@/api/archives/enterprise'
// 百度地图引入
import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
import BmScale from 'vue-baidu-map/components/controls/Scale'
import BmNavigation from 'vue-baidu-map/components/controls/Navigation'
import BmMarkerClusterer from 'vue-baidu-map/components/extra/MarkerClusterer'
import BmMarker from 'vue-baidu-map/components/overlays/Marker'
import BmInfoWindow from 'vue-baidu-map/components/overlays/InfoWindow'
import BmPointCollection from 'vue-baidu-map/components/overlays/PointCollection'
import { BmlMarkerClusterer } from 'vue-baidu-map'

export default {
  // name: 'MonitorEquipFormInsert',
   components: {
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
  props: {
    record: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      loading: true,
      visible: false,
      form: this.$form.createForm(this),
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      },
      center: { lng: 0, lat: 0 },
      zoom: 3,
      postionMap: { // 获取地图坐标
            lng: '',
            lat: ''
          },
      markers: []
    }
  },
  mounted: function () {
    this.getData()
  },
  methods: {
    add () {
      this.visible = true
    },
    onChange (date, dateString) {
      this.dateString = dateString
      // console.log(date, dateString)
    },
    onCancel () {
      this.visible = false
      this.form.resetFields()
    },
    handleSubmit () {
      const { form: { validateFields } } = this
          // this.visible = true
      return new Promise(resolve => {
        validateFields((errors, values) => {
          if (!errors) {
            console.log('values', JSON.stringify(values))
            var par = {}
            par.buildingAddress = values.buildingAddress
            par.buildingArea = values.buildingArea
            par.buildingName = values.buildingName
            par.floorCnt = values.floorCnt
            par.buildingTime = this.dateString
            par.longitude = this.postionMap.lng
            par.latitude = this.postionMap.lat
            par.buildingSteward = values.buildingSteward
            par.companyNumb = values.companyNumb
            par.enterpriseId = 1
            console.log('par', par)
            AddDatas(par).then(res => {
              console.log(123, res)
              if (res.code === 0) {
                this.$emit('ok', true)
                this.visible = false
                this.$message.success('新增成功')
                  resolve(true)
              } else {
                this.$message.warning('新增失败')
              }
            })
          }
        })
      })
    },

    // 地图初始化
    handler ({ BMap, map }) {
      // console.log('百度地图：', BMap, map)
      GetEnterpriseData(1).then(response => {
        this.enterprisedata = response.result
        this.buildings = this.enterprisedata.Buildings
        console.log('新增信息', this.buildings)
        // 赋值经纬度
        this.center.lng = this.buildings[0].longitude
        this.center.lat = this.buildings[0].latitude
      })
      this.zoom = 10
    },
    // 获取坐标点
    getPoint (e) { // 点击地图获取一些信息，
    this.show = true
    this.postionMap.lng = e.point.lng // 通过  e.point.lng获取经度
    console.log('经度', this.postionMap.lng)
    this.postionMap.lat = e.point.lat // 通过  e.point.lat获取纬度
    console.log('纬度', this.postionMap.lat)
    this.$message.success('选取坐标点成功，(经度:' + this.postionMap.lng + '  纬度:' + this.postionMap.lat + ')', 2)
    },
  // 获取地图聚合点
   getData () {
      GetEnterpriseData(1).then(response => {
        this.enterprisedata = response.result
        this.buildings = this.enterprisedata.Buildings
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
  height: 300px;
}
/deep/.BMap_cpyCtrl {
   display: none;
 }
/deep/.anchorBL {
   display: none;
}
</style>
