<template>
  <a-card
    :bordered="true"
    title="监测点列表">
    <div slot="extra">
      <!-- upEquipId -->
      <a-radio-group @change="onRadioChange" v-model="parameter.DeviceType">
        <a-radio-button value="-1">全部</a-radio-button>
        <a-radio-button v-for="item in energyDeviceType" :key="item.key" :value="item.value">{{ item.display }}</a-radio-button>
      </a-radio-group>
      <a-select @change="onUpEquipChange" v-model="parameter.upEquipId" placeholder="请选择 上级设备" style="width:150px;margin-left:10px">
        <a-select-option key="-1" value="-1">全部</a-select-option>
        <a-select-option v-for="UpEquip in UpEquipOptions" :key="UpEquip.key" :value="UpEquip.value">{{ UpEquip.display }}</a-select-option>
      </a-select>
      <a-input-search v-model="parameter.monitorName" @search="getdata" style="margin-left: 16px; width: 272px;" />
      <a-divider type="vertical" style="margin-left:10px; height:30px"/>
      <a-button type="primary" style="margin-left:10px; height: 30px" icon="plus" @click="$refs.MonitorPointForm.add()">添加</a-button>
    </div>
    <a-card>
      <a-list size="large" >
        <!-- <div slot="footer"><b>监测点</b> 配置信息</div> -->
        <a-list-item :key="index" v-for="(item, index) in data">
          <a-list-item-meta :description="item.monitorDesc">
            <a-avatar slot="avatar" size="large" shape="square" :src="getImg(item.deviceType)"/>
            <a slot="title">{{ item.monitorName }}</a>
          </a-list-item-meta>
          <div class="list-content">
            <div class="list-content-item">
              <a-tooltip placement="topLeft" title="关联监测设备">
                <span >
                  <a-icon type="eye" theme="twoTone" style="margin-right: 10px" />
                  <router-link :to="{ name: 'monitor_equip' }">
                    <span>{{ item.equipAddress }}</span>
                  </router-link>
                </span>
              </a-tooltip>
            </div>
            <a-divider type="vertical" />
            <div class="list-content-item">
              <a-tooltip placement="topLeft" title="用能设备类型">
                <span >
                  <a-icon type="gold" theme="twoTone" style="margin-right: 10px" />
                  <a>{{ item.deviceTypeDesc }}</a>
                </span>
              </a-tooltip>
            </div>
            <a-divider type="vertical" />
            <div class="list-content-item" style="width:180px">
              <a-tooltip v-if="item.collectionRuleR.length >= 1" placement="topLeft" title="监测点采集规则">
                <!-- collectionRuleR -->
                <div :key="ii" v-for="(r, ii) in item.collectionRuleR">
                  <a-icon type="interaction" theme="twoTone" style="margin-right: 10px" />
                  <router-link :to="{ name: 'collection_rules' }">
                    <span>{{ r.RULE_NAME }}</span>
                  </router-link>
                </div>
              </a-tooltip>
              <a-tooltip v-else placement="topLeft" title="监测点采集规则">
                <span>无</span>
              </a-tooltip>
            </div>
            <a-divider type="vertical" />
            <div class="list-content-item">
              <a @click="$refs.MonitorPointForm.update(item)">编辑</a>
            </div>
            <div class="list-content-item">
              <a-dropdown>
                <a class="ant-dropdown-link">
                  更多 <a-icon type="down"/>
                </a>
                <a-menu slot="overlay">
                  <a-menu-item>
                    <a-popconfirm title="确定解绑设备吗?" @confirm="() => DeleteEquip(item.monitorId)">
                      <a>解绑设备</a>
                    </a-popconfirm>
                  </a-menu-item>
                  <a-menu-item>
                    <a-popconfirm title="确定删除吗?" @confirm="() => DeletePoint(item.monitorId)">
                      <a>删除</a>
                    </a-popconfirm>
                  </a-menu-item>
                </a-menu>
              </a-dropdown>
            </div>
          </div>
        </a-list-item>
        <!-- <div>
          <Pagination
            :defaultPageSize="10"
            show-size-changer
            :default-current="1"
            :total="totalCount"
            @showSizeChange="onShowSizeChange"
            @change="onChange"
            :page-size-options="pageSizeOptions"
            style="margin-top:24px;text-align:right"
          />
        </div> -->
      </a-list>
    </a-card>
    <MonitorPointForm ref="MonitorPointForm" @ok="handleOk"/>
  </a-card>
</template>

<script>
import HeadInfo from '@/components/tools/HeadInfo'
// import TaskForm from '../device/modules/TaskForm'
import MonitorPointForm from './modules/MonitorPointForm'
import { Pagination } from 'ant-design-vue'
import { GetMonitorPointPage, DeleteMonitorPoint, Release, GetEnergyDeviceTypeCol } from '@/api/archives/MonitorPoint'
import { GetUpEquipOptions } from '@/api/archives/MonitorEquip'
const workImg = require('@/assets/办公用电.png')
const waterImg = require('@/assets/生活用水.png')
const lightImg = require('@/assets/照明用电.png')
const airImg = require('@/assets/空调.png')
const fenzhiImg = require('@/assets/分支.png')
const loucengImg = require('@/assets/楼层.png')
const diantiImg = require('@/assets/电梯.png')
const huanjingImg = require('@/assets/空气质量.png')
export default {
  name: 'StandardList',
  components: {
    HeadInfo,
    Pagination,
    MonitorPointForm
  },
  data () {
    return {
      pageSizeOptions: ['10', '20', '30', '40'],
      totalCount: 0,
      workImg,
      waterImg,
      lightImg,
      airImg,
      fenzhiImg,
      huanjingImg,
      parameter: {
        pageNo: 1,
        pageSize: 10,
        DeviceType: '',
        monitorName: '',
        upEquipId: ''
      },
      data: [],
      status: 'all',
      energyDeviceType: [],
      UpEquipOptions: []
    }
  },
  mounted: function () {
    this.getdata()
    this.geteDeviceType()
  },
  methods: {
    geteDeviceType () {
      GetEnergyDeviceTypeCol().then(response => {
        this.energyDeviceType = response.result.selectable
      })
      GetUpEquipOptions().then(response => {
        this.UpEquipOptions = response.result
      })
    },
    onRadioChange () {
      this.getdata()
    },
    DeleteEquip (id) {
      Release({ 'monitorid': id }).then(response => {
        if (response.code === 0) {
          this.$message.success('解绑成功')
          this.getdata()
        } else {
          this.$message.warning('解绑失败')
        }
      })
    },
    onUpEquipChange () {
      this.getdata()
    },
    BindEquip (id) {
    },
    getdata () {
      GetMonitorPointPage(this.parameter).then(response => {
        console.log(JSON.stringify(response, null, 2))
        this.data = response.result.data
        this.totalCount = response.result.totalCount
      })
    },
    onChange (current, pageSize) {
      // this.parameter.pageNo = current
      // this.parameter.pageSize = pageSize
      this.getdata()
    },
    onShowSizeChange (current, pageSize) {
      // this.parameter.pageNo = current
      // this.parameter.pageSize = pageSize
      this.getdata()
    },
    DeletePoint (record) {
      DeleteMonitorPoint(record).then(response => {
        if (response.code === 0) {
          this.$message.success('删除成功')
          this.getdata()
        } else if (response.code === 100) {
          this.$message.warning('数据处理失败')
        }
      })
    },
    getImg (type) {
      // 1	空调
      // 2	照明
      // 3	楼层
      // 4	电梯
      // 5	环境
      if (type === '1') {
        return airImg
      }
      if (type === '2') {
        return lightImg
      }
      if (type === '3') {
        return loucengImg
      }
      if (type === '4') {
        return diantiImg
      }
      if (type === '5') {
        return huanjingImg
      }
    },
    handleOk () {
      // 新增/修改 成功时，重载列表
      this.getdata()
    }
  }
}
</script>

<style lang="less" scoped>
    .ant-avatar-lg {
        width: 48px;
        height: 48px;
        line-height: 48px;
    }

    .list-content-item {
        color: rgba(0, 0, 0, .45);
        display: inline-block;
        vertical-align: middle;
        font-size: 14px;
        margin-left: 40px;
        span {
            line-height: 20px;
        }
        p {
            margin-top: 4px;
            margin-bottom: 0;
            line-height: 22px;
        }
    }
</style>
