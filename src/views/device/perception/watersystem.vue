<template>
  <div>
    <a-card :bordered="false" title="水能监测">
      <a-form layout="inline">
        <a-row :gutter="48">
          <a-col :md="6" :sm="12">
            <a-form-item label="设备类型">
              <a-select v-model="queryParam.useStatus" placeholder="请选择" default-value="0" style="width:200px">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">给水</a-select-option>
                <a-select-option value="2">锅炉</a-select-option>
                <a-select-option value="3">卫生间</a-select-option>
                <a-select-option value="4">餐厅</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="12">
            <a-form-item label="运行状态">
              <a-select v-model="queryParam.status" placeholder="请选择" default-value="0" style="width:200px">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">关闭</a-select-option>
                <a-select-option value="2">运行中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :md="6" :sm="12">
            <a-form-item label="设备状态">
              <a-select v-model="queryParam.status" placeholder="请选择" default-value="0" style="width:200px">
                <a-select-option value="0">全部</a-select-option>
                <a-select-option value="1">开</a-select-option>
                <a-select-option value="2">关</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <template v-if="advanced">
            <a-col :md="6" :sm="12">
              <a-form-item label="设备名称">
                <a-input v-model="queryParam.id" placeholder=""/>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="12">
              <a-form-item label="使用状态">
                <a-select v-model="queryParam.useStatus" placeholder="请选择" default-value="0" style="width:200px">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :md="6" :sm="12">
              <a-form-item label="设备类型">
                <a-select placeholder="请选择" default-value="0" style="width:200px">
                  <a-select-option value="0">全部</a-select-option>
                  <a-select-option value="1">关闭</a-select-option>
                  <a-select-option value="2">运行中</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
          </template>
          <a-col :md="!advanced && 6 || 24" :sm="24">
            <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
              <a-button type="primary" @click="$refs.table.refresh(true)" icon="search">查询</a-button>
              <a-button type="primary" style="margin-left:20px; height:30px" @click="$refs.EnergySurveyForm.add()" icon="plus">新增</a-button>
              <a-button style="margin-left: 8px" @click="getdata()" icon="reload">重置</a-button>
              <a @click="toggleAdvanced" style="margin-left: 8px">
                {{ advanced ? '收起' : '展开' }}
                <a-icon :type="advanced ? 'up' : 'down'"/>
              </a>
            </span>
          </a-col>
        </a-row>
        <a-table :columns="colheads" :data-source="tabledata1" row-key="monotorId">
          <a slot="name" slot-scope="text">{{ text }}</a>
          <span slot="customTitle"><a-icon type="smile-o" /> Name</span>
          <span slot="switchStatus" slot-scope="text, record">
            <div v-if="record.switchStatus === 1 || record.switchStatus === 2">
              <a-tag :color="record.status ==='停运' ? 'red' : 'green'" >
                {{ record.status.toUpperCase() }}
              </a-tag>
            </div>
            <div v-else>
              <a-tag :color="record.status ==='无设备' ? 'gray' : 'green'" >
                {{ record.status.toUpperCase() }}
              </a-tag>
            </div>
          </span>
          <span slot="equipStatus" slot-scope="text, record">
            <div v-if="record.equipStatus === 1">
              <a-switch :disabled="record.equipStatus2" checked-children="开" un-checked-children="关" default-checked />
            </div>
            <div v-else>
              <a-switch :disabled="record.equipStatus2" checked-children="开" un-checked-children="关" />
            </div>
          </span>
          <span slot="action" slot-scope="text, record">
            <!-- <a-icon type="hourglass" theme="twoTone" two-tone-color="#52c41a" /> -->
            <a @click="$refs.watersystemplot.showDrawer(record)"><a-icon type="smile" theme="twoTone" two-tone-color="#52c41a" />点开有惊喜喔！</a>
            <a-divider type="vertical" />
            <a @click="$refs.EnergySurveyForm.updata(record)">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm title="确定删除吗?" @confirm="() => handleDelete1(record.key)">
              <a>删除</a>
            </a-popconfirm>
          </span>
        </a-table>
      </a-form>
    </a-card>
    <!-- <a-drawer
      title="给水系统监测详情"
      placement="right"
      width="1664"
      :closable="false"
      :visible="visible"
      :after-visible-change="afterVisibleChange"
      @close="onClose"
    >
      <p>
        <watersystemplot />
      </p>
    </a-drawer> -->
    <watersystemplot ref="watersystemplot" @ok="handleOk"/>
    <EnergySurveyForm ref="EnergySurveyForm" @ok="handleOk"/>
  </div>
</template>

<script>
import moment from 'moment'
import { Getairsystem } from '@/api/perception/airsystem'
import watersystemplot from './watersystemplot'
import EnergySurveyForm from '../modules/EnergySurveyForm'

const colheads = [
   {
      dataIndex: 'monotorName',
      key: 'monotorName',
       title: '设备名称',
      slots: { title: 'monotorNameTitle' },
      scopedSlots: { customRender: 'monotorName' },
      align: 'center'
    },
    {
      title: '类型',
      dataIndex: 'deviceType',
      key: 'deviceType',
      align: 'center'
    },
    {
      title: '位置',
      dataIndex: 'floorNO',
      key: 'floorNO',
      align: 'center'
    },
    {
      title: '设备状态',
      key: 'status',
      dataIndex: 'status',
      scopedSlots: { customRender: 'switchStatus' },
      align: 'center'
    },
    {
      title: '设备地址',
      key: 'equipAddress',
      dataIndex: 'equipAddress',
      scopedSlots: { customRender: 'equipAddress' },
      align: 'center'
    },
    {
      title: '运行状态',
      key: 'equipStatus',
      dataIndex: 'equipStatus',
      scopedSlots: { customRender: 'equipStatus' },
      align: 'center'
    },
    {
      title: '操作',
      key: 'action',
      scopedSlots: { customRender: 'action' },
      align: 'center'
    }
  ]
const tabledata1 = []

export default {
  components: {
   watersystemplot,
   EnergySurveyForm

  },
  data () {
    return {
      colheads,
      tabledata1,
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 加载数据方法 必须为 Promise 对象
      visible: false
    }
  },
  mounted: function () {
  this.getdata()
  // this.$refs.watersystemplot.line()
},

  methods: {
    afterVisibleChange (val) {
      console.log('visible', val)
    },
    // showDrawer () {
    //   this.visible = true
    // },
    // onClose () {
    //   this.visible = false
    // },
    getdata () {
      var type = 3
      Getairsystem(type).then(response => {
        var tabledata = response.result
        var length = tabledata.length
        console.log('返回数据', tabledata)
        this.tabledata1 = tabledata
        // console.log(222, tabledata)
        console.log('空调信息', this.tabledata1)
        for (let i = 0; i < length; i += 1) {
          // this.disabled[i] = tabledata[i].status
          if (this.tabledata1[i].switchStatus === 1) {
            this.tabledata1[i].status = '在运'
          } else if (this.tabledata1[i].switchStatus === 2) {
            this.tabledata1[i].status = '停运'
                   } else { this.tabledata1[i].status = '无设备' }
          if (this.tabledata1[i].status === '无设备') {
            this.tabledata1[i].equipStatus2 = true
          } else { this.tabledata1[i].equipStatus2 = false }
          if (this.tabledata1[i].equipStatus === 1) {
            this.tabledata1[i].equipStatus3 = '开'
          } else { this.tabledata1[i].equipStatus3 = '关' }
        }
      })
    },
    // insertData () {
    //   this.$dialog(EnergySurveyInsert,
    //   {},
    //   {
    //     title: '操作',
    //     width: 700,
    //     centered: true,
    //     maskClosable: false
    //   })
    // },
    handleDelete1 (key) {
         const tabledataa = [...this.tabledata1]
         console.log('123', key)
         this.tabledata1 = tabledataa.filter(item => item.key !== key)
    },
    toggleAdvanced () {
      this.advanced = !this.advanced
    },
    resetSearchForm () {
      this.queryParam = {
        date: moment(new Date())
      }
    },
     handleOk () {
      // 新增/修改 成功时，重载列表
      this.getdata()
    }
}
}
</script>
