<template>
  <a-card :bordered="false">
    <div slot="extra">
      <!-- upEquipId -->
      <a-radio-group>
        <a-radio-button value="-1">全部</a-radio-button>
        <a-radio-button v-for="item in diagnosisType" :key="item.no" :value="item.no">{{ item.title }}</a-radio-button>
      </a-radio-group>
      <a-select placeholder="诊断规则" style="width:200px;margin-left:1px"><!-- @change="onUpEquipChange" v-model="parameter.upEquipId" -->
        <a-select-option key="-1" value="-1">全部</a-select-option>
      </a-select>
      <a-divider type="vertical" style="margin-left:10px; height:30px"/>
      <a-input-search placeholder="按名称搜索" style="margin-left: 1px; width: 220px;" /><!--v-model="parameter.monitorName" @search="getdata" -->
      <a-divider type="vertical" style="margin-left:10px; height:30px"/>
      <router-link :to="{ name: 'diagnosis_report', params:{diagnosisType: diagnosisType} }" >
        <a-button type="primary" style="margin-left:10px; height: 30px" icon="plus" @click="$refs.newReport.show()">新增诊断</a-button>
      </router-link>
    </div>
    <a-table :columns="columns" :data-source="data">
      <a slot="name" slot-scope="text">{{ text }}</a>
      <span slot="customTitle"><a-icon type="smile-o" /> 报告名称</span>
      <div slot="expandedRowRender" style="font-size: 16px; color: rgba(0, 0, 0, 0.85); font-weight: 500; margin-bottom: 20px;">
        <a-steps>
          <a-step status="finish" title="用户提交">
            <a-icon slot="icon" type="user" />
          </a-step>
          <a-step status="finish" title="参数检查">
            <a-icon slot="icon" type="solution" />
          </a-step>
          <a-step status="progressing" title="报告处理">
            <a-icon slot="icon" type="loading" />
          </a-step>
          <a-step status="wait" title="完成">
            <a-icon slot="icon" type="smile-o" />
          </a-step>
        </a-steps>
      </div>
      <template
        slot="status"
        slot-scope="status">
        <a-badge :status="status | statusTypeFilter" :text="status | statusFilter"/>
      </template>
      <span slot="action" >
        <router-link target="_blank" to="/diagnosisReport">
          <a>查看 <a-icon type="eye"/></a>
        </router-link>
        <a-divider type="vertical" />
        <a href="/诊断报告样例.pdf">下载 <a-icon type="file-pdf" /></a>
        <a-divider type="vertical" />
        <a-dropdown>
          <a class="ant-dropdown-link">
            更多 <a-icon type="down"/>
          </a>
          <a-menu slot="overlay">
            <a-menu-item>
              <a-popconfirm title="确定删除吗?" @confirm="() => DeletePoint(item.monitorId)">
                <a>删除</a>
              </a-popconfirm>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </span>
    </a-table>
  </a-card>
</template>

<script>
import { PageView } from '@/layouts'

const columns = [
  {
    dataIndex: 'name',
    key: 'name',
    slots: { title: 'customTitle' },
    scopedSlots: { customRender: 'name' }
  },
  {
    title: '区域类型',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '描述',
    dataIndex: 'desc',
    key: 'desc'
  },
  {
    title: '状态',
    key: 'status',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

const data = [
  {
    key: '1',
    name: '报告1',
    type: '企业',
    desc: '这是一个企业能源诊断报告',
    status: 'reject'
  },
  {
    key: '2',
    name: '报告2',
    type: '楼宇',
    desc: '这是一个楼宇能源诊断报告',
    status: 'reject'
  },
  {
    key: '3',
    name: '报告3',
    type: '房间',
    desc: '这是一个房间能源诊断报告',
    status: 'agree'
  },
  {
    key: '4',
    name: '报告4',
    type: '自定义',
    desc: '这是一个自定义能源诊断报告',
    status: 'agree'
  }
]

const diagnosisType = [
  { title: '给水', no: 101, type: 1 },
  { title: '耗电', no: 102, type: 2 },
  { title: '用气', no: 103, type: 3 },
  { title: '供热', no: 104, type: 4 }
]
export default {
  components: {
  PageView
  },
  data () {
    return {
      data,
      diagnosisType,
      columns
    }
  },
  methods: {
    handleOk () {
      this.$refs.table.refresh(true)
    },
    showReport (id) {
      const routeUrl = this.$router.resolve({
          path: '/diagnosisReport'
     })
     window.open(routeUrl.href, '_blank')
    }
  },
  filters: {
    statusFilter (status) {
      const statusMap = {
        'agree': '成功',
        'reject': '终止'
      }
      return statusMap[status]
    },
    statusTypeFilter (type) {
      const statusTypeMap = {
        'agree': 'success',
        'reject': 'error'
      }
      return statusTypeMap[type]
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
  .steps-content {
  margin-top: 16px;
  border: 1px dashed #e9e9e9;
  border-radius: 6px;
  background-color: #fafafa;
  min-height: 200px;
  text-align: center;
  padding-top: 80px;
}

.steps-action {
  margin-top: 24px;
}
</style>
